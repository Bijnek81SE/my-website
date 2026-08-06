import { defineMechanism } from "../mechanism-types";

export const sn2 = defineMechanism({
  id: "sn2",
  reactionId: "sn2",
  featureId: "sn2",
  title: "SN2 substitution",
  shortTitle: "SN2",
  aliases: ["bimolecular nucleophilic substitution"],
  description: "A concerted substitution through backside nucleophile attack and simultaneous leaving-group departure.",
  href: "/lab/sn2-mechanism",
  playerId: "sn2",
  mechanismClass: "Concerted",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["substitution", "backside attack", "inversion"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
