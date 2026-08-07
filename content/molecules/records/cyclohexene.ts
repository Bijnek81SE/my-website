import { defineAlkeneMolecule } from "../alkene-molecule";

export const cyclohexene = defineAlkeneMolecule({
  id: "cyclohexene",
  name: "Cyclohexene",
  aliases: [],
  formula: "C6H10",
  displayFormula: "C₆H₁₀",
  condensedFormula: "cyclo-C6H10",
  smiles: "C1=CCCCC1",
  summary: "A standard cyclic alkene substrate for demonstrating face selectivity, bromonium chemistry, hydrogenation, epoxidation, and dihydroxylation.",
  preferredMechanismFeatureId: "halogenation",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 95, y: 30, label: "CH" },
      { id: "c2", element: "C", x: 175, y: 30, label: "CH" },
      { id: "c3", element: "C", x: 220, y: 85, label: "CH₂" },
      { id: "c4", element: "C", x: 180, y: 140, label: "CH₂" },
      { id: "c5", element: "C", x: 90, y: 140, label: "CH₂" },
      { id: "c6", element: "C", x: 50, y: 85, label: "CH₂" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 2 },
      { id: "b2", from: "c2", to: "c3", order: 1 },
      { id: "b3", from: "c3", to: "c4", order: 1 },
      { id: "b4", from: "c4", to: "c5", order: 1 },
      { id: "b5", from: "c5", to: "c6", order: 1 },
      { id: "b6", from: "c6", to: "c1", order: 1 },
    ],
  },
});
