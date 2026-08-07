import { defineReagent } from "../reagent-types";

export const ozone = defineReagent({
  kind: "reagent",
  id: "ozone",
  slug: "ozone",
  name: "Ozone",
  aliases: ["O3", "ozonolysis reagent"],
  formula: "O₃",
  category: "Oxidizing agent",
  summary: "A powerful oxidant that cleaves alkene double bonds through ozonide intermediates.",
  purpose: "Converts an alkene into carbonyl fragments after reductive workup and reveals the substitution pattern of the original C=C bond.",
  selectivity: "Each alkene carbon becomes a carbonyl carbon under reductive workup.",
  conditions: ["Low temperature commonly used during ozone addition", "Follow with a reductive workup such as Zn/H₂O or Me₂S"],
  limitations: ["Strong oxidant", "Workup determines whether aldehydes survive or are oxidised further"],
  safety: "Toxic oxidising gas; ozone and ozonide intermediates require specialised handling and avoidance of accumulation.",
  alternativeNames: ["Hot KMnO₄ for oxidative cleavage"],
  reactionIds: ["ozonolysis"],
  mechanismIds: ["ozonolysis"],
  moleculeIds: ["propene", "1-butene", "2-methylpropene", "cyclohexene", "styrene"],
  lessonIds: ["chemical-bonding", "formal-charge"],
  keywords: ["ozone", "ozonolysis", "cleavage", "carbonyl", "ozonide"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
