import { defineReagent } from "../reagent-types";

export const hydrogenBromide = defineReagent({
  kind: "reagent",
  id: "hydrogen-bromide",
  slug: "hydrogen-bromide",
  name: "Hydrogen bromide",
  aliases: ["HBr", "hydrobromic acid"],
  formula: "HBr",
  category: "Acid",
  summary: "A hydrogen halide used for ionic Markovnikov addition to alkenes and, with peroxides, for a distinct radical anti-Markovnikov pathway.",
  purpose: "Under ionic conditions, protonates an alkene and supplies bromide to trap the resulting carbocation.",
  selectivity: "Markovnikov without peroxide; the peroxide-initiated radical pathway is represented separately by the HBr/peroxide reagent system.",
  conditions: ["Exclude peroxide for the ionic pathway"],
  limitations: ["Carbocation rearrangements can occur in ionic hydrohalogenation", "Peroxide changes both mechanism and regiochemistry"],
  safety: "Corrosive and strongly irritating; aqueous solutions are strong acids.",
  alternativeNames: ["HCl", "HI", "HBr/ROOR for anti-Markovnikov addition"],
  reactionIds: ["hydrohalogenation"],
  mechanismIds: ["hydrohalogenation"],
  moleculeIds: ["ethene", "propene", "1-butene", "2-methylpropene", "styrene"],
  lessonIds: ["resonance", "formal-charge"],
  keywords: ["HBr", "hydrohalogenation", "Markovnikov", "bromide", "carbocation"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
