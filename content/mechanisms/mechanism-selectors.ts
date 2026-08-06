import { mechanisms } from "./mechanism-registry";
import type { MechanismDefinition } from "./mechanism-types";

export type MechanismQuery = { query?: string; mechanismClass?: string; capability?: keyof MechanismDefinition["capabilities"] };

export function selectMechanisms(query: MechanismQuery = {}): readonly MechanismDefinition[] {
  const text = query.query?.trim().toLowerCase();
  return mechanisms.filter((mechanism) => {
    if (query.mechanismClass && mechanism.mechanismClass !== query.mechanismClass) return false;
    if (query.capability && !mechanism.capabilities[query.capability]) return false;
    if (!text) return true;
    return [mechanism.title, mechanism.shortTitle, mechanism.description, ...mechanism.aliases, ...mechanism.keywords]
      .some((value) => value.toLowerCase().includes(text));
  });
}
