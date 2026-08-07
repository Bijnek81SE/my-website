import { antiDihydroxylation } from "./records/anti-dihydroxylation";
import { epoxidation } from "./records/epoxidation";
import { oxidativeCleavage } from "./records/oxidative-cleavage";
import { ozonolysis } from "./records/ozonolysis";
import { synDihydroxylation } from "./records/syn-dihydroxylation";
import { e1 } from "./records/e1";
import { e2 } from "./records/e2";
import { electrophilic_addition } from "./records/electrophilic-addition";
import { halogenation } from "./records/halogenation";
import { hydration } from "./records/hydration";
import { hydroboration_oxidation } from "./records/hydroboration-oxidation";
import { hydrogenation } from "./records/hydrogenation";
import { hydrohalogenation } from "./records/hydrohalogenation";
import { oxymercuration_demercuration } from "./records/oxymercuration-demercuration";
import { radical_hbr } from "./records/radical-hbr";
import { sn1 } from "./records/sn1";
import { sn2 } from "./records/sn2";
import type { MechanismDefinition } from "./mechanism-types";

export const mechanisms: readonly MechanismDefinition[] = [
  sn1, sn2, e1, e2, electrophilic_addition, hydrohalogenation, hydration,
  halogenation, hydrogenation, hydroboration_oxidation,
  oxymercuration_demercuration, radical_hbr,
  epoxidation, synDihydroxylation, antiDihydroxylation, ozonolysis, oxidativeCleavage,
];

const byId = new Map(mechanisms.map((mechanism) => [mechanism.id, mechanism]));
const byRoute = new Map(mechanisms.map((mechanism) => [mechanism.href, mechanism]));
const byAlias = new Map(mechanisms.flatMap((mechanism) =>
  [mechanism.title, mechanism.shortTitle, ...mechanism.aliases].map((alias) => [alias.trim().toLowerCase(), mechanism] as const),
));

export function getMechanism(id: string): MechanismDefinition | undefined { return byId.get(id); }
export function requireMechanism(id: string): MechanismDefinition {
  const mechanism = getMechanism(id);
  if (!mechanism) throw new Error(`Unknown mechanism: ${id}`);
  return mechanism;
}
export function getMechanismByRoute(
  route: `/${string}`,
): MechanismDefinition | undefined {
  return byRoute.get(route);
}
export function findMechanismByNameOrAlias(value: string): MechanismDefinition | undefined { return byAlias.get(value.trim().toLowerCase()); }
export function getMechanismsByReaction(reactionId: string): readonly MechanismDefinition[] { return mechanisms.filter((mechanism) => mechanism.reactionId === reactionId); }
