export type ReferenceKind = "functional-group" | "reagent";

export type FunctionalGroupCategory =
  | "Hydrocarbon"
  | "Oxygen"
  | "Nitrogen"
  | "Halogen"
  | "Carbonyl";

export type ReagentCategory =
  | "Nucleophile"
  | "Base"
  | "Acid"
  | "Electrophile"
  | "Reducing agent"
  | "Catalyst"
  | "Radical initiator";

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

export type ReagentDefinition = {
  kind: "reagent";
  slug: string;
  name: string;
  formula: string;
  category: ReagentCategory;
  summary: string;
  purpose: string;
  selectivity: string;
  conditions: readonly string[];
  limitations: readonly string[];
  safety: string;
  alternatives: readonly string[];
  relatedReactions: readonly ReferenceConnection[];
  keywords: readonly string[];
};

export type ChemistryReference = FunctionalGroupDefinition | ReagentDefinition;
