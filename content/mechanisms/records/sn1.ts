import { defineMechanism } from "../mechanism-types";

export const sn1 = defineMechanism({
  id: "sn1",
  reactionId: "sn1",
  featureId: "sn1",
  title: "SN1 substitution",
  shortTitle: "SN1",
  aliases: ["unimolecular nucleophilic substitution"],
  description: "A stepwise substitution through leaving-group departure, carbocation formation, nucleophile attack, and deprotonation.",
  href: "/lab/sn1-mechanism",
  playerId: "sn1",
  mechanismClass: "Carbocation",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["substitution", "carbocation", "solvolysis"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
