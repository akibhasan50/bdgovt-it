import type { MetadataRoute } from "next";
import { topics } from "@/lib/data/topics";
import { bankCategories } from "@/lib/data/banks";
import { exams } from "@/lib/data/exams";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://itjobprep.bd";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/practice",
    "/exams",
    "/topics",
    "/banks",
    "/news",
    "/guides",
    "/pricing",
    "/login",
    "/register",
    "/dashboard",
    "/saved",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const topicRoutes: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: `${base}/topics/${topic.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const bankRoutes: MetadataRoute.Sitemap = bankCategories.map((bank) => ({
    url: `${base}/banks/${bank.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const examRoutes: MetadataRoute.Sitemap = exams.map((exam) => ({
    url: `${base}/exams/${exam.id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...topicRoutes, ...bankRoutes, ...examRoutes];
}
