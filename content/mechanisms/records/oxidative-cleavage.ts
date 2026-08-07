import { defineMechanism } from "../mechanism-types";

export const oxidativeCleavage = defineMechanism({
  id: "oxidative-cleavage",
  reactionId: "oxidative-cleavage",
  featureId: "oxidative-cleavage",
  title: "Permanganate oxidative cleavage mechanism",
  shortTitle: "Oxidative cleavage",
  aliases: ["hot permanganate mechanism", "KMnO4 alkene cleavage"],
  description: "Study initial alkene oxidation followed by C–C bond cleavage and oxidation-state analysis of the resulting fragments.",
  href: "/lab/oxidative-cleavage",
  playerId: "oxidative-cleavage",
  mechanismClass: "Permanganate oxidation",
  prerequisiteNodeIds: ["lesson:chemical-bonding"],
  keywords: ["KMnO4", "permanganate", "cleavage", "carboxylic acid", "ketone"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
