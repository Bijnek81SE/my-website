import { defineReagent } from "../reagent-types";

export const hydrogenChloride = defineReagent({
  kind: "reagent",
  id: "hydrogen-chloride",
  slug: "hydrogen-chloride",
  name: "Hydrogen chloride",
  aliases: ["HCl", "hydrochloric acid"],
  formula: "HCl",
  category: "Acid",
  summary: "A strong hydrogen halide used for ionic Markovnikov addition to alkenes.",
  purpose: "Protonates an alkene to form the more stable carbocation, which is then captured by chloride.",
  selectivity: "Markovnikov under the classical ionic pathway; carbocation rearrangements can occur.",
  conditions: ["No peroxide radical conditions", "Often used in a compatible solvent or as concentrated acid"],
  limitations: ["Rearrangements are possible", "Some poorly substituted alkenes react less readily than with HBr or HI"],
  safety: "Corrosive and irritating gas/acid; handle with suitable ventilation and acid-resistant protection.",
  alternativeNames: ["HBr", "HI"],
  reactionIds: ["hydrohalogenation"],
  mechanismIds: ["hydrohalogenation"],
  moleculeIds: ["ethene", "propene", "2-methylpropene", "cyclohexene"],
  lessonIds: ["resonance", "formal-charge"],
  keywords: ["HCl", "hydrohalogenation", "Markovnikov", "chloride", "carbocation"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
