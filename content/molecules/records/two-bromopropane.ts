import { defineMolecule } from "../molecule-types";

export const twoBromopropane = defineMolecule({
  id: "2-bromopropane",
  name: "2-Bromopropane",
  aliases: ["isopropyl bromide"],
  formula: "C3H7Br",
  displayFormula: "C₃H₇Br",
  condensedFormula: "CH3CH(Br)CH3",
  smiles: "CC(Br)C",
  structure: {
    atoms: [
      { id: "c1", element: "C", x: 35, y: 72, label: "CH₃" },
      { id: "c2", element: "C", x: 110, y: 72, label: "CH" },
      { id: "c3", element: "C", x: 185, y: 72, label: "CH₃" },
      { id: "br1", element: "Br", x: 110, y: 15, label: "Br" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "c3", order: 1 },
      { id: "b3", from: "c2", to: "br1", order: 1 },
    ],
  },
  primaryFunctionalGroupId: "alkyl-halide",
  functionalGroupIds: ["alkyl-halide"],
  reagentRelations: [
    { id: "hydroxide", description: "Acts as a nucleophile or base depending on solvent and temperature." },
  ],
  reactionRelations: [
    { id: "sn1", label: "SN1 substitution", description: "Stepwise substitution through a carbocation." },
    { id: "sn2", label: "SN2 substitution", description: "Concerted substitution with backside attack." },
    { id: "e1", label: "E1 elimination", description: "Stepwise alkene formation from a carbocation." },
    { id: "e2", label: "E2 elimination", description: "Concerted elimination promoted by a strong base." },
  ],
  labRelations: [
    { id: "sn1", label: "SN1 mechanism", description: "Explore ionization and carbocation capture." },
    { id: "sn2", label: "SN2 mechanism", description: "Compare backside attack and steric effects." },
    { id: "e1", label: "E1 mechanism", description: "Follow stepwise carbocation elimination." },
    { id: "e2", label: "E2 mechanism", description: "See concerted anti-periplanar elimination." },
    { id: "reaction-prediction-lab", label: "Reaction prediction", description: "Choose substitution or elimination conditions." },
    { id: "retrosynthesis-planner", label: "Retrosynthesis planner", description: "Use this substrate in a multi-step route to 1-propanol." },
  ],
  lessonRelations: [
    { id: "chemical-bonding", description: "Understand C–Br polarization and bond cleavage." },
    { id: "hybridization", description: "Compare sp³ substrate geometry with sp² alkene products." },
    { id: "resonance", description: "Review when carbocations can be stabilized by delocalization." },
  ],
  capabilities: { workspace: true, spectroscopy: false, reactionPrediction: true, retrosynthesis: true, calculations: true },
  workspace: {
    functionalGroupLabel: "Secondary alkyl halide",
    summary: "A substitution/elimination substrate and synthesis-planning intermediate connected to the prediction engine.",
    predictionChallengeId: "tertiary-substitution-elimination",
    preferredMechanismFeatureId: "e2",
  },
});
