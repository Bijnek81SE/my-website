import { defineMechanism } from "../mechanism-types";

export const synDihydroxylation = defineMechanism({
  id: "syn-dihydroxylation",
  reactionId: "syn-dihydroxylation",
  featureId: "syn-dihydroxylation",
  title: "Syn dihydroxylation mechanism",
  shortTitle: "Syn dihydroxylation",
  aliases: ["osmium tetroxide mechanism", "osmate ester mechanism"],
  description: "Follow cyclic osmate-ester formation and hydrolysis to understand why OsO₄ gives stereospecific syn vicinal diols.",
  href: "/lab/syn-dihydroxylation",
  playerId: "syn-dihydroxylation",
  mechanismClass: "Osmate ester",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:hybridization"],
  keywords: ["OsO4", "syn", "vicinal diol", "osmate ester", "alkene oxidation"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
