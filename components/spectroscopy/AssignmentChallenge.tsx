"use client";

import { useState } from "react";
import type { SpectralAssignment, SpectroscopyCompound, SpectrumKind } from "@/components/chemistry/spectroscopy";

type Props = { compound: SpectroscopyCompound; kind: SpectrumKind; selectedAssignment?: SpectralAssignment };

function assignmentsFor(compound: SpectroscopyCompound, kind: SpectrumKind): readonly SpectralAssignment[] {
  if (kind === "proton-nmr") return compound.protonNmr;
  if (kind === "carbon-nmr") return compound.carbonNmr;
  if (kind === "ir") return compound.ir;
  return compound.mass;
}

export default function AssignmentChallenge({ compound, kind, selectedAssignment }: Props) {
  const assignments = assignmentsFor(compound, kind);
  const target = assignments[0];
  const [answer, setAnswer] = useState<string>();
  const correct = answer === target.id;

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5" aria-labelledby="assignment-challenge-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-800">Assignment mode</p>
      <h2 id="assignment-challenge-heading" className="mt-1 text-lg font-bold text-slate-950">Find: {target.label}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">Select the matching signal on the spectrum, then check your answer.</p>
      <button
        type="button"
        disabled={!selectedAssignment}
        onClick={() => setAnswer(selectedAssignment?.id)}
        className="mt-4 rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Check selected assignment
      </button>
      {answer ? (
        <p role="status" className={`mt-3 rounded-xl p-3 text-sm font-semibold ${correct ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
          {correct ? "Correct — the selected structure and signal correspond." : "Not yet — compare the chemical environment and diagnostic position."}
        </p>
      ) : null}
    </section>
  );
}
