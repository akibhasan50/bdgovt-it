import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IT Job Prep BD",
    short_name: "IT Job Prep",
    description:
      "Govt IT job exam prep — MCQ practice, timed mocks and question-bank archives for Bangladesh.",
    start_url: "/",
    display: "standalone",
    background_color: "#151220",
    theme_color: "#151220",
    orientation: "portrait",
    lang: "bn",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
