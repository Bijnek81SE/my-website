import { defineMechanism } from "../mechanism-types";

export const radical_hbr = defineMechanism({
  id: "radical-hbr",
  reactionId: "radical-hbr",
  featureId: "radical-hbr-addition",
  title: "Radical HBr addition to alkenes",
  shortTitle: "Radical HBr addition",
  aliases: ["peroxide effect", "anti Markovnikov HBr"],
  description: "A radical-chain mechanism that gives anti-Markovnikov HBr addition in the presence of peroxides.",
  href: "/lab/radical-hbr-addition",
  playerId: "radical-hbr",
  mechanismClass: "Radical",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:resonance"],
  keywords: ["alkene", "radical", "peroxide effect"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
