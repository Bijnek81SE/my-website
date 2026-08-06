import { describe, expect, it } from "vitest";
import {
  findMoleculeByNameOrAlias,
  getMolecule,
  getMoleculesByCapability,
  getWorkspaceMoleculeViews,
  molecules,
  validateMolecules,
} from "@/content/molecules";


describe("canonical molecule registry", () => {
  it("contains unique, fully valid canonical molecules", () => {
    expect(validateMolecules(molecules)).toEqual([]);
    expect(new Set(molecules.map((molecule) => molecule.id)).size).toBe(molecules.length);
  });

  it("provides indexed id, alias, and capability lookups", () => {
    expect(getMolecule("propene")?.condensedFormula).toBe("CH3CH=CH2");
    expect(findMoleculeByNameOrAlias("propylene")?.id).toBe("propene");
    expect(getMoleculesByCapability("spectroscopy").map((molecule) => molecule.id)).toEqual([
      "ethanol",
      "acetone",
      "ethyl-acetate",
      "toluene",
    ]);
  });

  it("derives workspace availability and relationships from molecule records", () => {
    const workspaceMolecules = getWorkspaceMoleculeViews();
    const propene = workspaceMolecules.find((molecule) => molecule.id === "propene");

    expect(workspaceMolecules.map((molecule) => molecule.id)).toEqual(molecules.map((molecule) => molecule.id));
    expect(propene?.knowledge.functionalGroup.href).toBe("/functional-groups/alkene");
    expect(propene?.knowledge.reagents.some((link) => link.href === "/reagents/bromine")).toBe(true);
    expect(propene?.knowledge.labs.some((link) => link.href === "/lab/hydroboration-oxidation")).toBe(true);
  });
});
