import { defineAlkeneMolecule } from "../alkene-molecule";

export const styrene = defineAlkeneMolecule({
  id: "styrene",
  name: "Styrene",
  aliases: ["vinylbenzene", "ethenylbenzene"],
  formula: "C8H8",
  displayFormula: "C₈H₈",
  condensedFormula: "C6H5CH=CH2",
  smiles: "C=CC1=CC=CC=C1",
  summary: "A conjugated aryl alkene that connects alkene addition chemistry with benzylic stabilisation and aromatic context.",
  preferredMechanismFeatureId: "hydrohalogenation",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 55, y: 80, label: "Ph" },
      { id: "c2", element: "C", x: 145, y: 80, label: "CH" },
      { id: "c3", element: "C", x: 225, y: 80, label: "CH₂" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "c3", order: 2 },
    ],
  },
});
