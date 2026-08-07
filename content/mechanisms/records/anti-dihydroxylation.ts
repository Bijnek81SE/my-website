import { defineMechanism } from "../mechanism-types";

export const antiDihydroxylation = defineMechanism({
  id: "anti-dihydroxylation",
  reactionId: "anti-dihydroxylation",
  featureId: "anti-dihydroxylation",
  title: "Anti dihydroxylation mechanism",
  shortTitle: "Anti dihydroxylation",
  aliases: ["epoxide hydrolysis mechanism", "anti diol formation"],
  description: "Connect peracid epoxidation with acid-catalysed backside epoxide opening to explain anti vicinal diol formation.",
  href: "/lab/anti-dihydroxylation",
  playerId: "anti-dihydroxylation",
  mechanismClass: "Epoxide opening",
  prerequisiteNodeIds: ["lesson:formal-charge", "lesson:chemical-bonding"],
  keywords: ["epoxide", "anti", "vicinal diol", "ring opening", "acid"],
  capabilities: { lab: true, practice: true, exam: true, analytics: true, workspace: true },
});
