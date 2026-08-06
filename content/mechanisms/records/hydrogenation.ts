import { defineMechanism } from "../mechanism-types";

export const hydrogenation = defineMechanism({
  id: "hydrogenation",
  reactionId: "hydrogenation",
  featureId: "hydrogenation",
  title: "Catalytic hydrogenation of alkenes",
  shortTitle: "Hydrogenation",
  aliases: ["alkene reduction"],
  description: "Surface-catalysed syn addition of hydrogen across a carbon-carbon double bond.",
  href: "/lab/hydrogenation",
  playerId: "hydrogenation",
  mechanismClass: "Surface catalysis",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["alkene", "reduction", "syn addition"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
