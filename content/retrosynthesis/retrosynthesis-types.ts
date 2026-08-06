import type { PredictionDifficulty, StructureSummary } from "@/content/synthesis";

export type RetrosynthesisRisk = "low" | "medium" | "high";

export type RetrosynthesisRule = {
  id: string;
  title: string;
  productId: string;
  precursorIds: readonly string[];
  forwardReagents: string;
  reactionId: string;
  mechanismHref: string;
  rationale: string;
  selectivity: string;
  reliability: number;
  difficulty: number;
  risk: RetrosynthesisRisk;
};

export type RetrosynthesisTarget = {
  id: string;
  title: string;
  difficulty: PredictionDifficulty;
  targetStructureId: string;
  availableStartingMaterialIds: readonly string[];
  maxDepth: number;
  recommendedRuleIds: readonly string[];
  learningGoal: string;
  hint: string;
};

export type RetrosynthesisNode = {
  id: string;
  structure: StructureSummary;
  depth: number;
  solved: boolean;
  deadEnd: boolean;
  children: readonly RetrosynthesisBranch[];
};

export type RetrosynthesisBranch = {
  rule: RetrosynthesisRule;
  precursors: readonly RetrosynthesisNode[];
  score: number;
  complete: boolean;
};

export type RetrosynthesisRouteStep = {
  rule: RetrosynthesisRule;
  product: StructureSummary;
  precursors: readonly StructureSummary[];
};

export type RetrosynthesisRoute = {
  steps: readonly RetrosynthesisRouteStep[];
  score: number;
  complete: boolean;
  unresolvedStructureIds: readonly string[];
};
