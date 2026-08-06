import { describe, expect, it } from "vitest";
import {
  getPlatformRouteSmokeCases,
  getSearchablePlatformFeatures,
  getSitemapPlatformFeatures,
  platformFeatures,
  validatePlatformFeatures,
} from "@/content/platform";

describe("platform feature catalog", () => {
  it("contains no duplicate ids, routes, or invalid capabilities", () => {
    expect(validatePlatformFeatures(platformFeatures)).toEqual([]);
  });

  it("derives search, sitemap, and smoke-test integrations", () => {
    expect(getSearchablePlatformFeatures().some((feature) => feature.id === "retrosynthesis-planner")).toBe(true);
    expect(getSitemapPlatformFeatures().some((feature) => feature.href === "/workspace")).toBe(true);
    expect(getPlatformRouteSmokeCases().some((entry) => entry.path === "/lab/spectroscopy")).toBe(true);
  });
});
