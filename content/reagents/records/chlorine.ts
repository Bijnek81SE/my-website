import { defineReagent } from "../reagent-types";

export const chlorine = defineReagent({
  kind: "reagent",
  id: "chlorine",
  slug: "chlorine",
  name: "Chlorine",
  aliases: ["Cl2", "molecular chlorine"],
  formula: "Cl₂",
  category: "Electrophile",
  summary: "An electrophilic halogen source for alkene chlorination.",
  purpose: "Adds across an alkene through a chloronium ion to form a vicinal dichloride.",
  selectivity: "Anti addition with no free-carbocation rearrangement.",
  conditions: ["Inert solvent", "Exclude strong radical initiators when electrophilic addition is desired"],
  limitations: ["Highly reactive", "Can chlorinate other activated sites under unsuitable conditions"],
  safety: "Toxic, corrosive gas; requires rigorous ventilation and appropriate containment.",
  alternativeNames: ["Br₂ for bromination"],
  reactionIds: ["halogenation"],
  mechanismIds: ["halogenation"],
  moleculeIds: ["ethene", "propene", "cyclohexene"],
  lessonIds: ["chemical-bonding", "formal-charge"],
  keywords: ["chlorine", "chloronium", "anti addition", "alkene", "dichloride"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
