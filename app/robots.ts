import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://karharimedia.com/sitemap.xml",
    host: "https://karharimedia.com",
  };
}