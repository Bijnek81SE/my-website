"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import PracticePanel from "./PracticePanel";
import type {
  PracticeFeedback,
  PracticeQuestion,
} from "./PracticeTypes";

type PracticeRenderState<TTarget extends string> = {
  answered: boolean;
  onTargetClick: (target: TTarget) => void;
};

type PracticeEngineProps<TTarget extends string> = {
  questions: PracticeQuestion<TTarget>[];
  currentIndex: number;
  stepDescription: string;
  revealMessage?: string;
  onAnsweredChange: (answered: boolean) => void;
  renderCanvas: (
    state: PracticeRenderState<TTarget>,
  ) => ReactNode;
};

export default function PracticeEngine<
  TTarget extends string,
>({
  questions,
  currentIndex,
  stepDescription,
  revealMessage,
  onAnsweredChange,
  renderCanvas,
}: PracticeEngineProps<TTarget>) {
  const [feedback, setFeedback] =
    useState<PracticeFeedback>("idle");
  const [completedQuestionIds, setCompletedQuestionIds] =
    useState<string[]>([]);

  const question = questions[currentIndex];

  const answered = useMemo(
    () => completedQuestionIds.includes(question.id),
    [completedQuestionIds, question.id],
  );

  useEffect(() => {
    setFeedback("idle");
  }, [currentIndex]);

  useEffect(() => {
    onAnsweredChange(answered);
  }, [answered, onAnsweredChange]);

  function handleTargetClick(target: TTarget) {
    if (answered) {
      return;
    }

    if (target !== question.correctTarget) {
      setFeedback("incorrect");
      return;
    }

    setFeedback("correct");

    setCompletedQuestionIds((current) =>
      current.includes(question.id)
        ? current
        : [...current, question.id],
    );
  }

  return (
    <>
      {renderCanvas({
        answered,
        onTargetClick: handleTargetClick,
      })}

      <PracticePanel
        question={question}
        feedback={feedback}
        answered={answered}
        stepDescription={stepDescription}
        revealMessage={revealMessage}
      />
    </>
  );
}