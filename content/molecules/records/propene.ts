import { defineAlkeneMolecule } from "../alkene-molecule";

export const propene = defineAlkeneMolecule({
  id: "propene",
  name: "Propene",
  aliases: ["propylene"],
  formula: "C3H6",
  displayFormula: "C₃H₆",
  condensedFormula: "CH3CH=CH2",
  smiles: "CC=C",
  summary: "The central alkene teaching substrate for comparing regioselectivity, stereochemistry, oxidation, reduction, and synthesis-planning pathways.",
  preferredMechanismFeatureId: "hydrohalogenation",
  reactionPrediction: true,
  predictionChallengeId: "propene-hbr",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 45, y: 72, label: "CH₃" },
      { id: "c2", element: "C", x: 120, y: 72, label: "CH" },
      { id: "c3", element: "C", x: 195, y: 72, label: "CH₂" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "c3", order: 2 },
    ],
  },
});
