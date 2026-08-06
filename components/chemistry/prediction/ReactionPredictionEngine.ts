import type {
  PredictionChallenge,
  SynthesisTarget,
  TransformationRule,
} from "@/content/synthesis";

export type PredictionSubmission = {
  reagentId: string;
  productId: string;
  reasoningId: string;
};

export type PredictionEvaluation = {
  score: number;
  total: 3;
  reagentCorrect: boolean;
  productCorrect: boolean;
  reasoningCorrect: boolean;
  complete: boolean;
};

export function evaluatePrediction(
  challenge: PredictionChallenge,
  submission: PredictionSubmission,
): PredictionEvaluation {
  const reagentCorrect = submission.reagentId === challenge.correctReagentId;
  const productCorrect = submission.productId === challenge.correctProductId;
  const reasoningCorrect = submission.reasoningId === challenge.correctReasoningId;
  const score = [reagentCorrect, productCorrect, reasoningCorrect].filter(Boolean).length;

  return {
    score,
    total: 3,
    reagentCorrect,
    productCorrect,
    reasoningCorrect,
    complete: score === 3,
  };
}

export function getAvailableTransformations(
  structureId: string,
  rules: readonly TransformationRule[],
): readonly TransformationRule[] {
  return rules.filter((rule) => rule.fromStructureId === structureId);
}

export type SynthesisPlanEvaluation = {
  reachedTarget: boolean;
  withinStepLimit: boolean;
  efficient: boolean;
  currentStructureId: string;
  stepCount: number;
};

export function evaluateSynthesisPlan(
  target: SynthesisTarget,
  appliedRules: readonly TransformationRule[],
): SynthesisPlanEvaluation {
  const currentStructureId = appliedRules.at(-1)?.toStructureId ?? target.startStructureId;
  const reachedTarget = currentStructureId === target.targetStructureId;
  const withinStepLimit = appliedRules.length <= target.maxSteps;
  const efficient =
    reachedTarget &&
    appliedRules.map((rule) => rule.id).join("|") === target.recommendedStepIds.join("|");

  return {
    reachedTarget,
    withinStepLimit,
    efficient,
    currentStructureId,
    stepCount: appliedRules.length,
  };
}
