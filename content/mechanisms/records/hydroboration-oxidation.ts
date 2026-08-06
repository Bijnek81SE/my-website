import { defineMechanism } from "../mechanism-types";

export const hydroboration_oxidation = defineMechanism({
  id: "hydroboration-oxidation",
  reactionId: "hydroboration-oxidation",
  featureId: "hydroboration-oxidation",
  title: "Hydroboration–oxidation of alkenes",
  shortTitle: "Hydroboration–oxidation",
  aliases: ["hydroboration oxidation"],
  description: "Concerted syn hydroboration followed by oxidation to an anti-Markovnikov alcohol.",
  href: "/lab/hydroboration-oxidation",
  playerId: "hydroboration-oxidation",
  mechanismClass: "Organoborane",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["alkene", "anti Markovnikov", "syn addition"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
