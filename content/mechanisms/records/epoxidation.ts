import { defineMechanism } from "../mechanism-types";

export const epoxidation = defineMechanism({
  id: "epoxidation",
  reactionId: "epoxidation",
  featureId: "epoxidation",
  title: "Alkene epoxidation mechanism",
  shortTitle: "Epoxidation",
  aliases: ["peracid epoxidation mechanism", "mCPBA epoxidation"],
  description: "Study the concerted peracid oxygen-transfer mechanism that converts an alkene to an epoxide without a carbocation intermediate.",
  href: "/lab/epoxidation",
  playerId: "epoxidation",
  mechanismClass: "Peracid concerted",
  prerequisiteNodeIds: ["lesson:chemical-bonding", "lesson:formal-charge"],
  keywords: ["epoxide", "mCPBA", "peracid", "concerted", "oxygen transfer"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
