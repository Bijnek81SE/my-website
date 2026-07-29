"use client";

import { useEffect, useMemo, useState } from "react";
import Sn1ReactionCanvas from "./Sn1ReactionCanvas";
import type { MechanismStep } from "./types";

const steps: MechanismStep[] = [
  {
    id: "substrate",
    title: "Identify the tertiary substrate",
    description:
      "tert-Butyl bromide contains a tertiary carbon attached to a good leaving group. The polar C–Br bond can ionise in a polar protic solvent.",
    note: "Tertiary carbocations are stabilised by alkyl substitution and hyperconjugation.",
    highlight: "substrate",
    arrows: [],
  },
  {
    id: "ionisation",
    title: "The leaving group departs",
    description:
      "The C–Br bond breaks heterolytically. Both bonding electrons move onto bromine, producing bromide and a tertiary carbocation.",
    note: "This slow ionisation step controls the SN1 reaction rate.",
    highlight: "leaving-group",
    arrows: [
      {
        id: "departure",
        start: { x: 462, y: 205 },
        control: { x: 495, y: 94 },
        end: { x: 545, y: 172 },
        colour: "#dc2626",
        label: "Carbon bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "carbocation",
    title: "A carbocation intermediate forms",
    description:
      "The carbon is now positively charged and trigonal planar. Because it is planar, a nucleophile can attack from either face.",
    note: "SN1 reactions proceed through a discrete carbocation intermediate.",
    highlight: "carbocation",
    arrows: [],
  },
  {
    id: "nucleophile-attack",
    title: "Water attacks the carbocation",
    description:
      "A lone pair on water attacks the electron-deficient carbocation, forming a new C–O bond and an oxonium ion.",
    note: "The nucleophile attacks after the rate-determining ionisation step.",
    highlight: "nucleophile",
    arrows: [
      {
        id: "attack",
        start: { x: 132, y: 174 },
        control: { x: 235, y: 58 },
        end: { x: 338, y: 188 },
        colour: "#2563eb",
        label: "Water lone pair attacks the carbocation",
      },
    ],
  },
  {
    id: "deprotonation",
    title: "Deprotonation gives the alcohol",
    description:
      "A second water molecule removes a proton from the oxonium ion. The O–H bond electrons remain on oxygen, producing tert-butanol.",
    note: "A fast proton-transfer step neutralises the oxonium intermediate.",
    highlight: "deprotonation",
    arrows: [
      {
        id: "base",
        start: { x: 142, y: 252 },
        control: { x: 230, y: 312 },
        end: { x: 328, y: 246 },
        colour: "#2563eb",
        label: "Water removes a proton",
      },
      {
        id: "oh-bond",
        start: { x: 390, y: 228 },
        control: { x: 438, y: 282 },
        end: { x: 470, y: 214 },
        colour: "#7c3aed",
        label: "O H bond electrons return to oxygen",
      },
    ],
  },
  {
    id: "products",
    title: "The substitution product forms",
    description:
      "tert-Butanol is produced together with hydronium and bromide. The nucleophile has replaced the leaving group.",
    note: "Overall: (CH₃)₃CBr + H₂O → (CH₃)₃COH + H₃O⁺ + Br⁻",
    highlight: "product",
    arrows: [],
  },
];

export default function Sn1MechanismPlayer() {
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
    }, 2800);

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
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">
            Reaction mechanism player
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">SN1 substitution</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Follow ionisation, carbocation formation, nucleophile attack, and deprotonation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAnimated((value) => !value)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-400"
        >
          Arrow animation: {animated ? "On" : "Off"}
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
          <span>Step {index + 1} of {steps.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-violet-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Sn1ReactionCanvas step={step} animated={animated} />

      <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5" aria-live="polite">
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
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
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
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
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
          className="text-sm font-semibold text-violet-700 transition hover:text-violet-900"
        >
          Reset mechanism
        </button>
      </div>

      <style jsx global>{`
        @keyframes mechanismArrowFlow {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
        .mechanism-arrow-flow {
          animation: mechanismArrowFlow 0.85s linear infinite;
        }
      `}</style>
    </div>
  );
}
