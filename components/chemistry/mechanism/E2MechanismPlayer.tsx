"use client";

import { useEffect, useMemo, useState } from "react";
import E2ReactionCanvas, { type E2MechanismStep } from "./E2ReactionCanvas";

const steps: E2MechanismStep[] = [
  {
    id: "alignment",
    title: "Find an anti-periplanar β-hydrogen",
    description:
      "The strong base must remove a β-hydrogen that is anti-periplanar to the leaving group. This alignment allows the C–H σ bond to overlap with the developing π bond as the C–Br bond breaks.",
    note: "E2 stereochemistry is controlled by the anti-periplanar arrangement.",
    highlight: "alignment",
    arrows: [],
  },
  {
    id: "concerted",
    title: "Three electron movements occur together",
    description:
      "The base removes the β-hydrogen, the C–H bond electrons form the C=C π bond, and the C–Br bond electrons move onto bromine. All three changes occur in one concerted step.",
    note: "E2 has one transition state and no carbocation intermediate.",
    highlight: "concerted",
    arrows: [
      {
        id: "base-to-hydrogen",
        start: { x: 126, y: 168 },
        control: { x: 212, y: 72 },
        end: { x: 303, y: 118 },
        colour: "#2563eb",
        label: "Base lone pair removes the beta hydrogen",
      },
      {
        id: "ch-to-pi",
        start: { x: 330, y: 137 },
        control: { x: 382, y: 88 },
        end: { x: 420, y: 183 },
        colour: "#7c3aed",
        label: "Carbon hydrogen bond electrons form the pi bond",
      },
      {
        id: "cbr-to-br",
        start: { x: 500, y: 202 },
        control: { x: 572, y: 112 },
        end: { x: 620, y: 184 },
        colour: "#dc2626",
        label: "Carbon bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "products",
    title: "The alkene forms",
    description:
      "The reaction produces an alkene, the conjugate acid of the base, and bromide. The leaving group and β-hydrogen are removed from adjacent carbons.",
    note: "Overall: strong base + alkyl bromide → alkene + conjugate acid + Br⁻",
    highlight: "products",
    arrows: [],
  },
];

export default function E2MechanismPlayer() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [animated, setAnimated] = useState(true);

  const step = steps[index];
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const progress = useMemo(
    () => Math.round(((index + 1) / steps.length) * 100),
    [index],
  );

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= steps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 3000);

    return () => window.clearInterval(timer);
  }, [playing]);

  function togglePlay() {
    if (isLast && !playing) {
      setIndex(0);
      setPlaying(true);
      return;
    }

    setPlaying((value) => !value);
  }

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
            Reaction mechanism player
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            E2 elimination
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Follow β-hydrogen abstraction, π-bond formation, and leaving-group departure in one concerted step.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAnimated((value) => !value)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-400"
        >
          Arrow animation: {animated ? "On" : "Off"}
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
          <span>
            Step {index + 1} of {steps.length}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-orange-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <E2ReactionCanvas step={step} animated={animated} />

      <div
        className="rounded-2xl border border-orange-100 bg-orange-50 p-5"
        aria-live="polite"
      >
        <h3 className="text-lg font-bold text-slate-950">{step.title}</h3>
        <p className="mt-2 leading-7 text-slate-700">{step.description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setIndex((current) => Math.max(0, current - 1));
            }}
            disabled={isFirst}
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="rounded-xl bg-slate-950 px-5 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            {playing ? "Pause" : isLast ? "Replay" : "Play"}
          </button>

          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setIndex((current) => Math.min(steps.length - 1, current + 1));
            }}
            disabled={isLast}
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setIndex(0);
          }}
          className="text-sm font-semibold text-orange-700 transition hover:text-orange-900"
        >
          Reset mechanism
        </button>
      </div>

      <style jsx global>{`
        @keyframes mechanismArrowFlow {
          from {
            stroke-dashoffset: 20;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .mechanism-arrow-flow {
          animation: mechanismArrowFlow 0.85s linear infinite;
        }
      `}</style>
    </div>
  );
}
