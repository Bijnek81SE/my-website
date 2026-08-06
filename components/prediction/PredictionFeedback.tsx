import Link from "next/link";
import type { PredictionChallenge } from "@/content/synthesis";
import type { PredictionEvaluation } from "@/components/chemistry/prediction";

type Props = {
  challenge: PredictionChallenge;
  evaluation: PredictionEvaluation;
};

export default function PredictionFeedback({ challenge, evaluation }: Props) {
  return (
    <section
      aria-live="polite"
      className={`rounded-2xl border p-5 ${evaluation.complete ? "border-emerald-300 bg-emerald-50" : "border-amber-300 bg-amber-50"}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Prediction score</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">
            {evaluation.score}/{evaluation.total} decisions correct
          </h3>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-700">
          {evaluation.complete ? "Complete" : "Review the pathway"}
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
        <p className={evaluation.reagentCorrect ? "text-emerald-800" : "text-rose-700"}>
          {evaluation.reagentCorrect ? "✓" : "✕"} Reagent choice
        </p>
        <p className={evaluation.productCorrect ? "text-emerald-800" : "text-rose-700"}>
          {evaluation.productCorrect ? "✓" : "✕"} Major product
        </p>
        <p className={evaluation.reasoningCorrect ? "text-emerald-800" : "text-rose-700"}>
          {evaluation.reasoningCorrect ? "✓" : "✕"} Mechanistic reason
        </p>
      </div>

      <p className="mt-4 leading-7 text-slate-700">{challenge.explanation}</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-violet-700">Regioselectivity</dt>
          <dd className="mt-1 text-sm leading-6 text-slate-700">{challenge.regioselectivity}</dd>
        </div>
        <div className="rounded-xl bg-white p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-violet-700">Stereochemistry</dt>
          <dd className="mt-1 text-sm leading-6 text-slate-700">{challenge.stereochemistry}</dd>
        </div>
      </dl>
      <p className="mt-4 rounded-xl border border-rose-200 bg-white p-4 text-sm leading-6 text-rose-900">
        <strong>Common mistake:</strong> {challenge.commonMistake}
      </p>
      <Link
        href={challenge.mechanismHref}
        className="mt-4 inline-flex rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
      >
        Open the full mechanism →
      </Link>
    </section>
  );
}
