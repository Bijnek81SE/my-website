import { defineReagent } from "../reagent-types";

export const hbrPeroxide = defineReagent({
  kind: "reagent",
  id: "hbr-peroxide",
  slug: "hbr-peroxide",
  name: "HBr with peroxide",
  aliases: ["HBr ROOR", "peroxide effect", "radical HBr"],
  formula: "HBr, ROOR",
  category: "Radical initiator",
  summary: "A radical-chain system for anti-Markovnikov addition of HBr to alkenes.",
  purpose: "Forms the less substituted alkyl bromide from an unsymmetrical alkene.",
  selectivity: "Anti-Markovnikov; not generally stereospecific.",
  conditions: ["Peroxide initiator", "Heat or light"],
  limitations: ["The peroxide effect is reliable for HBr, not HCl or HI", "Radical-sensitive groups may interfere"],
  safety: "Peroxides can be shock-sensitive; HBr is corrosive.",
  alternativeNames: ["Hydrohalogenation without peroxide for Markovnikov addition"],
  reactionIds: ["radical-hbr"],
  mechanismIds: ["radical-hbr"],
  moleculeIds: ["propene"],
  lessonIds: ["chemical-bonding", "resonance"],
  keywords: ["radical", "peroxide", "anti markovnikov", "bromide", "HBr"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
