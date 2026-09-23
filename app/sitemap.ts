import type { MetadataRoute } from "next";
import { services } from "./data/services";
import { caseStudies } from "./data/case-studies";
import { relocationPages } from "./data/relocation-pages";
import { projects } from "./data/projects";
import { sectors } from "./data/sectors";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.ogoldy.com";
  const fixed = [
    "",
    "/services",
    "/projects",
    "/case-studies",
    "/about",
    "/contact",
    "/asset-value-estimate",
    "/asset-decision-tool",
    "/privacy",
  ];
  return fixed
    .map((url) => ({
      url: base + url,
      changeFrequency: url === "" ? "weekly" : ("monthly" as const),
      priority: url === "" ? 1 : 0.8,
    }))
    .concat(
      services.map((s) => ({
        url: `${base}/services/${s.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      })),
      caseStudies.map((c) => ({
        url: `${base}/case-studies/${c.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.82,
      })),
      relocationPages.map((p) => ({
        url: `${base}/${p.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      })),
      projects.map((p) => ({url:`${base}/projects/${p.slug}`,changeFrequency:"monthly" as const,priority:0.85})),
      sectors.map((s) => ({url:`${base}/solutions/${s.slug}`,changeFrequency:"monthly" as const,priority:0.9})),
    );
}
