import { defineMechanism } from "../mechanism-types";

export const halogenation = defineMechanism({
  id: "halogenation",
  reactionId: "halogenation",
  featureId: "halogenation",
  title: "Halogenation of alkenes",
  shortTitle: "Halogenation",
  aliases: ["bromination of alkenes"],
  description: "Anti addition through halonium-ion formation and backside halide attack.",
  href: "/lab/halogenation",
  playerId: "halogenation",
  mechanismClass: "Halonium ion",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["alkene", "bromonium ion", "anti addition"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
