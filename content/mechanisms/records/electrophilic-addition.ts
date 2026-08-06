import { defineMechanism } from "../mechanism-types";

export const electrophilic_addition = defineMechanism({
  id: "electrophilic-addition",
  reactionId: "electrophilic-addition",
  featureId: "electrophilic-addition",
  title: "Electrophilic addition to alkenes",
  shortTitle: "Electrophilic addition",
  aliases: ["alkene electrophilic addition"],
  description: "Electrophilic attack on an alkene followed by nucleophile capture of the electron-poor intermediate.",
  href: "/lab/electrophilic-addition",
  playerId: "electrophilic-addition",
  mechanismClass: "Carbocation",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["alkene", "pi bond", "electrophile"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
