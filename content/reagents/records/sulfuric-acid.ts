import { defineReagent } from "../reagent-types";

export const sulfuricAcid = defineReagent({
  kind: "reagent",
  id: "sulfuric-acid",
  slug: "sulfuric-acid",
  name: "Sulfuric acid",
  aliases: ["H2SO4", "sulphuric acid"],
  formula: "H₂SO₄",
  category: "Acid",
  summary: "A strong Brønsted acid used to activate alkenes and oxygen-containing groups.",
  purpose: "Catalyses hydration and dehydration by proton transfer.",
  selectivity: "Acid-catalysed alkene hydration is usually Markovnikov and can rearrange.",
  conditions: ["Dilute aqueous acid for hydration", "Heat and concentrated acid for dehydration"],
  limitations: ["Carbocation rearrangements", "Strongly acidic conditions may damage sensitive groups"],
  safety: "Highly corrosive and strongly dehydrating.",
  alternativeNames: ["Phosphoric acid", "Oxymercuration for hydration without rearrangement"],
  reactionIds: ["hydration", "e1"],
  mechanismIds: ["hydration", "e1"],
  moleculeIds: ["ethanol", "acetone", "ethyl-acetate", "propene"],
  lessonIds: ["formal-charge", "resonance"],
  keywords: ["acid", "protonation", "hydration", "dehydration", "Markovnikov"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
