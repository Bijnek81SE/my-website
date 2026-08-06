"use client";

import { useState } from "react";
import PredictionTrainer from "./PredictionTrainer";
import SynthesisPlanner from "./SynthesisPlanner";

export default function ReactionPredictionLab() {
  const [mode, setMode] = useState<"prediction" | "synthesis">("prediction");

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-violet-200 bg-[linear-gradient(135deg,#f5f3ff_0%,#ecfdf5_100%)] p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">
          Reaction Prediction &amp; Synthesis Engine
        </p>
        <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Predict products from mechanism, then design a route to a target.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          Practise reagent recognition, major-product prediction, regioselectivity, stereochemistry, and multi-step planning with immediate mechanistic feedback.
        </p>
        <div className="mt-6 inline-flex rounded-xl border border-violet-200 bg-white p-1" role="tablist" aria-label="Prediction lab mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "prediction"}
            onClick={() => setMode("prediction")}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${mode === "prediction" ? "bg-violet-700 text-white" : "text-slate-700 hover:bg-violet-50"}`}
          >
            Predict products
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "synthesis"}
            onClick={() => setMode("synthesis")}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${mode === "synthesis" ? "bg-emerald-700 text-white" : "text-slate-700 hover:bg-emerald-50"}`}
          >
            Plan a synthesis
          </button>
        </div>
      </section>

      {mode === "prediction" ? <PredictionTrainer /> : <SynthesisPlanner />}
    </div>
  );
}
