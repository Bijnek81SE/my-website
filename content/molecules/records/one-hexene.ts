import { defineAlkeneMolecule } from "../alkene-molecule";

export const oneHexene = defineAlkeneMolecule({
  id: "1-hexene",
  name: "1-Hexene",
  aliases: ["hex-1-ene"],
  formula: "C6H12",
  displayFormula: "C₆H₁₂",
  condensedFormula: "CH2=CH(CH2)3CH3",
  smiles: "CCCCC=C",
  summary: "A common terminal alkene that connects introductory addition chemistry with practical hydroboration, oxidation, and cleavage examples.",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 20, y: 80, label: "CH₂" },
      { id: "c2", element: "C", x: 70, y: 80, label: "CH" },
      { id: "c3", element: "C", x: 120, y: 50, label: "CH₂" },
      { id: "c4", element: "C", x: 170, y: 80, label: "CH₂" },
      { id: "c5", element: "C", x: 220, y: 50, label: "CH₂" },
      { id: "c6", element: "C", x: 270, y: 80, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 2 },
      { id: "b2", from: "c2", to: "c3", order: 1 },
      { id: "b3", from: "c3", to: "c4", order: 1 },
      { id: "b4", from: "c4", to: "c5", order: 1 },
      { id: "b5", from: "c5", to: "c6", order: 1 },
    ],
  },
});
