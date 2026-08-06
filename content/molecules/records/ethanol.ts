import { defineMolecule } from "../molecule-types";

export const ethanol = defineMolecule({
  id: "ethanol",
  name: "Ethanol",
  aliases: ["ethyl alcohol", "EtOH"],
  formula: "C2H6O",
  displayFormula: "C₂H₆O",
  condensedFormula: "CH3CH2OH",
  smiles: "CCO",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 55, y: 72, label: "CH₃" },
      { id: "c2", element: "C", x: 125, y: 72, label: "CH₂" },
      { id: "o1", element: "O", x: 195, y: 72, label: "OH" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "o1", order: 1 },
    ],
  },
  primaryFunctionalGroupId: "alcohol",
  functionalGroupIds: ["alcohol"],
  reagentRelations: [
    { id: "sulfuric-acid", description: "Acid catalyst for alcohol dehydration and related proton-transfer chemistry." },
  ],
  reactionRelations: [
    { id: "hydration", label: "Alcohol dehydration and substitution", description: "Connect ethanol to the reverse alkene-hydration relationship and compare alcohol-forming pathways." },
  ],
  labRelations: [
    { id: "spectroscopy-lab", label: "Spectroscopy lab", description: "Connect ethanol structure to its NMR, IR, and mass signals." },
    { id: "reaction-prediction-lab", label: "Reaction prediction", description: "Practise choosing conditions and products from mechanistic evidence." },
  ],
  lessonRelations: [
    { id: "chemical-bonding", description: "Review polar bonds, lone pairs, and hydrogen bonding." },
  ],
  capabilities: { workspace: true, spectroscopy: true, reactionPrediction: true, retrosynthesis: true, calculations: true },
  workspace: {
    functionalGroupLabel: "Primary alcohol",
    summary: "A compact reference molecule for linking structure, molar mass, and a complete four-technique spectroscopy dataset.",
  },
});
