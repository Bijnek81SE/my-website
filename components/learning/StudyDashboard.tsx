"use client";

import Link from "next/link";
import { getKnowledgeNode } from "@/content/knowledge-graph";
import { lessons } from "@/content/lesson-registry";
import {
  getDueReviewRecords,
  getProgressSummary,
  type LearningProgressRecord,
} from "./ProgressEngine";
import { useLearningProgress } from "./LearningEngine";

function recordHref(record: LearningProgressRecord): string {
  return getKnowledgeNode(record.nodeId)?.href ?? "/learn";
}

function formatDate(value?: string): string | null {
  if (!value) return null;

  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

export default function StudyDashboard() {
  const { progress, clear } = useLearningProgress();
  const summary = getProgressSummary(progress);
  const records = Object.values(progress.records).sort((left, right) =>
    right.lastStudiedAt.localeCompare(left.lastStudiedAt),
  );
  const dueReviews = getDueReviewRecords(progress);
  const nextLesson = lessons.find(
    (lesson) =>
      progress.records[`lesson:${lesson.slug}`]?.status !== "completed",
  );
  const completedLessons = lessons.filter(
    (lesson) =>
      progress.records[`lesson:${lesson.slug}`]?.status === "completed",
  ).length;
  const lessonProgress = Math.round(
    (completedLessons / Math.max(lessons.length, 1)) * 100,
  );
  const estimatedMinutesRemaining = lessons
    .filter(
      (lesson) =>
        progress.records[`lesson:${lesson.slug}`]?.status !== "completed",
    )
    .reduce((total, lesson) => {
      const minutes = Number.parseInt(lesson.readingTime, 10);
      return total + (Number.isFinite(minutes) ? minutes : 0);
    }, 0);

  return (
    <div className="space-y-8">
      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Study summary"
      >
        <MetricCard
          label="Current streak"
          value={`${progress.streak.current} days`}
          detail={`Longest: ${progress.streak.longest} days`}
        />
        <MetricCard
          label="Completed"
          value={String(summary.completed)}
          detail={`${summary.inProgress} in progress`}
        />
        <MetricCard
          label="Reviews due"
          value={String(dueReviews.length)}
          detail="Based on your study schedule"
        />
        <MetricCard
          label="Study time left"
          value={`${estimatedMinutesRemaining} min`}
          detail="Fundamentals estimate"
        />
      </section>

      <section
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        aria-labelledby="fundamentals-progress-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
              Fundamentals
            </p>
            <h2
              id="fundamentals-progress-heading"
              className="mt-2 text-2xl font-bold text-slate-950"
            >
              Your course progress
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {completedLessons} of {lessons.length} lessons completed on this
              browser.
            </p>
          </div>
          <span className="text-3xl font-bold text-emerald-700">
            {lessonProgress}%
          </span>
        </div>

        <div
          className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"
          aria-label={`${lessonProgress}% of Fundamentals completed`}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={lessonProgress}
        >
          <div
            className="h-full rounded-full bg-emerald-600 transition-[width]"
            style={{ width: `${lessonProgress}%` }}
          />
        </div>

        {nextLesson ? (
          <Link
            href={nextLesson.href}
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 transition hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
                Continue learning
              </p>
              <p className="mt-1 text-lg font-bold text-slate-950">
                {nextLesson.title}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {nextLesson.readingTime} · {nextLesson.description}
              </p>
            </div>
            <span className="font-semibold text-emerald-800">
              Open lesson →
            </span>
          </Link>
        ) : (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-bold text-emerald-900">
              Fundamentals complete
            </p>
            <p className="mt-1 text-sm text-emerald-800">
              Use the review queue below to keep concepts fresh.
            </p>
          </div>
        )}
      </section>

      <div className="grid gap-8 xl:grid-cols-[1fr_0.85fr]">
        <section
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="review-queue-heading"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
                Spaced repetition
              </p>
              <h2
                id="review-queue-heading"
                className="mt-2 text-2xl font-bold text-slate-950"
              >
                Review queue
              </h2>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800">
              {dueReviews.length} due
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {dueReviews.length > 0 ? (
              dueReviews.map((record) => (
                <Link
                  key={record.nodeId}
                  href={recordHref(record)}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 transition hover:border-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                >
                  <div>
                    <p className="font-bold text-slate-950">{record.title}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {record.kind === "lesson"
                        ? "Lesson review"
                        : "Mechanism practice"} · {record.attempts} sessions
                    </p>
                  </div>
                  <span className="font-semibold text-amber-800">
                    Review →
                  </span>
                </Link>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="font-semibold text-slate-900">
                  Nothing due right now
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Complete a lesson or schedule a review to build your queue.
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="recent-activity-heading"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-700">
              Activity
            </p>
            <h2
              id="recent-activity-heading"
              className="mt-2 text-2xl font-bold text-slate-950"
            >
              Recent study
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {records.length > 0 ? (
              records.slice(0, 6).map((record) => {
                const lastStudied = formatDate(record.lastStudiedAt);

                return (
                  <Link
                    key={record.nodeId}
                    href={recordHref(record)}
                    className="block rounded-2xl border border-slate-200 p-4 transition hover:border-violet-300 hover:bg-violet-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-slate-950">
                          {record.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {record.status === "completed"
                            ? "Completed"
                            : "In progress"} · {record.attempts} sessions
                        </p>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-violet-700">
                        {record.kind}
                      </span>
                    </div>
                    {lastStudied ? (
                      <p className="mt-2 text-xs text-slate-500">
                        Last studied {lastStudied}
                      </p>
                    ) : null}
                  </Link>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="font-semibold text-slate-900">
                  No study activity yet
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Open a lesson and mark it complete to start tracking
                  progress.
                </p>
              </div>
            )}
          </div>

          {records.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Clear all locally saved study progress?")) {
                  clear();
                }
              }}
              className="mt-6 text-sm font-semibold text-rose-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
            >
              Clear local progress
            </button>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </div>
  );
}
