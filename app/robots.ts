import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/netlify-forms.html"] },
    sitemap: "https://www.ogoldy.com/sitemap.xml",
  };
}
