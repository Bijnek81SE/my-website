export type ReagentId = string;

export type ReagentCategory =
  | "Nucleophile"
  | "Base"
  | "Acid"
  | "Electrophile"
  | "Reducing agent"
  | "Oxidizing agent"
  | "Catalyst"
  | "Radical initiator";

export type ReagentCapabilities = {
  reference: boolean;
  workspace: boolean;
  reactionExplorer: boolean;
  prediction: boolean;
  retrosynthesis: boolean;
};

export type ReagentDefinition = {
  kind: "reagent";
  id: ReagentId;
  slug: string;
  name: string;
  aliases: readonly string[];
  formula: string;
  category: ReagentCategory;
  summary: string;
  purpose: string;
  selectivity: string;
  conditions: readonly string[];
  limitations: readonly string[];
  safety: string;
  alternativeNames: readonly string[];
  reactionIds: readonly string[];
  mechanismIds: readonly string[];
  moleculeIds: readonly string[];
  lessonIds: readonly string[];
  keywords: readonly string[];
  capabilities: ReagentCapabilities;
};

export function defineReagent<const T extends ReagentDefinition>(reagent: T): T {
  return reagent;
}
