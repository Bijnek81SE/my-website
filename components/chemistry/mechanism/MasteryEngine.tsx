"use client";

import { useEffect, useMemo, useState } from "react";
import type { PracticeAnalyticsRecord } from "./AnalyticsTypes";
import type {
  PracticeSessionMode,
  PracticeSessionStats,
} from "./PracticeTypes";
import type {
  MasteryLevel,
  MasteryProgress,
} from "./MasteryTypes";

type MasteryEngineProps = {
  sessionId: string;
  mode: PracticeSessionMode;
  stats: PracticeSessionStats;
};

const STORAGE_KEY =
  "organic-chemistry-hub:practice-analytics:v1";

const masteryLevels: MasteryLevel[] = [
  {
    id: "foundation",
    title: "Foundation",
    description:
      "You are building the essential vocabulary and electron-flow skills for this mechanism.",
    minimumPoints: 0,
  },
  {
    id: "developing",
    title: "Developing",
    description:
      "You can identify several important species, bonds, and reaction steps.",
    minimumPoints: 25,
  },
  {
    id: "proficient",
    title: "Proficient",
    description:
      "You can complete the mechanism with increasingly consistent accuracy.",
    minimumPoints: 50,
  },
  {
    id: "advanced",
    title: "Advanced",
    description:
      "You demonstrate strong mechanism reasoning across practice and exam sessions.",
    minimumPoints: 75,
  },
  {
    id: "mastered",
    title: "Mastered",
    description:
      "You consistently demonstrate accurate, independent understanding of this mechanism.",
    minimumPoints: 90,
  },
];

function getMechanismId(): string {
  if (typeof window === "undefined") {
    return "mechanism";
  }

  const pathname = window.location.pathname.toLowerCase();

  if (pathname.includes("sn2")) {
    return "sn2";
  }

  if (pathname.includes("sn1")) {
    return "sn1";
  }

  if (pathname.includes("e2")) {
    return "e2";
  }

  const segments = pathname.split("/").filter(Boolean);

  return segments[segments.length - 1] ?? "mechanism";
}

function readAnalyticsRecords(): PracticeAnalyticsRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (
        record,
      ): record is PracticeAnalyticsRecord =>
        typeof record === "object" &&
        record !== null &&
        typeof record.id === "string" &&
        typeof record.mechanismId === "string" &&
        typeof record.mechanismTitle === "string" &&
        (record.mode === "practice" ||
          record.mode === "exam") &&
        typeof record.completedAt === "string" &&
        typeof record.totalQuestions === "number" &&
        typeof record.correctAnswers === "number" &&
        typeof record.incorrectAnswers === "number" &&
        typeof record.hintsUsed === "number" &&
        typeof record.revealedAnswers === "number" &&
        typeof record.accuracy === "number" &&
        typeof record.score === "number" &&
        typeof record.stars === "number",
    );
  } catch {
    return [];
  }
}

function calculateMasteryProgress(
  records: PracticeAnalyticsRecord[],
  stats: PracticeSessionStats,
): MasteryProgress {
  const completedSessions = records.length;

  const examRecords = records.filter(
    (record) => record.mode === "exam",
  );

  const completedExams = examRecords.length;

  const bestExamScore =
    examRecords.length === 0
      ? 0
      : Math.max(
          ...examRecords.map((record) => record.score),
        );

  const averageAccuracy =
    records.length === 0
      ? 0
      : Math.round(
          records.reduce(
            (sum, record) => sum + record.accuracy,
            0,
          ) / records.length,
        );

  const unlockedAchievements =
    stats.achievements.filter(
      (achievement) => achievement.unlocked,
    ).length;

  const sessionPoints = Math.min(
    20,
    completedSessions * 4,
  );

  const examPoints = Math.round(bestExamScore * 0.4);

  const accuracyPoints = Math.round(
    averageAccuracy * 0.25,
  );

  const achievementPoints = Math.min(
    15,
    unlockedAchievements * 3,
  );

  const points = Math.min(
    100,
    sessionPoints +
      examPoints +
      accuracyPoints +
      achievementPoints,
  );

  const level =
    [...masteryLevels]
      .reverse()
      .find(
        (candidate) =>
          points >= candidate.minimumPoints,
      ) ?? masteryLevels[0];

  const levelIndex = masteryLevels.findIndex(
    (candidate) => candidate.id === level.id,
  );

  const nextLevel = masteryLevels[levelIndex + 1];

  return {
    points,
    level,
    nextLevel,
    pointsToNextLevel: nextLevel
      ? Math.max(0, nextLevel.minimumPoints - points)
      : 0,
    completedSessions,
    completedExams,
    bestExamScore,
    averageAccuracy,
    unlockedAchievements,
  };
}

