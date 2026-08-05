import { absoluteUrl, siteConfig } from "./site-config";

export type JsonLdValue = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createWebSiteJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.origin,
    inLanguage: siteConfig.language,
  };
}

export function createOrganizationJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.origin,
    description: siteConfig.description,
  };
}

export function createBreadcrumbJsonLd(
  items: readonly BreadcrumbItem[],
): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type LearningResourceInput = {
  name: string;
  description: string;
  path: string;
  module: string;
  readingTime: string;
};

function readingTimeToDuration(readingTime: string): string {
  const minutes = Number.parseInt(readingTime, 10);
  return Number.isFinite(minutes) ? `PT${minutes}M` : readingTime;
}

export function createLearningResourceJsonLd({
  name,
  description,
  path,
  module,
  readingTime,
}: LearningResourceInput): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: siteConfig.language,
    educationalLevel: "Undergraduate",
    learningResourceType: "Lesson",
    isPartOf: {
      "@type": "Course",
      name: `${siteConfig.name}: ${module}`,
      url: absoluteUrl("/learn"),
    },
    timeRequired: readingTimeToDuration(readingTime),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.origin,
    },
  };
}
