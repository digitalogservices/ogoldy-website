export function GET(request: Request) {
  const source = new URL(request.url);
  const headers = new Headers({
    Location: "/asset-value-estimate/" + source.search,
  });
  const host = request.headers.get("host")?.toLowerCase().split(":")[0];
  const indexable =
    host === "www.ogoldy.com" &&
    process.env.OGOLDY_INDEXATION_APPROVED === "true";
  if (!indexable) {
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  return new Response(null, { status: 301, headers });
}
