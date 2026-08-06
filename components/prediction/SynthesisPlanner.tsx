"use client";

import { useState } from "react";
import {
  evaluateSynthesisPlan,
  getAvailableTransformations,
} from "@/components/chemistry/prediction";
import {
  getSynthesisStructure,
  synthesisTargets,
  transformationRules,
  type TransformationRule,
} from "@/content/synthesis";
import StructureCard from "./StructureCard";

export default function SynthesisPlanner() {
  const [targetId, setTargetId] = useState(synthesisTargets[0].id);
  const [steps, setSteps] = useState<TransformationRule[]>([]);
  const target = synthesisTargets.find((item) => item.id === targetId) ?? synthesisTargets[0];
  const evaluation = evaluateSynthesisPlan(target, steps);
  const current = getSynthesisStructure(evaluation.currentStructureId);
  const goal = getSynthesisStructure(target.targetStructureId);
  const available = getAvailableTransformations(
  evaluation.currentStructureId,
  transformationRules,
);

  function changeTarget(nextTargetId: string) {
    setTargetId(nextTargetId);
    setSteps([]);
  }

  function applyRule(rule: TransformationRule) {
    if (evaluation.reachedTarget || steps.length >= target.maxSteps) return;
    setSteps((currentSteps) => [...currentSteps, rule]);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
              Synthesis planning
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">{target.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Build a valid route by applying transformations in sequence. The planner only offers reactions compatible with the current functional group.
            </p>
          </div>
          <label className="text-sm font-semibold text-slate-800">
            Target problem
            <select
              value={targetId}
              onChange={(event) => changeTarget(event.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              {synthesisTargets.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.difficulty}: {item.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        {getSynthesisStructure(target.startStructureId) ? (
          <StructureCard structure={getSynthesisStructure(target.startStructureId)!} />
        ) : null}
        <div className="flex items-center justify-center text-2xl font-bold text-slate-400" aria-hidden="true">
          →
        </div>
        {goal ? <StructureCard structure={goal} tone="emerald" /> : null}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Current intermediate
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-950">
              {current?.name ?? "Unknown structure"}
            </h3>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700">
            {steps.length}/{target.maxSteps} steps used
          </span>
        </div>

        {current ? <div className="mt-4"><StructureCard structure={current} compact tone={evaluation.reachedTarget ? "emerald" : "slate"} /></div> : null}

        <div className="mt-6">
          <h4 className="font-bold text-slate-950">Available transformations</h4>
          {available.length > 0 && !evaluation.reachedTarget && steps.length < target.maxSteps ? (
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {available.map((rule) => (
                <button
                  key={rule.id}
                  type="button"
                  onClick={() => applyRule(rule)}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-400 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <span className="block font-bold text-slate-950">{rule.title}</span>
                  <span className="mt-1 block font-mono text-sm text-emerald-800">{rule.reagents}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{rule.rationale}</span>
                </button>
              ))}
            </div>
          ) : null}

          {!evaluation.reachedTarget && (available.length === 0 || steps.length >= target.maxSteps) ? (
            <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-900">
              This route has reached a dead end or exceeded the step limit. Undo a step or reset the route.
            </div>
          ) : null}
        </div>

        {steps.length > 0 ? (
          <div className="mt-6">
            <h4 className="font-bold text-slate-950">Route history</h4>
            <ol className="mt-3 space-y-3">
              {steps.map((step, index) => (
                <li key={`${step.id}-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step {index + 1}</p>
                  <p className="mt-1 font-bold text-slate-950">{step.title}</p>
                  <p className="mt-1 font-mono text-sm text-emerald-800">{step.reagents}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={steps.length === 0}
            onClick={() => setSteps((currentSteps) => currentSteps.slice(0, -1))}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50"
          >
            Undo last step
          </button>
          <button
            type="button"
            onClick={() => setSteps([])}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
          >
            Reset route
          </button>
        </div>
      </section>

      {evaluation.reachedTarget ? (
        <section aria-live="polite" className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">Target reached</p>
          <h3 className="mt-1 text-xl font-bold text-slate-950">
            {evaluation.efficient ? "Efficient route complete" : "Valid route complete"}
          </h3>
          <p className="mt-3 leading-7 text-slate-700">
            You reached {goal?.name} in {evaluation.stepCount} step{evaluation.stepCount === 1 ? "" : "s"}. {evaluation.efficient ? "This matches the recommended route." : "The route works, although another route may be shorter or more selective."}
          </p>
        </section>
      ) : (
        <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          <strong>Hint:</strong> {target.hint}
        </aside>
      )}
    </div>
  );
}
