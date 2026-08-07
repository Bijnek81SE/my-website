import { defineReagent } from "../reagent-types";

export const bromine = defineReagent({
  kind: "reagent",
  id: "bromine",
  slug: "bromine",
  name: "Bromine",
  aliases: ["Br2", "molecular bromine"],
  formula: "Br₂",
  category: "Electrophile",
  summary: "An electrophilic halogen source for alkene halogenation.",
  purpose: "Converts an alkene into a vicinal dibromide through a bromonium ion.",
  selectivity: "Anti addition with no carbocation rearrangement.",
  conditions: ["Inert solvent", "Avoid radical conditions unless desired"],
  limitations: ["Reactive toward many nucleophiles", "Poor selectivity in complex mixtures"],
  safety: "Toxic, corrosive, and volatile; use appropriate containment.",
  alternativeNames: ["NBS for allylic bromination", "Cl₂ for chlorination"],
  reactionIds: ["halogenation"],
  mechanismIds: ["halogenation"],
  moleculeIds: ["ethene", "propene", "1-butene", "cis-2-butene", "trans-2-butene", "cyclohexene", "styrene"],
  lessonIds: ["chemical-bonding", "formal-charge"],
  keywords: ["halogen", "bromonium", "anti addition", "alkene", "dibromide"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
