import { defineAlkeneMolecule } from "../alkene-molecule";

export const onePentene = defineAlkeneMolecule({
  id: "1-pentene",
  name: "1-Pentene",
  aliases: ["pent-1-ene"],
  formula: "C5H10",
  displayFormula: "C₅H₁₀",
  condensedFormula: "CH2=CHCH2CH2CH3",
  smiles: "CCCC=C",
  summary: "A representative higher terminal alkene for learning regiochemistry, chain cleavage, and product counting without molecular symmetry.",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 25, y: 80, label: "CH₂" },
      { id: "c2", element: "C", x: 85, y: 80, label: "CH" },
      { id: "c3", element: "C", x: 145, y: 50, label: "CH₂" },
      { id: "c4", element: "C", x: 205, y: 80, label: "CH₂" },
      { id: "c5", element: "C", x: 265, y: 50, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 2 },
      { id: "b2", from: "c2", to: "c3", order: 1 },
      { id: "b3", from: "c3", to: "c4", order: 1 },
      { id: "b4", from: "c4", to: "c5", order: 1 },
    ],
  },
});
