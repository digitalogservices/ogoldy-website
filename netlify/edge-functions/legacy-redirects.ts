const redirects: Record<string, string> = {
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
};

const gonePaths = new Set(["/blog", "/accessibility-statement"]);

export const config = {
  path: [
    "/blog",
    "/accessibility-statement",
    "/services",
    "/about-us",
    "/contact",
    "/s-projects-side-by-side",
    "/privacy-policy",
    "/book-online",
    "/post/corporate-scrap-disposal-in-delhi-ncr-a-complete-guide-for-office-relocations-renovations-closur",
    "/post/unlocking-efficiency-in-reverse-logistics-management",
    "/post/maximize-returns-with-smart-reverse-logistics-practices",
    "/post/key-strategies-for-effective-reverse-logistics-solutions",
  ],
};

export default function legacyRedirect(request: Request) {
  const source = new URL(request.url);
  if (gonePaths.has(source.pathname)) {
    const headers = new Headers();
    if (source.hostname !== "www.ogoldy.com") {
      headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    }
    return new Response(null, { status: 410, headers });
  }

  const destination = redirects[source.pathname];
  if (!destination) return;

  const headers = new Headers({
    Location: destination + source.search,
  });
  if (source.hostname !== "www.ogoldy.com") {
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  return new Response(null, { status: 301, headers });
}
