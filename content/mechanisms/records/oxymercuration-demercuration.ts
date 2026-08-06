import { defineMechanism } from "../mechanism-types";

export const oxymercuration_demercuration = defineMechanism({
  id: "oxymercuration-demercuration",
  reactionId: "oxymercuration-demercuration",
  featureId: "oxymercuration-demercuration",
  title: "Oxymercuration–demercuration of alkenes",
  shortTitle: "Oxymercuration–demercuration",
  aliases: ["oxymercuration demercuration"],
  description: "Markovnikov hydration through a bridged mercurinium ion followed by reductive demercuration.",
  href: "/lab/oxymercuration-demercuration",
  playerId: "oxymercuration-demercuration",
  mechanismClass: "Organomercury",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["alkene", "mercurinium ion", "Markovnikov"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
