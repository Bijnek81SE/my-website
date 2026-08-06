import { describe, expect, it } from "vitest";
import { molecules, validateMolecules, type MoleculeDefinition } from "@/content/molecules";

const base = molecules[0] as MoleculeDefinition;

describe("molecule validation", () => {
  it("reports duplicate ids and broken bonds", () => {
    const invalid: MoleculeDefinition = {
      ...base,
      structure: {
        atoms: base.structure.atoms,
        bonds: [{ id: "bad", from: "missing", to: base.structure.atoms[0]!.id, order: 1 }],
      },
    };

    const issues = validateMolecules([base, invalid]);
    expect(issues.map((issue) => issue.code)).toContain("duplicate-id");
    expect(issues.map((issue) => issue.code)).toContain("broken-bond");
  });

  it("reports broken cross-registry relationships", () => {
    const invalid: MoleculeDefinition = {
      ...base,
      id: "invalid-molecule",
      name: "Invalid molecule",
      aliases: [],
      functionalGroupIds: ["missing-functional-group"],
      primaryFunctionalGroupId: "missing-functional-group",
      reagentRelations: [{ id: "missing-reagent", description: "Broken link." }],
      reactionRelations: [{ id: "missing-reaction", description: "Broken link." }],
      labRelations: [{ id: "missing-feature", description: "Broken link." }],
      lessonRelations: [{ id: "missing-lesson", description: "Broken link." }],
    };

    expect(validateMolecules([invalid]).map((issue) => issue.code)).toEqual([
      "missing-functional-group",
      "missing-reagent",
      "missing-reaction",
      "missing-lab",
      "missing-lesson",
    ]);
  });
});
