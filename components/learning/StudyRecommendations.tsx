"use client";

import Link from "next/link";
import { lessons } from "@/content/lesson-registry";
import { getDueReviewRecords, getProgressSummary } from "./ProgressEngine";
import { useLearningProgress } from "./LearningEngine";

export default function StudyRecommendations() {
  const { progress } = useLearningProgress();
  const summary = getProgressSummary(progress);
  const due = getDueReviewRecords(progress).slice(0, 2);
  const nextLesson = lessons.find(
    (lesson) => progress.records[`lesson:${lesson.slug}`]?.status !== "completed",
  );

  if (summary.total === 0) return null;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="adaptive-study-heading">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-700">
            Personal study plan
          </p>
          <h2 id="adaptive-study-heading" className="mt-1 text-lg font-bold text-slate-950">
            Continue studying
          </h2>
        </div>
        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-800">
          {progress.streak.current}-day streak
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {summary.completed} completed and {summary.inProgress} in progress on this browser.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {due.map((record) => (
          <div key={record.nodeId} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Review due</p>
            <p className="mt-1 font-semibold text-slate-950">{record.title}</p>
          </div>
        ))}
        {nextLesson ? (
          <Link
            href={nextLesson.href}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Recommended next</p>
            <p className="mt-1 font-semibold text-slate-950">{nextLesson.title}</p>
            <p className="mt-1 text-sm text-slate-600">{nextLesson.readingTime}</p>
          </Link>
        ) : null}
        <Link
          href="/calculators/stoichiometry"
          className="rounded-xl border border-blue-200 bg-blue-50 p-4 transition hover:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Practise quantitatively</p>
          <p className="mt-1 font-semibold text-slate-950">Scale a reaction</p>
          <p className="mt-1 text-sm text-slate-600">Use mole ratios to connect balanced equations with reaction amounts.</p>
        </Link>
        <Link
          href="/workspace"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 transition hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 sm:col-span-2"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Bring the tools together</p>
          <p className="mt-1 font-semibold text-slate-950">Continue in the chemistry workspace</p>
          <p className="mt-1 text-sm text-slate-600">Keep one molecule in context across spectra, reactions, calculations, references, and notes.</p>
        </Link>
        <Link
          href="/lab/retrosynthesis"
          className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 transition hover:border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 sm:col-span-2"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Think backwards</p>
          <p className="mt-1 font-semibold text-slate-950">Plan a retrosynthesis</p>
          <p className="mt-1 text-sm text-slate-600">Compare disconnections and validate each proposed step with the forward mechanism.</p>
        </Link>
        <Link
          href="/lab/reaction-prediction"
          className="rounded-xl border border-violet-200 bg-violet-50 p-4 transition hover:border-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 sm:col-span-2"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Build synthetic reasoning</p>
          <p className="mt-1 font-semibold text-slate-950">Predict a product and plan a route</p>
          <p className="mt-1 text-sm text-slate-600">Apply mechanisms, reagents, regioselectivity, and stereochemistry together.</p>
        </Link>
        <Link
          href="/lab/spectroscopy"
          className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 transition hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 sm:col-span-2"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Interpret experimental evidence</p>
          <p className="mt-1 font-semibold text-slate-950">Open the spectroscopy lab</p>
          <p className="mt-1 text-sm text-slate-600">Connect structures to NMR, IR, and mass-spectral signals.</p>
        </Link>
        <Link
          href="/reactions"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 transition hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 sm:col-span-2"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Apply what you know</p>
          <p className="mt-1 font-semibold text-slate-950">Compare reaction pathways</p>
          <p className="mt-1 text-sm text-slate-600">Use the reaction explorer to connect mechanisms, reagents, and selectivity.</p>
        </Link>
      </div>
    </aside>
  );
}
