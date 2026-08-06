import { describe, expect, it } from "vitest";
import {
  chemistryRelationships,
  getConnectedChemistryEntityIds,
  selectChemistryRelationships,
  validateChemistryRelationships,
} from "@/content/relationships";

describe("chemistry relationship engine", () => {
  it("generates valid direct and inverse relationships from canonical registries", () => {
    expect(
      validateChemistryRelationships(chemistryRelationships),
    ).toEqual([]);

    expect(
      chemistryRelationships.some(
        (relationship) =>
          relationship.from ===
            "reagent:potassium-tert-butoxide" &&
          relationship.to === "reaction:e2" &&
          relationship.semantic === "enables-reaction" &&
          !relationship.inferred,
      ),
    ).toBe(true);

    expect(
      chemistryRelationships.some(
        (relationship) =>
          relationship.from === "reaction:e2" &&
          relationship.to ===
            "reagent:potassium-tert-butoxide" &&
          relationship.semantic === "uses-reagent" &&
          relationship.inferred,
      ),
    ).toBe(true);
  });

  it("supports indexed entity, semantic, direction, and target-kind queries", () => {
    const e2Reagents = selectChemistryRelationships({
      entityId: "reaction:e2",
      semantics: ["uses-reagent"],
      targetKinds: ["reagent"],
      includeInferred: true,
    });

    expect(
      e2Reagents.some(
        (relationship) =>
          relationship.to ===
          "reagent:potassium-tert-butoxide",
      ),
    ).toBe(true);

    expect(
      getConnectedChemistryEntityIds("molecule:ethanol"),
    ).toContain("spectroscopy:ethanol");
  });

  it("can restrict queries to direct canonical facts", () => {
    const directE2Reagents = selectChemistryRelationships({
      entityId: "reaction:e2",
      semantics: ["uses-reagent"],
      targetKinds: ["reagent"],
      includeInferred: false,
    });

    expect(
      directE2Reagents.some(
        (relationship) =>
          relationship.to === "reagent:hydroxide" &&
          !relationship.inferred,
      ),
    ).toBe(true);

    expect(
      directE2Reagents.some(
        (relationship) =>
          relationship.to ===
          "reagent:potassium-tert-butoxide",
      ),
    ).toBe(false);
  });
});