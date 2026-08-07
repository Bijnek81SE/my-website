import { defineAlkeneMolecule } from "../alkene-molecule";

export const oneButene = defineAlkeneMolecule({
  id: "1-butene",
  name: "1-Butene",
  aliases: ["but-1-ene", "1-butylene"],
  formula: "C4H8",
  displayFormula: "C₄H₈",
  condensedFormula: "CH2=CHCH2CH3",
  smiles: "CCC=C",
  summary: "A terminal alkene used to compare Markovnikov and anti-Markovnikov functionalisation and oxidative cleavage outcomes.",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 35, y: 82, label: "CH₂" },
      { id: "c2", element: "C", x: 105, y: 82, label: "CH" },
      { id: "c3", element: "C", x: 175, y: 55, label: "CH₂" },
      { id: "c4", element: "C", x: 245, y: 82, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 2 },
      { id: "b2", from: "c2", to: "c3", order: 1 },
      { id: "b3", from: "c3", to: "c4", order: 1 },
    ],
  },
});
