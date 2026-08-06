"use client";

import { useState } from "react";
import { evaluatePrediction, type PredictionEvaluation } from "@/components/chemistry/prediction";
import { predictionChallenges } from "@/content/synthesis";
import DecisionGroup from "./DecisionGroup";
import PredictionFeedback from "./PredictionFeedback";
import StructureCard from "./StructureCard";

export default function PredictionTrainer() {
  const [challengeId, setChallengeId] = useState(predictionChallenges[0].id);
  const [reagentId, setReagentId] = useState("");
  const [productId, setProductId] = useState("");
  const [reasoningId, setReasoningId] = useState("");
  const [evaluation, setEvaluation] = useState<PredictionEvaluation | null>(null);
  const challenge = predictionChallenges.find((item) => item.id === challengeId) ?? predictionChallenges[0];

  function resetAnswers(nextChallengeId = challengeId) {
    setChallengeId(nextChallengeId);
    setReagentId("");
    setProductId("");
    setReasoningId("");
    setEvaluation(null);
  }

  const canSubmit = Boolean(reagentId && productId && reasoningId);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-700">Product prediction</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">{challenge.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">{challenge.prompt}</p>
          </div>
          <label className="text-sm font-semibold text-slate-800">
            Challenge
            <select
              value={challengeId}
              onChange={(event) => resetAnswers(event.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              {predictionChallenges.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.difficulty}: {item.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <StructureCard structure={challenge.substrate} tone="violet" />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Workflow</p>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li>1. Identify what the reagent system does.</li>
              <li>2. Predict connectivity and the major product.</li>
              <li>3. Justify the result using the actual mechanism.</li>
            </ol>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <DecisionGroup
            legend="1. Choose the reagent conditions"
            choices={challenge.reagentChoices.map((choice) => ({ id: choice.id, label: choice.label, detail: `${choice.conditions} — ${choice.role}` }))}
            value={reagentId}
            onChange={(value) => { setReagentId(value); setEvaluation(null); }}
            result={{ correctId: challenge.correctReagentId, revealed: Boolean(evaluation) }}
          />
          <DecisionGroup
            legend="2. Choose the major product"
            choices={challenge.productChoices.map((choice) => ({ id: choice.id, label: `${choice.name} · ${choice.condensedFormula}`, detail: choice.selectivityNote }))}
            value={productId}
            onChange={(value) => { setProductId(value); setEvaluation(null); }}
            result={{ correctId: challenge.correctProductId, revealed: Boolean(evaluation) }}
          />
          <DecisionGroup
            legend="3. Choose the best mechanistic explanation"
            choices={challenge.reasoningChoices}
            value={reasoningId}
            onChange={(value) => { setReasoningId(value); setEvaluation(null); }}
            result={{ correctId: challenge.correctReasoningId, revealed: Boolean(evaluation) }}
          />

          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => setEvaluation(evaluatePrediction(challenge, { reagentId, productId, reasoningId }))}
            className="rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check prediction
          </button>
        </div>
      </div>

      {evaluation ? <PredictionFeedback challenge={challenge} evaluation={evaluation} /> : null}
    </div>
  );
}
