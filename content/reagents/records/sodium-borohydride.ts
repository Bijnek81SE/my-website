import { defineReagent } from "../reagent-types";

export const sodiumBorohydride = defineReagent({
  kind: "reagent",
  id: "sodium-borohydride",
  slug: "sodium-borohydride",
  name: "Sodium borohydride",
  aliases: ["NaBH4", "sodium tetrahydroborate"],
  formula: "NaBH₄",
  category: "Reducing agent",
  summary: "A hydride donor used for carbonyl reduction and as the demercuration reagent in oxymercuration–demercuration.",
  purpose: "In alkene hydration chemistry, replaces the C–Hg bond formed during oxymercuration with C–H.",
  selectivity: "The oxymercuration sequence preserves Markovnikov placement of OH while avoiding classical carbocation rearrangements.",
  conditions: ["Used after oxymercuration", "Commonly in aqueous/basic workup conditions"],
  limitations: ["Also reduces many aldehydes and ketones", "Reactivity depends strongly on solvent and substrate"],
  safety: "Reacts with protic media to release hydrogen; handle dry solid and solutions with appropriate precautions.",
  alternativeNames: ["Other hydride reagents for specialised reductions"],
  reactionIds: ["oxymercuration-demercuration"],
  mechanismIds: ["oxymercuration-demercuration"],
  moleculeIds: ["propene", "2-methylpropene", "cyclohexene"],
  lessonIds: ["chemical-bonding"],
  keywords: ["NaBH4", "hydride", "demercuration", "reduction", "oxymercuration"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
