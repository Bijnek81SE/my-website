import { defineMolecule } from "../molecule-types";

export const toluene = defineMolecule({
  id: "toluene",
  name: "Toluene",
  aliases: ["methylbenzene"],
  formula: "C7H8",
  displayFormula: "C₇H₈",
  condensedFormula: "C6H5CH3",
  smiles: "Cc1ccccc1",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 105, y: 25, label: "C" },
      { id: "c2", element: "C", x: 165, y: 55, label: "CH" },
      { id: "c3", element: "C", x: 165, y: 115, label: "CH" },
      { id: "c4", element: "C", x: 105, y: 145, label: "CH" },
      { id: "c5", element: "C", x: 45, y: 115, label: "CH" },
      { id: "c6", element: "C", x: 45, y: 55, label: "CH" },
      { id: "c7", element: "C", x: 105, y: -35, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 2 },
      { id: "b2", from: "c2", to: "c3", order: 1 },
      { id: "b3", from: "c3", to: "c4", order: 2 },
      { id: "b4", from: "c4", to: "c5", order: 1 },
      { id: "b5", from: "c5", to: "c6", order: 2 },
      { id: "b6", from: "c6", to: "c1", order: 1 },
      { id: "b7", from: "c1", to: "c7", order: 1 },
    ],
  },
  primaryFunctionalGroupId: "aromatic-ring",
  functionalGroupIds: ["aromatic-ring"],
  reagentRelations: [
    { id: "hydrogen-palladium", description: "A forcing reduction system that can hydrogenate aromatic rings." },
  ],
  reactionRelations: [
    { id: "hydrogenation", label: "Aromatic reaction context", description: "Compare catalytic reduction with less forcing alkene hydrogenation conditions." },
  ],
  labRelations: [
    { id: "spectroscopy-lab", label: "Spectroscopy lab", description: "Relate aromatic and benzylic environments to spectral evidence." },
    { id: "molecule-playground", label: "Molecule playground", description: "Explore aromatic geometry and connectivity." },
  ],
  lessonRelations: [
    { id: "resonance", description: "Build the conceptual foundation for aromatic stabilization." },
    { id: "hybridization", description: "Review sp² carbon geometry around the ring." },
  ],
  capabilities: { workspace: true, spectroscopy: true, reactionPrediction: false, retrosynthesis: false, calculations: true },
  workspace: {
    functionalGroupLabel: "Aromatic hydrocarbon",
    summary: "An aromatic reference molecule for resonance, ring-current shifts, and benzylic substitution context.",
  },
});
