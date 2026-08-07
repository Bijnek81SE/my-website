import { defineAlkeneMolecule } from "../alkene-molecule";

export const twoMethylTwoButene = defineAlkeneMolecule({
  id: "2-methyl-2-butene",
  name: "2-Methyl-2-butene",
  aliases: ["2-methylbut-2-ene"],
  formula: "C5H10",
  displayFormula: "C₅H₁₀",
  condensedFormula: "(CH3)2C=CHCH3",
  smiles: "CC(=CC)C",
  summary: "A trisubstituted alkene that demonstrates substitution-dependent stability and highly selective electrophilic addition.",
  preferredMechanismFeatureId: "hydrohalogenation",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 125, y: 78, label: "C" },
      { id: "c2", element: "C", x: 195, y: 78, label: "CH" },
      { id: "c3", element: "C", x: 75, y: 38, label: "CH₃" },
      { id: "c4", element: "C", x: 75, y: 118, label: "CH₃" },
      { id: "c5", element: "C", x: 250, y: 45, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 2 },
      { id: "b2", from: "c1", to: "c3", order: 1 },
      { id: "b3", from: "c1", to: "c4", order: 1 },
      { id: "b4", from: "c2", to: "c5", order: 1 },
    ],
  },
});
