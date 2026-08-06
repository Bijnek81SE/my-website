import { defineMolecule } from "../molecule-types";

export const acetone = defineMolecule({
  id: "acetone",
  name: "Acetone",
  aliases: ["propanone", "dimethyl ketone"],
  formula: "C3H6O",
  displayFormula: "C₃H₆O",
  condensedFormula: "(CH3)2CO",
  smiles: "CC(=O)C",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 45, y: 78, label: "CH₃" },
      { id: "c2", element: "C", x: 120, y: 78, label: "C" },
      { id: "o1", element: "O", x: 120, y: 25, label: "O" },
      { id: "c3", element: "C", x: 195, y: 78, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "o1", order: 2 },
      { id: "b3", from: "c2", to: "c3", order: 1 },
    ],
  },
  primaryFunctionalGroupId: "carbonyl",
  functionalGroupIds: ["carbonyl"],
  reagentRelations: [
    { id: "sulfuric-acid", description: "Strong acid that protonates carbonyl oxygen in acid-catalysed chemistry." },
  ],
  reactionRelations: [],
  labRelations: [
    { id: "spectroscopy-lab", label: "Spectroscopy lab", description: "Inspect acetone's carbonyl IR band and symmetric NMR signals." },
    { id: "curved-arrow-designer", label: "Curved-arrow designer", description: "Practise electron flow at a polar carbonyl group." },
  ],
  lessonRelations: [
    { id: "formal-charge", description: "Track oxygen protonation and charged intermediates correctly." },
    { id: "resonance", description: "Connect carbonyl polarization to resonance contributors." },
  ],
  capabilities: { workspace: true, spectroscopy: true, reactionPrediction: false, retrosynthesis: false, calculations: true },
  workspace: {
    functionalGroupLabel: "Ketone",
    summary: "A symmetric carbonyl compound with a diagnostic IR absorption and simple NMR pattern.",
  },
});
