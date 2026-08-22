import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://karharimedia.com";
  const now = new Date();

  const routes = [
    { path: "", priority: 1, changefreq: "weekly" as const },
    { path: "/about", priority: 0.8, changefreq: "monthly" as const },
    { path: "/contact", priority: 0.9, changefreq: "monthly" as const },
    { path: "/music-distribution", priority: 0.9, changefreq: "monthly" as const },
    { path: "/youtube-content-id", priority: 0.8, changefreq: "monthly" as const },
    { path: "/youtube-mcn-pipeline", priority: 0.8, changefreq: "monthly" as const },
    { path: "/facebook-rights-manager", priority: 0.8, changefreq: "monthly" as const },
    { path: "/team", priority: 0.6, changefreq: "monthly" as const },
    { path: "/youtube-policies", priority: 0.5, changefreq: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" as const },
    { path: "/terms-and-conditions", priority: 0.3, changefreq: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));
}