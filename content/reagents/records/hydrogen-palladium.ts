import { defineReagent } from "../reagent-types";

export const hydrogenPalladium = defineReagent({
  kind: "reagent",
  id: "hydrogen-palladium",
  slug: "hydrogen-palladium",
  name: "Hydrogen with palladium",
  aliases: ["H2 Pd", "H2/Pd", "catalytic hydrogenation"],
  formula: "H₂, Pd",
  category: "Reducing agent",
  summary: "A catalytic system that reduces carbon–carbon multiple bonds.",
  purpose: "Hydrogenates alkenes to alkanes on a metal surface.",
  selectivity: "Typically syn delivery of hydrogen; other reducible groups may also react.",
  conditions: ["Hydrogen atmosphere", "Pd/C or related catalyst"],
  limitations: ["Catalyst poisoning", "May reduce multiple functional groups"],
  safety: "Hydrogen is flammable; catalysts can ignite when dry.",
  alternativeNames: ["Pt or Ni catalysts", "Diimide for metal-free alkene reduction"],
  reactionIds: ["hydrogenation"],
  mechanismIds: ["hydrogenation"],
  moleculeIds: ["propene", "toluene"],
  lessonIds: ["chemical-bonding", "hybridization"],
  keywords: ["reduction", "catalyst", "hydrogenation", "syn", "palladium"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
