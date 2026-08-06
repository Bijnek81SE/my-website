import { describe, expect, it } from "vitest";
import {
  getSpectroscopyDatasetForMolecule,
  getSpectroscopyDatasetsByCapability,
  requireSpectroscopyDataset,
  searchSpectroscopyDatasets,
  spectroscopyDatasets,
  validateSpectroscopyDatasets,
} from "@/content/spectroscopy";
import { requireMolecule } from "@/content/molecules";

describe("canonical spectroscopy registry", () => {
  it("passes cross-registry validation", () => {
    expect(validateSpectroscopyDatasets(spectroscopyDatasets)).toEqual([]);
  });

  it("derives structure and identity from the canonical molecule", () => {
    const dataset = requireSpectroscopyDataset("ethanol");
    const molecule = requireMolecule("ethanol");
    expect(dataset.name).toBe(molecule.name);
    expect(dataset.formula).toBe(molecule.displayFormula);
    expect(dataset.atoms).toBe(molecule.structure.atoms);
    expect(dataset.bonds).toBe(molecule.structure.bonds);
  });

  it("supports molecule, capability, and text indexes", () => {
    expect(getSpectroscopyDatasetForMolecule("acetone")?.id).toBe("acetone");
    expect(getSpectroscopyDatasetsByCapability("workspace").length).toBe(spectroscopyDatasets.length);
    expect(searchSpectroscopyDatasets("ketone").map((dataset) => dataset.id)).toContain("acetone");
  });
});
