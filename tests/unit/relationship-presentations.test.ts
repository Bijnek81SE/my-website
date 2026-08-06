import { describe, expect, it } from "vitest";
import { getRelationshipPresentation, relationshipPresentations, validateRelationshipPresentations } from "@/content/relationships";

describe("relationship presentation registry", () => {
  it("contains unique, valid source-role presentations", () => {
    expect(validateRelationshipPresentations(relationshipPresentations)).toEqual([]);
  });

  it("uses chemistry-specific language for reagent relationships", () => {
    expect(getRelationshipPresentation("reagent:typical-reactions")?.heading).toBe("Typical reactions");
    expect(getRelationshipPresentation("reagent:typical-substrates")?.heading).toBe("Typical substrates");
    expect(getRelationshipPresentation("reagent:mechanism-labs")?.heading).toBe("Interactive mechanism labs");
  });

  it("uses domain-specific language across molecules, reactions, mechanisms, and spectroscopy", () => {
    expect(getRelationshipPresentation("molecule:common-reagents")?.heading).toBe("Relevant reagents");
    expect(getRelationshipPresentation("reaction:alternative-pathways")?.heading).toBe("Alternative pathways to compare");
    expect(getRelationshipPresentation("mechanism:typical-reactions")?.heading).toBe("Occurs in reactions");
    expect(getRelationshipPresentation("spectroscopy:assigned-molecule")?.heading).toBe("Assigned structure environment");
  });
});
