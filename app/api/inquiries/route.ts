import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import {
  findDuplicateInquiry,
  rateLimitInquiry,
  saveInquiry,
  updateRouting,
} from "../../../db/inquiries";
export const runtime = "edge";
const allowed = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/csv",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
type Lead = {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  assetType: string;
  quantity: string;
  notes: string;
  sourcePage: string;
  referrer: string;
  utm: string;
  relocationDetails: string;
  files: { key: string; name: string; type: string; size: number }[];
};
function secrets() {
  return env as unknown as Record<string, string>;
}
function leadText(x: Lead) {
  return [
    `Contact: ${x.contactName}`,
    `Company: ${x.company}`,
    `Email: ${x.email}`,
    `Phone: ${x.phone}`,
    `Location: ${x.location}`,
    `Requirement: ${x.assetType}`,
    `Quantity / size: ${x.quantity}`,
    `Source: ${x.sourcePage || "direct"}`,
    `Referrer: ${x.referrer || "none"}`,
    `UTM: ${x.utm || "{}"}`,
    `Relocation details: ${x.relocationDetails || "not applicable"}`,
    `Files: ${x.files.map((f) => f.name).join(", ") || "none"}`,
    "",
    x.notes,
    "",
    `Backend inquiry ID: ${x.id}`,
  ].join("\n");
}
async function routeToTrello(x: Lead) {
  const e = secrets();
  if (!e.TRELLO_API_KEY || !e.TRELLO_TOKEN || !e.TRELLO_INCOMING_LIST_ID)
    return "not_configured";
  const body = new URLSearchParams({
    idList: e.TRELLO_INCOMING_LIST_ID,
    key: e.TRELLO_API_KEY,
    token: e.TRELLO_TOKEN,
    name: `Website lead — ${x.company} — ${x.assetType}`,
    desc: leadText(x),
  });
  const res = await fetch("https://api.trello.com/1/cards", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`Trello routing failed: ${res.status}`);
  return "sent";
}
async function routeToEmail(x: Lead) {
  const e = secrets();
  if (!e.RESEND_API_KEY || !e.LEAD_EMAIL_FROM) return "not_configured";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${e.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: e.LEAD_EMAIL_FROM,
      to: [e.LEAD_EMAIL_TO || "growth@ogoldy.com"],
      subject: `Website lead — ${x.company} — ${x.assetType}`,
      text: leadText(x),
    }),
  });
  if (!res.ok) throw new Error(`Email routing failed: ${res.status}`);
  return "sent";
}
export async function POST(request: Request) {
  const uploadedKeys: string[] = [];
  try {
    const form = await request.formData();
    if (String(form.get("website") || ""))
      return NextResponse.json({ ok: true }, { status: 201 });
    const startedAt = Number(form.get("startedAt"));
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1800)
      return NextResponse.json(
        { error: "Please review the form before submitting" },
        { status: 400 },
      );
    const required = [
      "company",
      "contactName",
      "email",
      "phone",
      "location",
      "assetType",
      "quantity",
      "notes",
      "consent",
    ];
    for (const key of required) {
      if (!String(form.get(key) || "").trim())
        return NextResponse.json({ error: `Missing ${key}` }, { status: 400 });
    }
    const email = String(form.get("email")).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json(
        { error: "Enter a valid business email" },
        { status: 400 },
      );
    if (await rateLimitInquiry(email))
      return NextResponse.json(
        { error: "Too many recent submissions for this email" },
        { status: 429 },
      );
    const raw = [
      email,
      form.get("company"),
      form.get("location"),
      form.get("assetType"),
      form.get("quantity"),
      form.get("notes"),
    ]
      .join("|")
      .toLowerCase();
    const requestHash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw)),
      ),
    )
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const duplicate = await findDuplicateInquiry(requestHash);
    if (duplicate)
      return NextResponse.json(
        { ok: true, id: duplicate, duplicate: true },
        { status: 200 },
      );
    const id = crypto.randomUUID();
    const files = form
      .getAll("photos")
      .concat(form.get("boq") || [])
      .filter((x): x is File => x instanceof File && x.size > 0);
    if (files.length > 6)
      return NextResponse.json(
        { error: "Upload one BOQ and no more than five photos" },
        { status: 400 },
      );
    if (files.reduce((n, f) => n + f.size, 0) > 30_000_000)
      return NextResponse.json(
        { error: "Combined uploads must be under 30 MB" },
        { status: 400 },
      );
    const uploaded: {
      key: string;
      name: string;
      type: string;
      size: number;
    }[] = [];
    for (const file of files) {
      if (!allowed.has(file.type) || file.size > 10_000_000)
        return NextResponse.json(
          { error: "Unsupported file type or file over 10 MB" },
          { status: 400 },
        );
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const key = `inquiries/${id}/${crypto.randomUUID()}-${safe}`;
      if (!env.BUCKET) throw new Error("BUCKET unavailable");
      await env.BUCKET.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type },
      });
      uploadedKeys.push(key);
      uploaded.push({ key, name: file.name, type: file.type, size: file.size });
    }
    const lead: Lead = {
      id,
      company: String(form.get("company")),
      contactName: String(form.get("contactName")),
      email,
      phone: String(form.get("phone")),
      location: String(form.get("location")),
      assetType: String(form.get("assetType")),
      quantity: String(form.get("quantity")),
      notes: String(form.get("notes")),
      sourcePage: String(form.get("sourcePage") || ""),
      referrer: String(form.get("referrer") || ""),
      utm: String(form.get("utm") || "{}"),
      relocationDetails: JSON.stringify({
        origin: String(form.get("origin") || ""),
        destination: String(form.get("destination") || ""),
        moveDate: String(form.get("moveDate") || ""),
        moveVolume: String(form.get("moveVolume") || ""),
        assets: form.getAll("moveAssets").map(String),
        dismantling: form.get("needsDismantling") === "yes",
        custody: form.get("needsCustody") === "yes",
        liquidation: form.get("needsLiquidation") === "yes",
      }),
      files: uploaded,
    };
    await saveInquiry({
      ...lead,
      requestHash,
      files: uploaded.map((f) => JSON.stringify(f)),
    });
    const routing = await Promise.allSettled([
      routeToEmail(lead),
      routeToTrello(lead),
    ]);
    routing.forEach((r, i) => {
      if (r.status === "rejected")
        console.error(
          i === 0 ? "Email lead routing failed" : "Trello lead routing failed",
          r.reason,
        );
    });
    const routingStatus = (r: PromiseSettledResult<string>) =>
      r.status === "fulfilled" ? r.value : "failed";
    const emailStatus = routingStatus(routing[0]);
    const trelloStatus = routingStatus(routing[1]);
    await updateRouting(id, emailStatus, trelloStatus);
    return NextResponse.json(
      { ok: true, id, routing: { email: emailStatus, trello: trelloStatus } },
      { status: 201 },
    );
  } catch (error) {
    for (const key of uploadedKeys) {
      try {
        await env.BUCKET?.delete(key);
      } catch {}
    }
    console.error("Inquiry submission failed", error);
    return NextResponse.json(
      { error: "Submission unavailable" },
      { status: 500 },
    );
  }
}
