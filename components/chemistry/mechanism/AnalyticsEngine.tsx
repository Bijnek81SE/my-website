"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  PracticeSessionMode,
  PracticeSessionStats,
} from "./PracticeTypes";
import type {
  PracticeAnalyticsRecord,
  PracticeAnalyticsSummary,
} from "./AnalyticsTypes";

type AnalyticsEngineProps = {
  sessionId: string;
  mode: PracticeSessionMode;
  stats: PracticeSessionStats;
};

const STORAGE_KEY =
  "organic-chemistry-hub:practice-analytics:v1";

const MAX_RECORDS = 100;

function getMechanismIdentity(): {
  id: string;
  title: string;
} {
  if (typeof window === "undefined") {
    return {
      id: "mechanism",
      title: "Reaction mechanism",
    };
  }

  const pathname = window.location.pathname.toLowerCase();

  if (pathname.includes("sn2")) {
    return {
      id: "sn2",
      title: "SN2 substitution",
    };
  }

  if (pathname.includes("sn1")) {
    return {
      id: "sn1",
      title: "SN1 substitution",
    };
  }

  if (pathname.includes("e2")) {
    return {
      id: "e2",
      title: "E2 elimination",
    };
  }

  if (pathname.includes("e1")) {
    return {
      id: "e1",
      title: "E1 elimination",
    };
  }

  if (pathname.includes("electrophilic-addition")) {
    return {
      id: "electrophilic-addition",
      title: "Electrophilic addition to alkenes",
    };
  }

  if (pathname.includes("hydrohalogenation")) {
    return {
      id: "hydrohalogenation",
      title: "Hydrohalogenation of alkenes",
    };
  }

  if (pathname.includes("hydration")) {
    return {
      id: "hydration",
      title: "Acid-catalysed hydration of alkenes",
    };
  }

  if (pathname.includes("halogenation")) {
    return {
      id: "halogenation",
      title: "Halogenation of alkenes",
    };
  }

  if (pathname.includes("hydrogenation")) {
    return {
      id: "hydrogenation",
      title: "Catalytic hydrogenation of alkenes",
    };
  }

  return {
    id:
      pathname
        .split("/")
        .filter(Boolean)
        .at(-1) ?? "mechanism",
    title: "Reaction mechanism",
  };
}

function readRecords(): PracticeAnalyticsRecord[] {
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

function writeRecords(
  records: PracticeAnalyticsRecord[],
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(records.slice(0, MAX_RECORDS)),
    );
  } catch {
    // Analytics must never interrupt the learning session.
  }
}

function createSummary(
  records: PracticeAnalyticsRecord[],
): PracticeAnalyticsSummary {
  if (records.length === 0) {
    return {
      totalSessions: 0,
      practiceSessions: 0,
      examSessions: 0,
      averageScore: 0,
      averageAccuracy: 0,
      bestScore: 0,
      totalCorrectAnswers: 0,
      totalIncorrectAnswers: 0,
      masteredSessions: 0,
    };
  }

  const totalScore = records.reduce(
    (sum, record) => sum + record.score,
    0,
  );

  const totalAccuracy = records.reduce(
    (sum, record) => sum + record.accuracy,
    0,
  );

  return {
    totalSessions: records.length,
    practiceSessions: records.filter(
      (record) => record.mode === "practice",
    ).length,
    examSessions: records.filter(
      (record) => record.mode === "exam",
    ).length,
    averageScore: Math.round(
      totalScore / records.length,
    ),
    averageAccuracy: Math.round(
      totalAccuracy / records.length,
    ),
    bestScore: Math.max(
      ...records.map((record) => record.score),
    ),
    totalCorrectAnswers: records.reduce(
      (sum, record) =>
        sum + record.correctAnswers,
      0,
    ),
    totalIncorrectAnswers: records.reduce(
      (sum, record) =>
        sum + record.incorrectAnswers,
      0,
    ),
    masteredSessions: records.filter(
      (record) => record.score >= 90,
    ).length,
  };
}

