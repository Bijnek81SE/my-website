import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/test-results/", "/playwright-report/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.origin,
  };
}
