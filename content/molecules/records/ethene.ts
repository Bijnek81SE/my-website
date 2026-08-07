import { defineAlkeneMolecule } from "../alkene-molecule";

export const ethene = defineAlkeneMolecule({
  id: "ethene",
  name: "Ethene",
  aliases: ["ethylene"],
  formula: "C2H4",
  displayFormula: "C₂H₄",
  condensedFormula: "CH2=CH2",
  smiles: "C=C",
  summary: "The simplest alkene and a clean reference substrate for addition, oxidation, stereochemistry, and π-bond reactivity.",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 70, y: 72, label: "CH₂" },
      { id: "c2", element: "C", x: 160, y: 72, label: "CH₂" },
    ],
    bonds: [{ id: "b1", from: "c1", to: "c2", order: 2 }],
  },
});
