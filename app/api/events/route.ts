import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
export const runtime = "edge";
const allowed = new Set([
  "page_view",
  "cta_click",
  "phone_click",
  "email_click",
  "form_start",
  "form_submit",
]);
export async function POST(request: Request) {
  try {
    const x = (await request.json()) as Record<string, string>;
    if (!allowed.has(x.eventName) || !x.sessionId || !x.path)
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    await env.DB.prepare(
      "INSERT INTO analytics_events (id,event_name,session_id,lead_id,path,referrer,utm_json,label) VALUES (?,?,?,?,?,?,?,?)",
    )
      .bind(
        crypto.randomUUID(),
        x.eventName,
        x.sessionId,
        x.leadId || null,
        x.path,
        x.referrer || "",
        x.utm || "{}",
        (x.label || "").slice(0, 240),
      )
      .run();
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unavailable" }, { status: 500 });
  }
}
