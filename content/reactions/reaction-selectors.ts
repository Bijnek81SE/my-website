import { reactions } from "./reaction-registry";
import type { ReactionCapabilities, ReactionDefinition, ReactionFamily, ReactionMechanismClass } from "./reaction-types";

export type ReactionQuery = {
  query?: string;
  family?: ReactionFamily | "All";
  mechanismClass?: ReactionMechanismClass | "All";
  steps?: ReactionDefinition["steps"] | "All";
  capability?: keyof ReactionCapabilities;
};

export function selectReactions(query: ReactionQuery = {}): readonly ReactionDefinition[] {
  const normalized = query.query?.trim().toLowerCase() ?? "";
  return reactions.filter((reaction) => {
    const searchable = [reaction.title, reaction.shortTitle, ...reaction.aliases, reaction.description, reaction.family, reaction.mechanismClass, reaction.substrate, reaction.product, ...reaction.reagents, ...reaction.keywords].join(" ").toLowerCase();
    return (!normalized || searchable.includes(normalized))
      && (!query.family || query.family === "All" || reaction.family === query.family)
      && (!query.mechanismClass || query.mechanismClass === "All" || reaction.mechanismClass === query.mechanismClass)
      && (!query.steps || query.steps === "All" || reaction.steps === query.steps)
      && (!query.capability || reaction.capabilities[query.capability]);
  });
}

export function getReactionFamilies(): readonly ReactionFamily[] {
  return [...new Set(reactions.map((reaction) => reaction.family))].sort();
}

export function getReactionMechanismClasses(): readonly ReactionMechanismClass[] {
  return [...new Set(reactions.map((reaction) => reaction.mechanismClass))].sort();
}
