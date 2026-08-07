import { hydrogenBromide } from "./records/hydrogen-bromide";
import { hydrogenChloride } from "./records/hydrogen-chloride";
import { hydrogenIodide } from "./records/hydrogen-iodide";
import { chlorine } from "./records/chlorine";
import { mcpba } from "./records/mcpba";
import { mercuricAcetate } from "./records/mercuric-acetate";
import { osmiumTetroxide } from "./records/osmium-tetroxide";
import { ozone } from "./records/ozone";
import { potassiumPermanganate } from "./records/potassium-permanganate";
import { sodiumBorohydride } from "./records/sodium-borohydride";
import { zinc } from "./records/zinc";
import { boranePeroxide } from "./records/borane-peroxide";
import { bromine } from "./records/bromine";
import { hbrPeroxide } from "./records/hbr-peroxide";
import { hydrogenPalladium } from "./records/hydrogen-palladium";
import { hydroxide } from "./records/hydroxide";
import { potassiumTertButoxide } from "./records/potassium-tert-butoxide";
import { sulfuricAcid } from "./records/sulfuric-acid";
import type { ReagentDefinition } from "./reagent-types";

export const reagents = [
  hydroxide,
  potassiumTertButoxide,
  sulfuricAcid,
  hydrogenChloride,
  hydrogenBromide,
  hydrogenIodide,
  bromine,
  chlorine,
  hydrogenPalladium,
  boranePeroxide,
  hbrPeroxide,
  mercuricAcetate,
  sodiumBorohydride,
  mcpba,
  osmiumTetroxide,
  ozone,
  zinc,
  potassiumPermanganate,
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
