import { defineMechanism } from "../mechanism-types";

export const hydrohalogenation = defineMechanism({
  id: "hydrohalogenation",
  reactionId: "hydrohalogenation",
  featureId: "hydrohalogenation",
  title: "Hydrohalogenation of alkenes",
  shortTitle: "Hydrohalogenation",
  aliases: ["HX addition"],
  description: "Markovnikov addition of a hydrogen halide through protonation, carbocation formation, and halide attack.",
  href: "/lab/hydrohalogenation",
  playerId: "hydrohalogenation",
  mechanismClass: "Carbocation",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["alkene", "Markovnikov", "hydrogen halide"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
