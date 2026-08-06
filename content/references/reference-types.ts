import type { ReagentCategory, ReagentDefinition } from "@/content/reagents/reagent-types";

export type ReferenceKind = "functional-group" | "reagent";

export type FunctionalGroupCategory =
  | "Hydrocarbon"
  | "Oxygen"
  | "Nitrogen"
  | "Halogen"
  | "Carbonyl";

export type ReferenceConnection = {
  label: string;
  href: string;
};

export type FunctionalGroupDefinition = {
  kind: "functional-group";
  slug: string;
  name: string;
  formula: string;
  category: FunctionalGroupCategory;
  summary: string;
  recognition: string;
  bonding: string;
  polarity: string;
  acidityBasicity: string;
  commonReactions: readonly string[];
  relatedReactions: readonly ReferenceConnection[];
  relatedLabs: readonly ReferenceConnection[];
  keywords: readonly string[];
};

export type { ReagentCategory, ReagentDefinition };
export type ChemistryReference = FunctionalGroupDefinition | ReagentDefinition;
