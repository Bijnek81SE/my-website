import { defineAlkeneMolecule } from "../alkene-molecule";

export const alphaMethylstyrene = defineAlkeneMolecule({
  id: "alpha-methylstyrene",
  name: "α-Methylstyrene",
  aliases: ["2-phenylpropene", "isopropenylbenzene"],
  formula: "C9H10",
  displayFormula: "C₉H₁₀",
  condensedFormula: "C6H5C(CH3)=CH2",
  smiles: "CC(=C)C1=CC=CC=C1",
  summary: "A substituted benzylic alkene that strongly illustrates how resonance and alkyl substitution stabilise cationic intermediates.",
  preferredMechanismFeatureId: "hydrohalogenation",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 45, y: 80, label: "Ph" },
      { id: "c2", element: "C", x: 135, y: 80, label: "C" },
      { id: "c3", element: "C", x: 220, y: 80, label: "CH₂" },
      { id: "c4", element: "C", x: 135, y: 30, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "c3", order: 2 },
      { id: "b3", from: "c2", to: "c4", order: 1 },
    ],
  },
});
