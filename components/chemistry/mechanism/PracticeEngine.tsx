"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AchievementPanel from "./AchievementPanel";
import type { PracticeAchievement } from "./AchievementTypes";
import HintPanel from "./HintPanel";
import type { HintState, PracticeHint } from "./HintTypes";
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
  revealed: boolean;
  highlightedTarget?: TTarget;
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

const defaultHints: PracticeHint[] = [
  {
    afterAttempt: 1,
    message:
      "Think about where the electron pair starts and where it needs to move.",
  },
  {
    afterAttempt: 2,
    message:
      "Look for the electron-rich atom, reactive bond, or product named in the question.",
  },
  {
    afterAttempt: 3,
    message:
      "The correct target is now highlighted on the reaction diagram.",
  },
  {
    afterAttempt: 4,
    message:
      "The correct answer has been revealed. Review it before continuing.",
  },
];

function calculateStars(
  score: number,
  completed: boolean,
): number {
  if (!completed) {
    return 0;
  }

  if (score >= 90) {
    return 5;
  }

  if (score >= 80) {
    return 4;
  }

  if (score >= 65) {
    return 3;
  }

  if (score >= 45) {
    return 2;
  }

  return 1;
}

function createAchievements({
  correctAnswers,
  incorrectAnswers,
  hintsUsed,
  revealedAnswers,
  completed,
  score,
}: {
  correctAnswers: number;
  incorrectAnswers: number;
  hintsUsed: number;
  revealedAnswers: number;
  completed: boolean;
  score: number;
}): PracticeAchievement[] {
  return [
    {
      id: "first-correct",
      title: "First Correct",
      description: "Answer one mechanism question correctly.",
      icon: "✓",
      unlocked: correctAnswers >= 1,
    },
    {
      id: "perfect-run",
      title: "Perfect Run",
      description:
        "Complete the session without an incorrect answer.",
      icon: "🏆",
      unlocked:
        completed &&
        incorrectAnswers === 0 &&
        revealedAnswers === 0,
    },
    {
      id: "no-hints",
      title: "Independent",
      description:
        "Complete the session without using any hints.",
      icon: "🧠",
      unlocked:
        completed &&
        hintsUsed === 0 &&
        revealedAnswers === 0,
    },
    {
      id: "persistence",
      title: "Persistent",
      description:
        "Keep working after making three incorrect attempts.",
      icon: "💪",
      unlocked: incorrectAnswers >= 3,
    },
    {
      id: "mastery",
      title: "Mechanism Mastery",
      description:
        "Complete the session with a score of at least 90.",
      icon: "⭐",
      unlocked: completed && score >= 90,
    },
  ];
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

  const [revealedQuestionIds, setRevealedQuestionIds] =
    useState<string[]>([]);

  const [attemptsByQuestion, setAttemptsByQuestion] =
    useState<Record<string, number>>({});

  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] =
    useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const question = questions[currentIndex];

  const answered = completedQuestionIds.includes(question.id);
  const revealed = revealedQuestionIds.includes(question.id);

  const attemptsForQuestion =
    attemptsByQuestion[question.id] ?? 0;

  const hints =
    question.hints && question.hints.length > 0
      ? question.hints
      : defaultHints;

  const activeHint = useMemo(() => {
    return [...hints]
      .sort((a, b) => b.afterAttempt - a.afterAttempt)
      .find(
        (hint) =>
          attemptsForQuestion >= hint.afterAttempt,
      );
  }, [attemptsForQuestion, hints]);

  const hintState: HintState = {
    attemptsForQuestion,
    activeHint,
    shouldHighlightTarget:
      attemptsForQuestion >= 3 && !answered,
    shouldRevealAnswer: revealed,
  };

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

    const rawScore =
      completionRatio * accuracy -
      hintsUsed * 3 -
      revealedQuestionIds.length * 10;

    const score = Math.max(
      0,
      Math.min(100, Math.round(rawScore)),
    );

    const completed =
      totalQuestions > 0 &&
      completedQuestions === totalQuestions;

    const achievements = createAchievements({
      correctAnswers,
      incorrectAnswers,
      hintsUsed,
      revealedAnswers: revealedQuestionIds.length,
      completed,
      score,
    });

    return {
      totalQuestions,
      completedQuestions,
      attempts,
      correctAnswers,
      incorrectAnswers,
      hintsUsed,
      revealedAnswers: revealedQuestionIds.length,
      accuracy,
      score,
      stars: calculateStars(score, completed),
      completed,
      achievements,
    };
  }, [
    attempts,
    completedQuestionIds.length,
    correctAnswers,
    hintsUsed,
    incorrectAnswers,
    questions.length,
    revealedQuestionIds.length,
  ]);

  useEffect(() => {
    setFeedback(answered ? "correct" : "idle");
  }, [answered, currentIndex]);

  useEffect(() => {
    onAnsweredChange(answered);
  }, [answered, onAnsweredChange]);

  function completeQuestion() {
    setCompletedQuestionIds((current) =>
      current.includes(question.id)
        ? current
        : [...current, question.id],
    );
  }

  function revealQuestion() {
    setFeedback("revealed");

    setRevealedQuestionIds((current) =>
      current.includes(question.id)
        ? current
        : [...current, question.id],
    );

    completeQuestion();
  }

  function handleTargetClick(target: TTarget) {
    if (answered) {
      return;
    }

    const nextQuestionAttempts = attemptsForQuestion + 1;

    setAttempts((current) => current + 1);

    setAttemptsByQuestion((current) => ({
      ...current,
      [question.id]: nextQuestionAttempts,
    }));

    if (target === question.correctTarget) {
      setFeedback("correct");
      setCorrectAnswers((current) => current + 1);
      completeQuestion();
      return;
    }

    setFeedback("incorrect");
    setIncorrectAnswers((current) => current + 1);

    const previousHintCount = hints.filter(
      (hint) =>
        attemptsForQuestion >= hint.afterAttempt,
    ).length;

    const nextHintCount = hints.filter(
      (hint) =>
        nextQuestionAttempts >= hint.afterAttempt,
    ).length;

    if (nextHintCount > previousHintCount) {
      setHintsUsed(
        (current) =>
          current + (nextHintCount - previousHintCount),
      );
    }

    if (nextQuestionAttempts >= 4) {
      revealQuestion();
    }
  }

  return (
    <div className="space-y-5">
      <PracticeProgress stats={stats} />

      {renderCanvas({
        answered,
        revealed,
        highlightedTarget:
          hintState.shouldHighlightTarget
            ? question.correctTarget
            : undefined,
        onTargetClick: handleTargetClick,
      })}

      <HintPanel
        hintState={hintState}
        answered={answered && !revealed}
      />

      <PracticePanel
        question={question}
        feedback={feedback}
        answered={answered}
        stepDescription={stepDescription}
        revealMessage={revealMessage}
      />

      <PracticeScore stats={stats} />

      <AchievementPanel
        achievements={stats.achievements}
      />
    </div>
  );
}