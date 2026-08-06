import { defineMechanism } from "../mechanism-types";

export const hydration = defineMechanism({
  id: "hydration",
  reactionId: "hydration",
  featureId: "hydration",
  title: "Acid-catalysed hydration of alkenes",
  shortTitle: "Hydration",
  aliases: ["acid catalyzed hydration"],
  description: "Markovnikov hydration through protonation, carbocation formation, water attack, and deprotonation.",
  href: "/lab/hydration",
  playerId: "hydration",
  mechanismClass: "Carbocation",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["alkene", "hydration", "alcohol"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
