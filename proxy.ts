import { NextRequest, NextResponse } from "next/server";

// The exact production hostname and an explicit Control-approved environment flag
// are both required. This also protects a staging alias on the same deploy.
export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0];
  const indexable = host === "www.ogoldy.com" && process.env.OGOLDY_INDEXATION_APPROVED === "true";
  const pathname = request.nextUrl.pathname;
  const legacyDestinations = new Set([
    "/services/",
    "/about/",
    "/contact/",
    "/projects/",
    "/privacy/",
    "/services/scrap-disposal-purchase/",
    "/services/managed-asset-custody/",
    "/asset-value-estimate/",
  ]);
  if (pathname !== "/" && pathname.endsWith("/") && !legacyDestinations.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    const redirect = NextResponse.redirect(url, 308);
    if (!indexable) redirect.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return redirect;
  }
  const response = NextResponse.next();
  if (!indexable) response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = { matcher: "/:path*" };
