import type { PlatformFeature } from "./feature-types";

export type PlatformFeatureValidationIssue = {
  code: "duplicate-id" | "duplicate-route" | "invalid-route" | "missing-search-keywords";
  message: string;
};

export function validatePlatformFeatures(
  features: readonly PlatformFeature[],
): readonly PlatformFeatureValidationIssue[] {
  const issues: PlatformFeatureValidationIssue[] = [];
  const ids = new Set<string>();
  const routes = new Set<string>();

  for (const feature of features) {
    if (ids.has(feature.id)) {
      issues.push({ code: "duplicate-id", message: `Duplicate platform feature id: ${feature.id}` });
    }
    ids.add(feature.id);

    if (routes.has(feature.href)) {
      issues.push({ code: "duplicate-route", message: `Duplicate platform feature route: ${feature.href}` });
    }
    routes.add(feature.href);

    if (!feature.href.startsWith("/")) {
      issues.push({ code: "invalid-route", message: `Platform feature route must start with /: ${feature.href}` });
    }

    if (feature.search && feature.search.keywords.length === 0) {
      issues.push({ code: "missing-search-keywords", message: `Searchable platform feature has no keywords: ${feature.id}` });
    }
  }

  return issues;
}

export function assertValidPlatformFeatures(features: readonly PlatformFeature[]): void {
  const issues = validatePlatformFeatures(features);
  if (issues.length > 0) {
    throw new Error(issues.map((issue) => issue.message).join("\n"));
  }
}
