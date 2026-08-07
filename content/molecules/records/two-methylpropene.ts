import { defineAlkeneMolecule } from "../alkene-molecule";

export const twoMethylpropene = defineAlkeneMolecule({
  id: "2-methylpropene",
  name: "2-Methylpropene",
  aliases: ["isobutene", "isobutylene"],
  formula: "C4H8",
  displayFormula: "C₄H₈",
  condensedFormula: "(CH3)2C=CH2",
  smiles: "CC(=C)C",
  summary: "A branched alkene that highlights carbocation stability, Markovnikov selectivity, and substitution effects on alkene reactivity.",
  preferredMechanismFeatureId: "hydrohalogenation",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 135, y: 78, label: "C" },
      { id: "c2", element: "C", x: 215, y: 78, label: "CH₂" },
      { id: "c3", element: "C", x: 85, y: 35, label: "CH₃" },
      { id: "c4", element: "C", x: 85, y: 120, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 2 },
      { id: "b2", from: "c1", to: "c3", order: 1 },
      { id: "b3", from: "c1", to: "c4", order: 1 },
    ],
  },
});
