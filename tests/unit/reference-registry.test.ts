import { describe, expect, it } from "vitest";
import { functionalGroups, getFunctionalGroup } from "@/content/references";
import { getReagent, reagents } from "@/content/reagents";

describe("chemistry reference registries", () => {
  it("uses unique public slugs", () => {
    const slugs = [
      ...functionalGroups.map((entry) => `functional-group:${entry.slug}`),
      ...reagents.map((entry) => `reagent:${entry.slug}`),
    ];
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("retrieves published functional groups and canonical reagents", () => {
    expect(getFunctionalGroup("alkene")?.formula).toBe("C=C");
    expect(getReagent("bromine")?.formula).toBe("Br₂");
    expect(getReagent("bromine")?.reactionIds).toContain("halogenation");
  });
});
