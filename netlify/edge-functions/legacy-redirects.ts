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
  "/get-value-estimate": "/asset-value-estimate/",
  "/get-value-estimate/": "/asset-value-estimate/",
};

export default function legacyRedirect(request: Request) {
  const source = new URL(request.url);
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
