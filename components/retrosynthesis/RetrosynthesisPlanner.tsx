"use client";

import { useState } from "react";
import { findRetrosynthesisRoutes } from "@/components/chemistry/retrosynthesis";
import {
  retrosynthesisRules,
  retrosynthesisTargets,
  requireRetrosynthesisStructure,
} from "@/content/retrosynthesis";
import RouteCard from "./RouteCard";
import StructureBadge from "./StructureBadge";

export default function RetrosynthesisPlanner() {
  const [targetId, setTargetId] = useState(retrosynthesisTargets[0].id);
  const [showHint, setShowHint] = useState(false);
  const target = retrosynthesisTargets.find((entry) => entry.id === targetId) ?? retrosynthesisTargets[0];
  const targetStructure = requireRetrosynthesisStructure(target.targetStructureId);
  const startingMaterials = target.availableStartingMaterialIds.map(requireRetrosynthesisStructure);
  const routes = findRetrosynthesisRoutes(target, retrosynthesisRules).slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-indigo-200 bg-[linear-gradient(135deg,#eef2ff_0%,#ecfdf5_100%)] p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">Retrosynthesis Planner</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Work backwards from a target to practical starting materials.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          Compare reverse disconnections, inspect the forward reaction that validates each step, and choose the shortest reliable route rather than memorising a single answer.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="text-sm font-semibold text-slate-800">
            Target problem
            <select
              value={targetId}
              onChange={(event) => {
                setTargetId(event.target.value);
                setShowHint(false);
              }}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              {retrosynthesisTargets.map((entry) => (
                <option key={entry.id} value={entry.id}>{entry.difficulty}: {entry.title}</option>
              ))}
            </select>
          </label>
          <button type="button" onClick={() => setShowHint((current) => !current)} className="rounded-xl border border-indigo-300 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-100">
            {showHint ? "Hide hint" : "Show strategic hint"}
          </button>
        </div>
        {showHint ? <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">{target.hint}</p> : null}
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">Target</p>
            <div className="mt-3"><StructureBadge structure={targetStructure} tone="violet" /></div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{target.learningGoal}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Allowed starting materials</p>
            <div className="mt-3 grid gap-3">
              {startingMaterials.map((structure) => <StructureBadge key={structure.id} structure={structure} tone="emerald" />)}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-950">How routes are scored</p>
            <p className="mt-2">Reliability is rewarded. Extra steps, difficult conditions, and selectivity risk reduce the score. A complete route must terminate only in allowed starting materials.</p>
          </div>
        </aside>

        <section aria-labelledby="route-options-heading" className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-700">Ranked route search</p>
            <h2 id="route-options-heading" className="mt-1 text-2xl font-bold text-slate-950">Possible disconnections</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{routes.length} route option{routes.length === 1 ? "" : "s"} found within a depth limit of {target.maxDepth}.</p>
          </div>
          {routes.map((route, index) => <RouteCard key={`${target.id}-${index}-${route.score}`} route={route} target={target} index={index} />)}
        </section>
      </div>
    </div>
  );
}
