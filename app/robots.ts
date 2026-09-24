import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.toLowerCase().split(":")[0];
  const indexable = host === "www.ogoldy.com" && process.env.OGOLDY_INDEXATION_APPROVED === "true";
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/", disallow: ["/api/", "/netlify-forms.html"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: "https://www.ogoldy.com/sitemap.xml",
  };
}
