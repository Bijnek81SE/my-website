import { defineReagent } from "../reagent-types";

export const mcpba = defineReagent({
  kind: "reagent",
  id: "mcpba",
  slug: "mcpba",
  name: "m-Chloroperoxybenzoic acid",
  aliases: ["mCPBA", "meta-chloroperbenzoic acid", "3-chloroperoxybenzoic acid"],
  formula: "mCPBA",
  category: "Oxidizing agent",
  summary: "A peracid widely used for direct, stereospecific epoxidation of alkenes.",
  purpose: "Transfers an oxygen atom to a carbon–carbon double bond in one concerted step to form an epoxide.",
  selectivity: "Alkene stereochemistry is retained in the epoxide because oxygen transfer is concerted.",
  conditions: ["Usually an aprotic organic solvent", "Moderate temperature"],
  limitations: ["Can oxidise other nucleophilic functional groups", "Commercial reagent often contains water and m-chlorobenzoic acid"],
  safety: "Organic peroxide and oxidant; avoid heat, shock, contamination, and contact with combustible material.",
  alternativeNames: ["Peracetic acid", "Dimethyldioxirane for specialised epoxidations"],
  reactionIds: ["epoxidation", "anti-dihydroxylation"],
  mechanismIds: ["epoxidation", "anti-dihydroxylation"],
  moleculeIds: ["propene", "cis-2-butene", "trans-2-butene", "cyclohexene", "styrene"],
  lessonIds: ["chemical-bonding", "formal-charge"],
  keywords: ["peracid", "epoxide", "epoxidation", "concerted", "alkene oxidation"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
