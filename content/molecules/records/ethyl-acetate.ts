import { defineMolecule } from "../molecule-types";

export const ethylAcetate = defineMolecule({
  id: "ethyl-acetate",
  name: "Ethyl acetate",
  aliases: ["ethyl ethanoate"],
  formula: "C4H8O2",
  displayFormula: "C₄H₈O₂",
  condensedFormula: "CH3CO2CH2CH3",
  smiles: "CCOC(=O)C",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 35, y: 78, label: "CH₃" },
      { id: "c2", element: "C", x: 95, y: 78, label: "C" },
      { id: "o1", element: "O", x: 95, y: 25, label: "O" },
      { id: "o2", element: "O", x: 155, y: 78, label: "O" },
      { id: "c3", element: "C", x: 215, y: 78, label: "CH₂" },
      { id: "c4", element: "C", x: 275, y: 78, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "o1", order: 2 },
      { id: "b3", from: "c2", to: "o2", order: 1 },
      { id: "b4", from: "o2", to: "c3", order: 1 },
      { id: "b5", from: "c3", to: "c4", order: 1 },
    ],
  },
  primaryFunctionalGroupId: "carbonyl",
  functionalGroupIds: ["carbonyl"],
  reagentRelations: [
    { id: "sulfuric-acid", description: "Catalyst for esterification and acid-catalysed ester hydrolysis." },
  ],
  reactionRelations: [],
  labRelations: [
    { id: "spectroscopy-lab", label: "Spectroscopy lab", description: "Assign the ester carbonyl, ethyl splitting, and molecular ion." },
    { id: "stoichiometry-calculator", label: "Stoichiometry calculator", description: "Scale ester-forming reactions and theoretical product amounts." },
  ],
  lessonRelations: [
    { id: "resonance", description: "Understand donation from ester oxygen into the carbonyl system." },
    { id: "chemical-bonding", description: "Review sigma and pi bonding in the ester group." },
  ],
  capabilities: { workspace: true, spectroscopy: true, reactionPrediction: false, retrosynthesis: false, calculations: true },
  workspace: {
    functionalGroupLabel: "Ester",
    summary: "A useful multi-environment molecule for connecting carbonyl spectroscopy, splitting, and quantitative work.",
  },
});
