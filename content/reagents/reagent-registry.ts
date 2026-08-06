import { boranePeroxide } from "./records/borane-peroxide";
import { bromine } from "./records/bromine";
import { hbrPeroxide } from "./records/hbr-peroxide";
import { hydrogenPalladium } from "./records/hydrogen-palladium";
import { hydroxide } from "./records/hydroxide";
import { sulfuricAcid } from "./records/sulfuric-acid";
import type { ReagentDefinition } from "./reagent-types";

export const reagents = [
  hydroxide,
  sulfuricAcid,
  bromine,
  hydrogenPalladium,
  boranePeroxide,
  hbrPeroxide,
] as const satisfies readonly ReagentDefinition[];

const byId = new Map<string, ReagentDefinition>();
const bySlug = new Map<string, ReagentDefinition>();
const byAlias = new Map<string, ReagentDefinition>();

for (const reagent of reagents) {
  byId.set(reagent.id, reagent);
  bySlug.set(reagent.slug, reagent);
  for (const value of [reagent.name, reagent.id, reagent.slug, ...reagent.aliases]) {
    byAlias.set(value.trim().toLowerCase(), reagent);
  }
}

export function getReagent(idOrSlug: string): ReagentDefinition | undefined {
  return byId.get(idOrSlug) ?? bySlug.get(idOrSlug);
}

export function requireReagent(idOrSlug: string): ReagentDefinition {
  const reagent = getReagent(idOrSlug);
  if (!reagent) throw new Error(`Unknown reagent: ${idOrSlug}`);
  return reagent;
}

export function findReagentByNameOrAlias(value: string): ReagentDefinition | undefined {
  return byAlias.get(value.trim().toLowerCase());
}
