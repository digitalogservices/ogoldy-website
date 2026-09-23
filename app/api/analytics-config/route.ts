import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
export const runtime = "edge";
export async function GET() {
  const e = env as unknown as Record<string, string>;
  return NextResponse.json(
    { ga4: e.GA4_MEASUREMENT_ID || "", gtm: e.GTM_CONTAINER_ID || "" },
    { headers: { "cache-control": "public, max-age=300" } },
  );
}
