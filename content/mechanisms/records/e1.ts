import { defineMechanism } from "../mechanism-types";

export const e1 = defineMechanism({
  id: "e1",
  reactionId: "e1",
  featureId: "e1",
  title: "E1 elimination",
  shortTitle: "E1",
  aliases: ["unimolecular elimination"],
  description: "A stepwise elimination through ionisation, carbocation formation, beta deprotonation, and alkene formation.",
  href: "/lab/e1-mechanism",
  playerId: "e1",
  mechanismClass: "Carbocation",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["elimination", "carbocation", "alkene"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