function formatCompletedAt(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function AnalyticsEngine({
  sessionId,
  mode,
  stats,
}: AnalyticsEngineProps) {
  const [records, setRecords] = useState<
    PracticeAnalyticsRecord[]
  >([]);

  const recordedSessionId = useRef<string | null>(null);

  useEffect(() => {
    const identity = getMechanismIdentity();
    const storedRecords = readRecords();

    const mechanismRecords = storedRecords.filter(
      (record) =>
        record.mechanismId === identity.id,
    );

    if (
      stats.completed &&
      recordedSessionId.current !== sessionId
    ) {
      recordedSessionId.current = sessionId;

      const nextRecord: PracticeAnalyticsRecord = {
        id: sessionId,
        mechanismId: identity.id,
        mechanismTitle: identity.title,
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

      const nextStoredRecords = [
        nextRecord,
        ...storedRecords.filter(
          (record) => record.id !== sessionId,
        ),
      ].slice(0, MAX_RECORDS);

      writeRecords(nextStoredRecords);

      setRecords([
        nextRecord,
        ...mechanismRecords.filter(
          (record) => record.id !== sessionId,
        ),
      ]);

      return;
    }

    setRecords(mechanismRecords);
  }, [
    mode,
    sessionId,
    stats.accuracy,
    stats.completed,
    stats.correctAnswers,
    stats.hintsUsed,
    stats.incorrectAnswers,
    stats.revealedAnswers,
    stats.score,
    stats.stars,
    stats.totalQuestions,
  ]);

  const summary = useMemo(
    () => createSummary(records),
    [records],
  );

  const recentSessions = records.slice(0, 5);

  if (!stats.completed || records.length === 0) {
    return null;
  }

  return (
    <section
      className="rounded-3xl border border-cyan-200 bg-cyan-50 p-5 sm:p-6"
      aria-labelledby="analytics-engine-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-700">
            Analytics Engine
          </p>

          <h3
            id="analytics-engine-title"
            className="mt-1 text-2xl font-bold text-slate-950"
          >
            Mechanism performance
          </h3>

          <p className="mt-2 max-w-2xl text-slate-600">
            Your completed sessions are stored on this
            device so you can track improvement over time.
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-right">
          <p className="text-2xl font-bold text-slate-950">
            {summary.averageScore}
          </p>

          <p className="text-sm text-slate-500">
            average score
          </p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-xl border border-cyan-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Sessions
          </dt>

          <dd className="mt-1 text-xl font-bold text-slate-950">
            {summary.totalSessions}
          </dd>
        </div>

        <div className="rounded-xl border border-cyan-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Best score
          </dt>

          <dd className="mt-1 text-xl font-bold text-emerald-700">
            {summary.bestScore}
          </dd>
        </div>

        <div className="rounded-xl border border-cyan-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Accuracy
          </dt>

          <dd className="mt-1 text-xl font-bold text-slate-950">
            {summary.averageAccuracy}%
          </dd>
        </div>

        <div className="rounded-xl border border-cyan-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Correct
          </dt>

          <dd className="mt-1 text-xl font-bold text-emerald-700">
            {summary.totalCorrectAnswers}
          </dd>
        </div>

        <div className="rounded-xl border border-cyan-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Exams
          </dt>

          <dd className="mt-1 text-xl font-bold text-violet-700">
            {summary.examSessions}
          </dd>
        </div>

        <div className="rounded-xl border border-cyan-200 bg-white p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Mastered
          </dt>

          <dd className="mt-1 text-xl font-bold text-amber-700">
            {summary.masteredSessions}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
          Recent sessions
        </h4>

        <div className="mt-3 overflow-hidden rounded-2xl border border-cyan-200 bg-white">
          {recentSessions.map((record, index) => (
            <div
              key={record.id}
              className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 ${
                index > 0
                  ? "border-t border-slate-200"
                  : ""
              }`}
            >
              <div>
                <p className="font-semibold capitalize text-slate-900">
                  {record.mode} session
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatCompletedAt(record.completedAt)}
                </p>
              </div>

              <div className="flex items-center gap-5 text-right">
                <div>
                  <p className="font-bold text-slate-950">
                    {record.accuracy}%
                  </p>

                  <p className="text-xs text-slate-500">
                    accuracy
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-950">
                    {record.score}
                  </p>

                  <p className="text-xs text-slate-500">
                    score
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}