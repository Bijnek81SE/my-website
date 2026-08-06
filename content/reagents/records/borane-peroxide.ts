import { defineReagent } from "../reagent-types";

export const boranePeroxide = defineReagent({
  kind: "reagent",
  id: "borane-peroxide",
  slug: "borane-peroxide",
  name: "Borane / peroxide workup",
  aliases: ["BH3 H2O2", "hydroboration oxidation reagents", "borane peroxide"],
  formula: "1. BH₃  2. H₂O₂, OH⁻",
  category: "Electrophile",
  summary: "A two-stage system for anti-Markovnikov hydration of alkenes.",
  purpose: "Installs OH at the less substituted alkene carbon.",
  selectivity: "Anti-Markovnikov, syn addition, and no carbocation rearrangement.",
  conditions: ["Anhydrous hydroboration", "Basic peroxide oxidation"],
  limitations: ["Borane is moisture-sensitive", "Oxidative workup must be controlled"],
  safety: "Borane reagents can be pyrophoric; concentrated peroxide is hazardous.",
  alternativeNames: ["9-BBN for improved selectivity", "Oxymercuration for Markovnikov hydration"],
  reactionIds: ["hydroboration-oxidation"],
  mechanismIds: ["hydroboration-oxidation"],
  moleculeIds: ["propene"],
  lessonIds: ["chemical-bonding", "hybridization"],
  keywords: ["anti markovnikov", "syn", "alcohol", "alkene", "hydroboration"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
