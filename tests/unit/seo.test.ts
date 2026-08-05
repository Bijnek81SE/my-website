import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createLearningResourceJsonLd,
  createPageMetadata,
  createWebSiteJsonLd,
} from "@/lib/seo";

describe("SEO platform", () => {
  it("creates canonical page metadata", () => {
    const metadata = createPageMetadata({
      title: "Resonance",
      description: "Understand resonance contributors.",
      path: "/learn/fundamentals/resonance",
      type: "article",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://bijan.se/learn/fundamentals/resonance",
    );
    expect(metadata.openGraph?.url).toBe(
      "https://bijan.se/learn/fundamentals/resonance",
    );
  });

  it("creates valid website and lesson structured data", () => {
    const website = createWebSiteJsonLd();
    const lesson = createLearningResourceJsonLd({
      name: "Resonance",
      description: "Understand electron delocalisation.",
      path: "/learn/fundamentals/resonance",
      module: "Fundamentals",
      readingTime: "13 min",
    });
    const breadcrumbs = createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Resonance", path: "/learn/fundamentals/resonance" },
    ]);

    expect(website["@type"]).toBe("WebSite");
    expect(lesson["@type"]).toBe("LearningResource");
    expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
  });

  it("includes published lessons and platform routes in the sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain(absoluteUrl("/"));
    expect(urls).toContain(absoluteUrl("/learn/fundamentals/resonance"));
    expect(urls).toContain(absoluteUrl("/lab/sn2-mechanism"));
    expect(new Set(urls).size).toBe(urls.length);
  });
});
