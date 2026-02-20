import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/test-parallax", "/journey", "/api/"],
      },
    ],
    sitemap: "https://www.kona-verse.com/sitemap.xml",
  };
}
