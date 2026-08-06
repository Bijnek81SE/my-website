export type MechanismCapability = {
  lab: boolean;
  practice: boolean;
  exam: boolean;
  analytics: boolean;
  workspace: boolean;
};

export type MechanismDefinition = {
  id: string;
  reactionId: string;
  featureId: string;
  title: string;
  shortTitle: string;
  aliases: readonly string[];
  description: string;
  href: `/${string}`;
  playerId: string;
  mechanismClass: string;
  prerequisiteNodeIds: readonly string[];
  keywords: readonly string[];
  capabilities: MechanismCapability;
};

export function defineMechanism<const T extends MechanismDefinition>(mechanism: T): T {
  return mechanism;
}
