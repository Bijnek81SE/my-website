import { defineMechanism } from "../mechanism-types";

export const ozonolysis = defineMechanism({
  id: "ozonolysis",
  reactionId: "ozonolysis",
  featureId: "ozonolysis",
  title: "Reductive ozonolysis mechanism",
  shortTitle: "Ozonolysis",
  aliases: ["Criegee ozonolysis mechanism", "ozonide cleavage"],
  description: "Trace ozone cycloaddition, molozonide fragmentation, ozonide formation, and reductive workup to carbonyl products.",
  href: "/lab/ozonolysis",
  playerId: "ozonolysis",
  mechanismClass: "Ozonide cleavage",
  prerequisiteNodeIds: ["lesson:formal-charge", "lesson:chemical-bonding"],
  keywords: ["ozone", "molozonide", "ozonide", "cleavage", "carbonyl"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