function createCurrentRecord(
  sessionId: string,
  mechanismId: string,
  mode: PracticeSessionMode,
  stats: PracticeSessionStats,
): PracticeAnalyticsRecord {
  return {
    id: sessionId,
    mechanismId,
    mechanismTitle: "Reaction mechanism",
    mode,
    completedAt: new Date().toISOString(),
    totalQuestions: stats.totalQuestions,
    correctAnswers: stats.correctAnswers,
    incorrectAnswers: stats.incorrectAnswers,
    hintsUsed: stats.hintsUsed,
    revealedAnswers: stats.revealedAnswers,
    accuracy: stats.accuracy,
    score: stats.score,
    stars: stats.stars,
  };
}

export default function MasteryEngine({
  sessionId,
  mode,
  stats,
}: MasteryEngineProps) {
  const [records, setRecords] = useState<
    PracticeAnalyticsRecord[]
  >([]);

  useEffect(() => {
    if (!stats.completed) {
      return;
    }

    const mechanismId = getMechanismId();

    const mechanismRecords = readAnalyticsRecords().filter(
      (record) => record.mechanismId === mechanismId,
    );

    const hasCurrentSession = mechanismRecords.some(
      (record) => record.id === sessionId,
    );

    setRecords(
      hasCurrentSession
        ? mechanismRecords
        : [
            createCurrentRecord(
              sessionId,
              mechanismId,
              mode,
              stats,
            ),
            ...mechanismRecords,
          ],
    );
  }, [
    mode,
    sessionId,
    stats,
  ]);

  const mastery = useMemo(
    () => calculateMasteryProgress(records, stats),
    [records, stats],
  );

  if (!stats.completed) {
    return null;
  }

  const currentThreshold =
    mastery.level.minimumPoints;

  const nextThreshold =
    mastery.nextLevel?.minimumPoints ?? 100;

  const levelRange = Math.max(
    1,
    nextThreshold - currentThreshold,
  );

  const levelProgress = mastery.nextLevel
    ? Math.min(
        100,
        Math.round(
          ((mastery.points - currentThreshold) /
            levelRange) *
            100,
        ),
      )
    : 100;

  return (
    <section
      className="rounded-3xl border border-indigo-200 bg-indigo-50 p-5 sm:p-6"
      aria-labelledby="mastery-engine-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-indigo-700">
            Mastery Engine
          </p>

          <h3
            id="mastery-engine-title"
            className="mt-1 text-2xl font-bold text-slate-950"
          >
            {mastery.level.title}
          </h3>

          <p className="mt-2 max-w-2xl leading-7 text-slate-600">
            {mastery.level.description}
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-200 bg-white px-5 py-3 text-right">
          <p className="text-3xl font-bold text-indigo-700">
            {mastery.points}
          </p>

          <p className="text-sm text-slate-500">
            mastery points
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-slate-800">
            {mastery.level.title}
          </span>

          <span className="font-semibold text-slate-600">
            {mastery.nextLevel
              ? `${mastery.pointsToNextLevel} points to ${mastery.nextLevel.title}`
              : "Highest mastery level reached"}
          </span>
        </div>

        <div
          className="mt-3 h-3 overflow-hidden rounded-full bg-indigo-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={levelProgress}
          aria-label={`${levelProgress}% progress through the current mastery level`}
        >
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-xl border border-indigo-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Sessions
          </dt>

          <dd className="mt-1 text-xl font-bold text-slate-950">
            {mastery.completedSessions}
          </dd>
        </div>

        <div className="rounded-xl border border-indigo-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Exams
          </dt>

          <dd className="mt-1 text-xl font-bold text-violet-700">
            {mastery.completedExams}
          </dd>
        </div>

        <div className="rounded-xl border border-indigo-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Best exam
          </dt>

          <dd className="mt-1 text-xl font-bold text-emerald-700">
            {mastery.bestExamScore}
          </dd>
        </div>

        <div className="rounded-xl border border-indigo-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Accuracy
          </dt>

          <dd className="mt-1 text-xl font-bold text-slate-950">
            {mastery.averageAccuracy}%
          </dd>
        </div>

        <div className="rounded-xl border border-indigo-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Achievements
          </dt>

          <dd className="mt-1 text-xl font-bold text-amber-700">
            {mastery.unlockedAchievements}/
            {stats.achievements.length}
          </dd>
        </div>
      </dl>

      <div className="mt-6 rounded-2xl border border-indigo-200 bg-white p-4">
        <p className="text-sm font-bold text-slate-900">
          Next mastery goal
        </p>

        <p className="mt-2 leading-6 text-slate-600">
          {mastery.nextLevel
            ? mastery.completedExams === 0
              ? "Complete an exam session to add exam performance to your mastery score."
              : mastery.bestExamScore < 90
                ? "Improve your best exam score and maintain strong accuracy."
                : mastery.averageAccuracy < 90
                  ? "Increase your average accuracy across additional sessions."
                  : `Complete more sessions to reach ${mastery.nextLevel.title}.`
            : "You have reached the highest mastery level for this mechanism."}
        </p>
      </div>
    </section>
  );
}