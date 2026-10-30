import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-31");
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/notebook/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/notebook/gradient-descent/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
