import { defineAlkeneMolecule } from "../alkene-molecule";

export const cyclopentene = defineAlkeneMolecule({
  id: "cyclopentene",
  name: "Cyclopentene",
  aliases: [],
  formula: "C5H8",
  displayFormula: "C₅H₈",
  condensedFormula: "cyclo-C5H8",
  smiles: "C1=CCCC1",
  summary: "A cyclic alkene used to connect ring geometry with stereospecific syn and anti addition outcomes.",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 105, y: 30, label: "CH" },
      { id: "c2", element: "C", x: 175, y: 30, label: "CH" },
      { id: "c3", element: "C", x: 215, y: 95, label: "CH₂" },
      { id: "c4", element: "C", x: 140, y: 135, label: "CH₂" },
      { id: "c5", element: "C", x: 65, y: 95, label: "CH₂" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 2 },
      { id: "b2", from: "c2", to: "c3", order: 1 },
      { id: "b3", from: "c3", to: "c4", order: 1 },
      { id: "b4", from: "c4", to: "c5", order: 1 },
      { id: "b5", from: "c5", to: "c1", order: 1 },
    ],
  },
});
