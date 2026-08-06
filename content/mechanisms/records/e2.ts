import { defineMechanism } from "../mechanism-types";

export const e2 = defineMechanism({
  id: "e2",
  reactionId: "e2",
  featureId: "e2",
  title: "E2 elimination",
  shortTitle: "E2",
  aliases: ["bimolecular elimination"],
  description: "A concerted elimination through beta-hydrogen abstraction, pi-bond formation, and leaving-group departure.",
  href: "/lab/e2-mechanism",
  playerId: "e2",
  mechanismClass: "Concerted",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["elimination", "anti periplanar", "alkene"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
