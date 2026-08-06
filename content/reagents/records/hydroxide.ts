import { defineReagent } from "../reagent-types";

export const hydroxide = defineReagent({
  kind: "reagent",
  id: "hydroxide",
  slug: "hydroxide",
  name: "Hydroxide",
  aliases: ["hydroxide ion", "OH-", "HO-"],
  formula: "HO⁻",
  category: "Base",
  summary: "A strong base and useful oxygen nucleophile.",
  purpose: "Promotes substitution or elimination depending on substrate, solvent, and temperature.",
  selectivity: "Primary substrates often favour SN2; hindered substrates and heat favour elimination.",
  conditions: ["Aqueous or alcoholic solvent", "Temperature controls substitution/elimination balance"],
  limitations: ["Can cause competing elimination", "Not compatible with strongly acidic functionality"],
  safety: "Corrosive; avoid skin and eye contact.",
  alternativeNames: ["Alkoxides", "Water for milder nucleophilicity"],
  reactionIds: ["sn2", "e2"],
  mechanismIds: ["sn2", "e2"],
  moleculeIds: ["2-bromopropane"],
  lessonIds: ["chemical-bonding", "formal-charge"],
  keywords: ["base", "nucleophile", "OH", "substitution", "elimination"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
