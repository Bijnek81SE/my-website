import { defineReagent } from "../reagent-types";

export const mercuricAcetate = defineReagent({
  kind: "reagent",
  id: "mercuric-acetate",
  slug: "mercuric-acetate",
  name: "Mercury(II) acetate",
  aliases: ["Hg(OAc)2", "mercuric acetate"],
  formula: "Hg(OAc)₂",
  category: "Electrophile",
  summary: "An electrophilic mercury(II) reagent used to activate alkenes during oxymercuration.",
  purpose: "Forms a bridged mercurinium ion that enables Markovnikov addition of water without a free carbocation.",
  selectivity: "Markovnikov hydration with strongly suppressed rearrangement.",
  conditions: ["Water-containing solvent", "Follow with NaBH₄ demercuration"],
  limitations: ["Mercury toxicity", "Rarely preferred in modern preparative practice when safer alternatives are available"],
  safety: "Highly toxic mercury compound; avoid exposure and environmental release.",
  alternativeNames: ["Acid-catalysed hydration", "Hydroboration–oxidation for opposite regiochemistry"],
  reactionIds: ["oxymercuration-demercuration"],
  mechanismIds: ["oxymercuration-demercuration"],
  moleculeIds: ["propene", "2-methylpropene", "cyclohexene"],
  lessonIds: ["formal-charge", "resonance"],
  keywords: ["mercurinium", "oxymercuration", "Markovnikov", "no rearrangement", "mercury acetate"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
