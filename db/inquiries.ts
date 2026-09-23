import { env } from "cloudflare:workers";
type Inquiry = {
  id: string;
  requestHash: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  assetType: string;
  quantity: string;
  notes: string;
  files: string[];
  sourcePage: string;
  referrer: string;
  utm: string;
  relocationDetails: string;
};
function db() {
  if (!env.DB) throw new Error("DB unavailable");
  return env.DB;
}
export async function rateLimitInquiry(email: string) {
  const row = await db()
    .prepare(
      "SELECT COUNT(*) AS count FROM inquiries WHERE email = ? AND created_at >= unixepoch() - 3600",
    )
    .bind(email)
    .first<{ count: number }>();
  return Number(row?.count || 0) >= 5;
}
export async function findDuplicateInquiry(hash: string) {
  const row = await db()
    .prepare(
      "SELECT id FROM inquiries WHERE request_hash = ? AND created_at >= unixepoch() - 86400 LIMIT 1",
    )
    .bind(hash)
    .first<{ id: string }>();
  return row?.id || null;
}
export async function saveInquiry(x: Inquiry) {
  await db()
    .prepare(
      `INSERT INTO inquiries (id, request_hash, company, contact_name, email, phone, location, asset_type, quantity, notes, files_json, source_page, referrer, utm_json, relocation_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      x.id,
      x.requestHash,
      x.company,
      x.contactName,
      x.email,
      x.phone,
      x.location,
      x.assetType,
      x.quantity,
      x.notes,
      JSON.stringify(x.files),
      x.sourcePage,
      x.referrer,
      x.utm,
      x.relocationDetails,
    )
    .run();
}
export async function updateRouting(
  id: string,
  emailStatus: string,
  trelloStatus: string,
) {
  await db()
    .prepare(
      "UPDATE inquiries SET email_status = ?, trello_status = ? WHERE id = ?",
    )
    .bind(emailStatus, trelloStatus, id)
    .run();
}
