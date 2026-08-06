import Link from "next/link";
import type { RetrosynthesisRoute, RetrosynthesisTarget } from "@/content/retrosynthesis";
import { routeMatchesRecommendation } from "@/components/chemistry/retrosynthesis";
import StructureBadge from "./StructureBadge";

export default function RouteCard({ route, target, index }: { route: RetrosynthesisRoute; target: RetrosynthesisTarget; index: number }) {
  const recommended = routeMatchesRecommendation(route, target);

  return (
    <article className={`rounded-2xl border p-5 shadow-sm ${recommended ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">Route {index + 1}</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">
            {route.complete ? `${route.steps.length}-step complete route` : "Incomplete route"}
          </h3>
        </div>
        <div className="flex gap-2">
          {recommended ? <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">Recommended</span> : null}
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">Score {route.score}</span>
        </div>
      </div>

      {route.steps.length ? (
        <ol className="mt-5 space-y-5">
          {route.steps.map((step, stepIndex) => (
            <li key={`${step.rule.id}-${stepIndex}`} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <div className="grid gap-3">
                  {step.precursors.map((precursor) => <StructureBadge key={precursor.id} structure={precursor} tone="emerald" />)}
                </div>
                <div className="text-center text-sm font-semibold text-violet-800">
                  <p>{step.rule.forwardReagents}</p>
                  <p className="mt-1 text-xl" aria-hidden="true">→</p>
                </div>
                <StructureBadge structure={step.product} tone="violet" />
              </div>
              <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why this disconnection works</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{step.rule.rationale}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selectivity check</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{step.rule.selectivity}</p>
                </div>
              </div>
              <Link href={step.rule.mechanismHref} className="mt-4 inline-flex rounded-lg border border-violet-300 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-100">
                Validate forward mechanism →
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-900">
          No complete route was found. Unresolved: {route.unresolvedStructureIds.join(", ") || "unknown precursor"}.
        </p>
      )}
    </article>
  );
}
