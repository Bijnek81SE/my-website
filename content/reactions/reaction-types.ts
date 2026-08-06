export type ReactionFamily =
  | "Substitution"
  | "Elimination"
  | "Alkene addition"
  | "Reduction";

export type ReactionMechanismClass =
  | "Concerted"
  | "Carbocation"
  | "Halonium ion"
  | "Organoborane"
  | "Organomercury"
  | "Radical"
  | "Surface catalysis";

export type ReactionSelectivity = {
  regioselectivity: string;
  stereochemistry: string;
  rearrangements: string;
};

export type ReactionCapabilities = {
  explorer: boolean;
  mechanism: boolean;
  prediction: boolean;
  retrosynthesis: boolean;
  workspace: boolean;
};

export type ReactionDefinition = {
  id: string;
  title: string;
  shortTitle: string;
  aliases: readonly string[];
  description: string;
  family: ReactionFamily;
  mechanismClass: ReactionMechanismClass;
  mechanismId: string;
  featureId: string;
  substrate: string;
  product: string;
  substrateFunctionalGroupIds: readonly string[];
  productFunctionalGroupIds: readonly string[];
  reagentIds: readonly string[];
  reagents: readonly string[];
  conditions: readonly string[];
  steps: "Concerted" | "Stepwise";
  intermediate: string;
  selectivity: ReactionSelectivity;
  keyIdea: string;
  competingReactionIds: readonly string[];
  relatedReactionIds: readonly string[];
  prerequisiteNodeIds: readonly string[];
  mechanismHref: `/${string}`;
  keywords: readonly string[];
  capabilities: ReactionCapabilities;
};

export function defineReaction<const T extends ReactionDefinition>(reaction: T): T {
  return reaction;
}
