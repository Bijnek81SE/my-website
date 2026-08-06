import { describe, expect, it } from "vitest";
import { validatePlatformFeatures, type PlatformFeature } from "@/content/platform";

const base: PlatformFeature = {
  id: "example",
  title: "Example",
  description: "Example feature.",
  href: "/example",
  kind: "site",
  search: { category: "Site", keywords: ["example"] },
};

describe("platform feature validation", () => {
  it("reports duplicate ids and routes", () => {
    const issues = validatePlatformFeatures([
      base,
      { ...base, title: "Duplicate" },
    ]);

    expect(issues.map((issue) => issue.code)).toEqual([
      "duplicate-id",
      "duplicate-route",
    ]);
  });

  it("reports searchable features without keywords", () => {
    const issues = validatePlatformFeatures([
      { ...base, search: { category: "Site", keywords: [] } },
    ]);

    expect(issues[0]?.code).toBe("missing-search-keywords");
  });
});
