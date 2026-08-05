"use client";

import React from "react";
import { useLearningProgress } from "./LearningEngine";
import type { LearningItemKind } from "./ProgressEngine";

export type StudySessionProps = {
  nodeId: string;
  kind: LearningItemKind;
  title: string;
};

export default function StudySession({ nodeId, kind, title }: StudySessionProps) {
  const { progress, markActivity, review } = useLearningProgress();
  const record = progress.records[nodeId];
  const complete = record?.status === "completed";
const nextReview =
  record?.nextReviewAt != null
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
      }).format(new Date(record.nextReviewAt))
    : null;

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5" aria-label="Study progress">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">
            Adaptive learning
          </p>
          <h2 className="mt-1 text-lg font-bold text-slate-950">
            {complete ? "Completed" : record ? "In progress" : "Start this activity"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {nextReview
              ? `Next review: ${nextReview}.`
              : "Progress is saved in this browser and used for study recommendations."}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            markActivity({ nodeId, kind, title, completed: kind === "lesson" })
          }
          className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          {kind === "lesson"
            ? complete
              ? "Review again"
              : "Mark lesson complete"
            : "Record practice"}
        </button>
      </div>

      {record ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span>{record.attempts} study {record.attempts === 1 ? "session" : "sessions"}</span>
          <span aria-hidden="true">•</span>
          <span>{progress.streak.current}-day streak</span>
          <span aria-hidden="true">•</span>
          <button
            type="button"
            onClick={() => review(nodeId, 4)}
            className="font-semibold text-emerald-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Schedule review
          </button>
        </div>
      ) : null}
    </section>
  );
}
