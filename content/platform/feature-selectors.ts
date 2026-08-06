import { platformFeatures } from "./feature-catalog";
import type { PlatformFeature } from "./feature-types";

export function getPlatformFeature(id: string): PlatformFeature {
  const feature = platformFeatures.find((entry) => entry.id === id);
  if (!feature) throw new Error(`Unknown platform feature: ${id}`);
  return feature;
}

export function getSearchablePlatformFeatures(): readonly PlatformFeature[] {
  return platformFeatures.filter((feature) => feature.search);
}

export function getSitemapPlatformFeatures(): readonly PlatformFeature[] {
  return platformFeatures.filter((feature) => feature.sitemap);
}

export type PlatformRouteSmokeCase = {
  path: string;
  expectedText: RegExp;
};

export function getPlatformRouteSmokeCases(): readonly PlatformRouteSmokeCase[] {
  return platformFeatures.flatMap((feature) => {
    if (!feature.smokeTest) return [];
    return [{
      path: feature.href,
      expectedText: new RegExp(
        feature.smokeTest.expectedText.source,
        feature.smokeTest.expectedText.flags,
      ),
    }];
  });
}
