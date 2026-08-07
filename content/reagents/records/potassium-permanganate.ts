import { defineReagent } from "../reagent-types";

export const potassiumPermanganate = defineReagent({
  kind: "reagent",
  id: "potassium-permanganate",
  slug: "potassium-permanganate",
  name: "Potassium permanganate",
  aliases: ["KMnO4", "permanganate"],
  formula: "KMnO₄",
  category: "Oxidizing agent",
  summary: "A strong oxidant whose alkene products depend strongly on concentration, temperature, and workup.",
  purpose: "Under vigorous conditions, cleaves C=C bonds and oxidises fragments; under mild cold conditions it can form syn vicinal diols.",
  selectivity: "Hot or concentrated conditions favour oxidative cleavage; terminal alkene carbons can be oxidised to CO₂ after cleavage.",
  conditions: ["Hot, concentrated or strongly oxidative conditions for cleavage", "Cold, dilute, neutral/basic conditions for mild dihydroxylation"],
  limitations: ["Can over-oxidise sensitive groups", "Mixtures may result when conditions are poorly controlled"],
  safety: "Strong oxidiser; keep away from reducing agents, acids where incompatible, and combustible materials.",
  alternativeNames: ["OsO₄ for selective syn dihydroxylation", "O₃ followed by reductive workup for carbonyl-preserving cleavage"],
  reactionIds: ["oxidative-cleavage"],
  mechanismIds: ["oxidative-cleavage"],
  moleculeIds: ["propene", "1-butene", "cyclohexene", "styrene"],
  lessonIds: ["chemical-bonding"],
  keywords: ["KMnO4", "permanganate", "oxidative cleavage", "alkene oxidation", "vicinal diol"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
