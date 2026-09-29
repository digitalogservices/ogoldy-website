import { NextRequest, NextResponse } from "next/server";

const legacyRedirects: Record<string, string> = {
  "/services": "/services/",
  "/about-us": "/about/",
  "/contact": "/contact/",
  "/s-projects-side-by-side": "/projects/",
  "/privacy-policy": "/privacy/",
  "/book-online": "/contact/",
  "/post/corporate-scrap-disposal-in-delhi-ncr-a-complete-guide-for-office-relocations-renovations-closur": "/services/scrap-disposal-purchase/",
  "/post/unlocking-efficiency-in-reverse-logistics-management": "/services/managed-asset-custody/",
  "/post/maximize-returns-with-smart-reverse-logistics-practices": "/services/managed-asset-custody/",
  "/post/key-strategies-for-effective-reverse-logistics-solutions": "/services/managed-asset-custody/",
  "/get-value-estimate": "/asset-value-estimate/",
  "/get-value-estimate/": "/asset-value-estimate/",
};
const legacyDestinations = new Set(Object.values(legacyRedirects));

// The exact production hostname and an explicit Control-approved environment flag
// are both required. This also protects a staging alias on the same deploy.
export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0];
  const indexable = host === "www.ogoldy.com" && process.env.OGOLDY_INDEXATION_APPROVED === "true";
  const pathname = request.nextUrl.pathname;
  const destination = legacyRedirects[pathname];
  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    const redirect = NextResponse.redirect(url, 301);
    if (!indexable) redirect.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return redirect;
  }
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
