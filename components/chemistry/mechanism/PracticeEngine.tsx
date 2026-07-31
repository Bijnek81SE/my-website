"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import PracticePanel from "./PracticePanel";
import PracticeProgress from "./PracticeProgress";
import PracticeScore from "./PracticeScore";
import type {
  PracticeFeedback,
  PracticeQuestion,
  PracticeSessionStats,
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

function calculateStars(
  accuracy: number,
  completed: boolean,
): number {
  if (!completed) {
    return 0;
  }

  if (accuracy >= 95) {
    return 5;
  }

  if (accuracy >= 85) {
    return 4;
  }

  if (accuracy >= 70) {
    return 3;
  }

  if (accuracy >= 50) {
    return 2;
  }

  return 1;
}

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

  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] =
    useState(0);

  const question = questions[currentIndex];

  const answered = useMemo(
    () => completedQuestionIds.includes(question.id),
    [completedQuestionIds, question.id],
  );

  const stats = useMemo<PracticeSessionStats>(() => {
    const totalQuestions = questions.length;
    const completedQuestions = completedQuestionIds.length;

    const accuracy =
      attempts === 0
        ? 100
        : Math.round((correctAnswers / attempts) * 100);

    const completionRatio =
      totalQuestions === 0
        ? 0
        : completedQuestions / totalQuestions;

    const score = Math.round(
      completionRatio * accuracy,
    );

    const completed =
      totalQuestions > 0 &&
      completedQuestions === totalQuestions;

    return {
      totalQuestions,
      completedQuestions,
      attempts,
      correctAnswers,
      incorrectAnswers,
      accuracy,
      score,
      stars: calculateStars(accuracy, completed),
      completed,
    };
  }, [
    attempts,
    completedQuestionIds.length,
    correctAnswers,
    incorrectAnswers,
    questions.length,
  ]);

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

    setAttempts((current) => current + 1);

    if (target !== question.correctTarget) {
      setFeedback("incorrect");
      setIncorrectAnswers((current) => current + 1);
      return;
    }

    setFeedback("correct");
    setCorrectAnswers((current) => current + 1);

    setCompletedQuestionIds((current) =>
      current.includes(question.id)
        ? current
        : [...current, question.id],
    );
  }

  return (
    <div className="space-y-5">
      <PracticeProgress stats={stats} />

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

      <PracticeScore stats={stats} />
    </div>
  );
}