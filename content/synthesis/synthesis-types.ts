export type PredictionDifficulty = "Foundation" | "Intermediate" | "Advanced";

export type StructureSummary = {
  id: string;
  name: string;
  formula: string;
  condensedFormula: string;
  functionalGroup: string;
  notes?: string;
};

export type ReagentChoice = {
  id: string;
  label: string;
  conditions: string;
  role: string;
};

export type ProductChoice = StructureSummary & {
  selectivityNote: string;
};

export type ReasoningChoice = {
  id: string;
  label: string;
};

export type PredictionChallenge = {
  id: string;
  title: string;
  difficulty: PredictionDifficulty;
  prompt: string;
  substrate: StructureSummary;
  reagentChoices: readonly ReagentChoice[];
  productChoices: readonly ProductChoice[];
  reasoningChoices: readonly ReasoningChoice[];
  correctReagentId: string;
  correctProductId: string;
  correctReasoningId: string;
  reactionId: string;
  mechanismHref: string;
  explanation: string;
  regioselectivity: string;
  stereochemistry: string;
  commonMistake: string;
};

export type TransformationRule = {
  id: string;
  title: string;
  fromStructureId: string;
  toStructureId: string;
  reagents: string;
  reactionId: string;
  rationale: string;
};

export type SynthesisTarget = {
  id: string;
  title: string;
  difficulty: PredictionDifficulty;
  startStructureId: string;
  targetStructureId: string;
  maxSteps: number;
  recommendedStepIds: readonly string[];
  hint: string;
};
