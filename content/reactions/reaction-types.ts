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

export type ReactionDefinition = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  family: ReactionFamily;
  mechanismClass: ReactionMechanismClass;
  substrate: string;
  product: string;
  reagents: readonly string[];
  conditions: readonly string[];
  steps: "Concerted" | "Stepwise";
  intermediate: string;
  selectivity: ReactionSelectivity;
  keyIdea: string;
  competingReactionIds: readonly string[];
  relatedReactionIds: readonly string[];
  prerequisiteNodeIds: readonly string[];
  mechanismHref: string;
  keywords: readonly string[];
};
