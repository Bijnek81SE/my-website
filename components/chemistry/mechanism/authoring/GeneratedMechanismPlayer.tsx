"use client";

import type { ReactNode } from "react";
import type {
  CompiledMechanismDefinition,
  MechanismFamilyStep,
} from "@/content/mechanisms/authoring";
import MechanismPlayerEngine from "../MechanismPlayerEngine";
import Sn2ReactionCanvas, { type Sn2PracticeTarget } from "../Sn2ReactionCanvas";
import E2ReactionCanvas, { type E2MechanismStep, type E2PracticeTarget } from "../E2ReactionCanvas";
import { e2Questions, sn2Questions } from "../MechanismQuestions";
import { e2ReactionData, sn2ReactionData } from "../MechanismReactionData";
import type { MechanismStep } from "../types";
import type { PracticeQuestion } from "../PracticeTypes";
import type { ReactionDataDefinition } from "../ReactionDataEngine";

export type GeneratedMechanismTarget = string;

type CanvasState = {
  step: MechanismFamilyStep;
  index: number;
  mode: "learn" | "practice" | "exam";
  animated: boolean;
  answered: boolean;
  interactive: boolean;
  onTargetClick?: (target: GeneratedMechanismTarget) => void;
};

type FamilyAdapter = {
  questions: readonly PracticeQuestion<GeneratedMechanismTarget>[];
  reactionData: ReactionDataDefinition<GeneratedMechanismTarget>;
  getSceneForStep: (step: MechanismFamilyStep) => string;
  getRevealMessage: (step: MechanismFamilyStep, index: number, total: number) => string;
  renderCanvas: (state: CanvasState, allSteps: readonly MechanismFamilyStep[]) => ReactNode;
};

function asGeneratedQuestions<TTarget extends string>(
  questions: readonly PracticeQuestion<TTarget>[],
): readonly PracticeQuestion<GeneratedMechanismTarget>[] {
  return questions as readonly PracticeQuestion<GeneratedMechanismTarget>[];
}

function asGeneratedReactionData<TTarget extends string>(
  reactionData: ReactionDataDefinition<TTarget>,
): ReactionDataDefinition<GeneratedMechanismTarget> {
  return reactionData as ReactionDataDefinition<GeneratedMechanismTarget>;
}

const familyAdapters: Readonly<Record<CompiledMechanismDefinition["family"], FamilyAdapter>> = {
  sn2: {
    questions: asGeneratedQuestions<Sn2PracticeTarget>(sn2Questions),
    reactionData: asGeneratedReactionData(sn2ReactionData),
    getSceneForStep: (step) => (step.scene === "product" ? "products" : "reactants"),
    getRevealMessage: (_step, index, total) =>
      index === total - 1
        ? "You have identified the correct product."
        : "The correct electron movement is now shown on the reaction diagram.",
    renderCanvas: ({ step, index, mode, animated, answered, interactive, onTargetClick }, allSteps) => {
      const showAnswer = mode === "practice" && answered;
      const authoredStep: MechanismStep = {
        id: step.id,
        title: step.title,
        description: step.description,
        note: step.note,
        highlight: step.scene as MechanismStep["highlight"],
        arrows:
          mode === "learn"
            ? [...step.arrows]
            : showAnswer
              ? index === 0
                ? [...allSteps[1].arrows]
                : [...step.arrows]
              : [],
      };

      return (
        <Sn2ReactionCanvas
          step={authoredStep}
          animated={animated}
          interactive={interactive}
          onTargetClick={onTargetClick as ((target: Sn2PracticeTarget) => void) | undefined}
        />
      );
    },
  },
  e2: {
    questions: asGeneratedQuestions<E2PracticeTarget>(e2Questions),
    reactionData: asGeneratedReactionData(e2ReactionData),
    getSceneForStep: (step) => (step.scene === "products" ? "products" : "reactants"),
    getRevealMessage: (step, index, total) =>
      step.arrows.length > 0
        ? "The three concerted electron movements are now shown on the reaction diagram."
        : index === total - 1
          ? "You have identified the alkene product."
          : "You have identified the correctly aligned β-hydrogen.",
    renderCanvas: ({ step, index, mode, animated, answered, interactive, onTargetClick }, allSteps) => {
      const showAnswer = mode === "practice" && answered;
      const authoredStep: E2MechanismStep = {
        id: step.id,
        title: step.title,
        description: step.description,
        note: step.note,
        highlight: step.scene as E2MechanismStep["highlight"],
        arrows:
          mode === "learn"
            ? [...step.arrows]
            : showAnswer
              ? index === 0
                ? [...allSteps[1].arrows]
                : [...step.arrows]
              : [],
      };

      return (
        <E2ReactionCanvas
          step={authoredStep}
          animated={animated}
          interactive={interactive}
          onTargetClick={onTargetClick as ((target: E2PracticeTarget) => void) | undefined}
        />
      );
    },
  },
};

export default function GeneratedMechanismPlayer({
  definition,
}: {
  definition: CompiledMechanismDefinition;
}) {
  const adapter = familyAdapters[definition.family];
  const steps = [...definition.steps];

  return (
    <MechanismPlayerEngine<MechanismFamilyStep, GeneratedMechanismTarget>
      title={definition.title}
      description={definition.description}
      accent={definition.accent}
      steps={steps}
      questions={[...adapter.questions]}
      playbackInterval={definition.playbackInterval}
      validation={{
        id: definition.family,
        reactionData: adapter.reactionData,
        getSceneForStep: adapter.getSceneForStep,
      }}
      getRevealMessage={(step, index) =>
        adapter.getRevealMessage(step, index, steps.length)
      }
      renderCanvas={(state) => adapter.renderCanvas(state, steps)}
    />
  );
}
