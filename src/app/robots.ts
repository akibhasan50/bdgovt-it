import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/practice/session"],
    },
    sitemap: "https://itjobprep.bd/sitemap.xml",
    host: "https://itjobprep.bd",
  };
}
