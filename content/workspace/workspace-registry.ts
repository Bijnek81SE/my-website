import type { WorkspaceMolecule, WorkspaceSnapshot, WorkspaceTab } from "./workspace-types";

export const workspaceTabs: readonly { id: WorkspaceTab; label: string; description: string }[] = [
  { id: "overview", label: "Overview", description: "Identity, formula, functional group, and connected tools." },
  { id: "spectra", label: "Spectra", description: "Open the linked spectroscopy dataset and assignments." },
  { id: "reaction", label: "Reaction", description: "Continue into prediction, synthesis, or a mechanism lab." },
  { id: "calculations", label: "Calculations", description: "Scale the selected molecule and inspect mass and amount." },
  { id: "notes", label: "Notes", description: "Keep browser-local observations for this workspace." },
];

export const workspaceMolecules: readonly WorkspaceMolecule[] = [
  {
    id: "ethanol",
    name: "Ethanol",
    formula: "C2H6O",
    condensedFormula: "CH3CH2OH",
    functionalGroup: "Primary alcohol",
    summary: "A compact reference molecule for linking structure, molar mass, and a complete four-technique spectroscopy dataset.",
    spectroscopyCompoundId: "ethanol",
    referenceHrefs: ["/functional-groups/alcohol", "/reagents/sulfuric-acid"],
  },
  {
    id: "acetone",
    name: "Acetone",
    formula: "C3H6O",
    condensedFormula: "(CH3)2CO",
    functionalGroup: "Ketone",
    summary: "A symmetric carbonyl compound with a diagnostic IR absorption and simple NMR pattern.",
    spectroscopyCompoundId: "acetone",
    referenceHrefs: ["/functional-groups/carbonyl"],
  },
  {
    id: "ethyl-acetate",
    name: "Ethyl acetate",
    formula: "C4H8O2",
    condensedFormula: "CH3CO2CH2CH3",
    functionalGroup: "Ester",
    summary: "A useful multi-environment molecule for connecting carbonyl spectroscopy, splitting, and quantitative work.",
    spectroscopyCompoundId: "ethyl-acetate",
    referenceHrefs: ["/functional-groups/carbonyl"],
  },
  {
    id: "toluene",
    name: "Toluene",
    formula: "C7H8",
    condensedFormula: "C6H5CH3",
    functionalGroup: "Aromatic hydrocarbon",
    summary: "An aromatic reference molecule for resonance, ring-current shifts, and benzylic substitution context.",
    spectroscopyCompoundId: "toluene",
    referenceHrefs: ["/functional-groups/aromatic-ring"],
  },
  {
    id: "propene",
    name: "Propene",
    formula: "C3H6",
    condensedFormula: "CH3CH=CH2",
    functionalGroup: "Alkene",
    summary: "The shared starting point for hydrohalogenation, hydration, halogenation, hydrogenation, and synthesis-planning exercises.",
    predictionChallengeId: "propene-hbr",
    mechanismHref: "/lab/hydrohalogenation",
    referenceHrefs: ["/functional-groups/alkene", "/reagents/bromine"],
  },
  {
    id: "2-bromopropane",
    name: "2-Bromopropane",
    formula: "C3H7Br",
    condensedFormula: "CH3CH(Br)CH3",
    functionalGroup: "Secondary alkyl halide",
    summary: "A substitution/elimination substrate and synthesis-planning intermediate connected to the prediction engine.",
    predictionChallengeId: "tertiary-substitution-elimination",
    mechanismHref: "/lab/e2-mechanism",
    referenceHrefs: ["/functional-groups/alkyl-halide", "/reagents/hydroxide"],
  },
] as const;

export const defaultWorkspaceSnapshot: WorkspaceSnapshot = {
  moleculeId: "ethanol",
  activeTab: "overview",
  amountMmol: 10,
  notes: "",
  updatedAt: "",
};

export function getWorkspaceMolecule(id: string): WorkspaceMolecule {
  return workspaceMolecules.find((molecule) => molecule.id === id) ?? workspaceMolecules[0];
}
