import { sn1 } from "./records/sn1";
import { sn2 } from "./records/sn2";
import { e1 } from "./records/e1";
import { e2 } from "./records/e2";
import { electrophilic_addition } from "./records/electrophilic-addition";
import { hydrohalogenation } from "./records/hydrohalogenation";
import { hydration } from "./records/hydration";
import { halogenation } from "./records/halogenation";
import { hydrogenation } from "./records/hydrogenation";
import { hydroboration_oxidation } from "./records/hydroboration-oxidation";
import { oxymercuration_demercuration } from "./records/oxymercuration-demercuration";
import { radical_hbr } from "./records/radical-hbr";

import type { ReactionDefinition } from "./reaction-types";

export const reactions: readonly ReactionDefinition[] = [
  sn1, sn2, e1, e2, electrophilic_addition, hydrohalogenation, hydration, halogenation, hydrogenation, hydroboration_oxidation, oxymercuration_demercuration, radical_hbr
];

const reactionsById = new Map(reactions.map((reaction) => [reaction.id, reaction]));
const reactionsByAlias = new Map(
  reactions.flatMap((reaction) =>
    [reaction.title, reaction.shortTitle, ...reaction.aliases].map((alias) => [alias.trim().toLowerCase(), reaction] as const),
  ),
);

export function getReaction(id: string): ReactionDefinition | undefined {
  return reactionsById.get(id);
}

export function requireReaction(id: string): ReactionDefinition {
  const reaction = getReaction(id);
  if (!reaction) throw new Error(`Unknown reaction: ${id}`);
  return reaction;
}

export function findReactionByNameOrAlias(value: string): ReactionDefinition | undefined {
  return reactionsByAlias.get(value.trim().toLowerCase());
}

export function getReactions(ids: readonly string[]): readonly ReactionDefinition[] {
  return ids.map((id) => reactionsById.get(id)).filter((reaction): reaction is ReactionDefinition => Boolean(reaction));
}
