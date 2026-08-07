import { defineAlkeneMolecule } from "../alkene-molecule";

export const transTwoButene = defineAlkeneMolecule({
  id: "trans-2-butene",
  name: "trans-2-Butene",
  aliases: ["trans-but-2-ene", "E-2-butene"],
  formula: "C4H8",
  displayFormula: "C₄H₈",
  condensedFormula: "trans-CH3CH=CHCH3",
  smiles: "C/C=C/C",
  summary: "A stereodefined internal alkene used to track stereospecific anti halogenation, syn hydrogenation, and dihydroxylation.",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 40, y: 45, label: "CH₃" },
      { id: "c2", element: "C", x: 110, y: 80, label: "CH" },
      { id: "c3", element: "C", x: 180, y: 80, label: "CH" },
      { id: "c4", element: "C", x: 250, y: 115, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "c3", order: 2 },
      { id: "b3", from: "c3", to: "c4", order: 1 },
    ],
  },
});
