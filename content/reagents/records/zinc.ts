import { defineReagent } from "../reagent-types";

export const zinc = defineReagent({
  kind: "reagent",
  id: "zinc",
  slug: "zinc",
  name: "Zinc reductive workup",
  aliases: ["Zn", "Zn/H2O", "zinc water workup"],
  formula: "Zn, H₂O",
  category: "Reducing agent",
  summary: "A reductive ozonolysis workup that converts ozonide-derived intermediates to aldehydes and ketones.",
  purpose: "Reduces peroxide-rich ozonolysis intermediates while preserving aldehyde products from further oxidation.",
  selectivity: "Used after ozone; it does not determine the C=C cleavage pattern but controls the oxidation state of products.",
  conditions: ["Added after ozonation", "Aqueous workup"],
  limitations: ["Not an alkene reagent by itself", "Alternative reductive workups may be more convenient"],
  safety: "Finely divided zinc is combustible; avoid strong oxidants until the ozonation step is safely complete.",
  alternativeNames: ["Dimethyl sulfide", "Triphenylphosphine"],
  reactionIds: ["ozonolysis"],
  mechanismIds: ["ozonolysis"],
  moleculeIds: ["propene", "cyclohexene", "styrene"],
  lessonIds: ["formal-charge"],
  keywords: ["zinc", "reductive workup", "ozonolysis", "aldehyde", "ketone"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
