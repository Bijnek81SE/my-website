import { defineMolecule } from "../molecule-types";

export const propene = defineMolecule({
  id: "propene",
  name: "Propene",
  aliases: ["propylene"],
  formula: "C3H6",
  displayFormula: "C₃H₆",
  condensedFormula: "CH3CH=CH2",
  smiles: "CC=C",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 45, y: 72, label: "CH₃" },
      { id: "c2", element: "C", x: 120, y: 72, label: "CH" },
      { id: "c3", element: "C", x: 195, y: 72, label: "CH₂" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "c3", order: 2 },
    ],
  },
  primaryFunctionalGroupId: "alkene",
  functionalGroupIds: ["alkene"],
  reagentRelations: [
    { id: "bromine", description: "Forms a vicinal dibromide through a bromonium ion." },
    { id: "borane-peroxide", description: "Gives anti-Markovnikov, syn hydration without rearrangement." },
    { id: "sulfuric-acid", description: "Catalyses Markovnikov hydration through carbocation chemistry." },
    { id: "hydrogen-palladium", description: "Reduces the C=C bond to propane." },
    { id: "hbr-peroxide", description: "Produces anti-Markovnikov radical addition of HBr." },
  ],
  reactionRelations: [
    { id: "hydrohalogenation", label: "Hydrohalogenation", description: "Markovnikov HX addition through a carbocation." },
    { id: "hydration", label: "Hydration", description: "Compare Markovnikov and anti-Markovnikov routes to alcohols." },
    { id: "halogenation", label: "Halogenation", description: "Anti addition through a bridged halonium ion." },
    { id: "hydrogenation", label: "Hydrogenation", description: "Syn reduction on a metal surface." },
  ],
  labRelations: [
    { id: "hydrohalogenation", description: "Follow Markovnikov ionic HBr addition step by step." },
    { id: "hydroboration-oxidation", label: "Hydroboration–oxidation", description: "Explore anti-Markovnikov, syn hydration." },
    { id: "halogenation", description: "See bromonium-ion formation and anti addition." },
    { id: "reaction-prediction-lab", label: "Reaction prediction", description: "Predict products and explain selectivity." },
    { id: "retrosynthesis-planner", label: "Retrosynthesis planner", description: "Use propene as a strategic precursor in backward planning." },
  ],
  lessonRelations: [
    { id: "chemical-bonding", description: "Review sigma and pi bonds in C=C." },
    { id: "hybridization", description: "Understand trigonal-planar sp² alkene carbons." },
    { id: "resonance", description: "Prepare for carbocation stability and delocalization." },
  ],
  capabilities: { workspace: true, spectroscopy: false, reactionPrediction: true, retrosynthesis: true, calculations: true },
  workspace: {
    functionalGroupLabel: "Alkene",
    summary: "The shared starting point for hydrohalogenation, hydration, halogenation, hydrogenation, and synthesis-planning exercises.",
    predictionChallengeId: "propene-hbr",
    preferredMechanismFeatureId: "hydrohalogenation",
  },
});
