import { defineReagent } from "../reagent-types";

export const osmiumTetroxide = defineReagent({
  kind: "reagent",
  id: "osmium-tetroxide",
  slug: "osmium-tetroxide",
  name: "Osmium tetroxide",
  aliases: ["OsO4", "osmium(VIII) oxide"],
  formula: "OsO₄",
  category: "Oxidizing agent",
  summary: "A highly selective oxidant for syn dihydroxylation of alkenes.",
  purpose: "Forms a cyclic osmate ester with an alkene, then hydrolysis gives a vicinal syn diol.",
  selectivity: "Syn addition of the two oxygen substituents; stereospecific with respect to alkene geometry.",
  conditions: ["Often catalytic OsO₄ with a stoichiometric co-oxidant", "Aqueous or mixed solvent workup"],
  limitations: ["Very toxic and volatile", "Cost encourages catalytic rather than stoichiometric use"],
  safety: "Extremely toxic and volatile; exposure can cause severe eye injury. Handle only with rigorous containment.",
  alternativeNames: ["Cold, dilute KMnO₄ for less selective syn dihydroxylation"],
  reactionIds: ["syn-dihydroxylation"],
  mechanismIds: ["syn-dihydroxylation"],
  moleculeIds: ["ethene", "cis-2-butene", "trans-2-butene", "cyclohexene"],
  lessonIds: ["chemical-bonding", "hybridization"],
  keywords: ["OsO4", "syn dihydroxylation", "vicinal diol", "osmate ester", "alkene oxidation"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
