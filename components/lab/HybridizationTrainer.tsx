"use client";

import { useMemo, useState } from "react";
import ChallengeFooter from "./ChallengeFooter";
import ExerciseCard from "./ExerciseCard";
import FeedbackPanel from "./FeedbackPanel";
import HintPanel from "./HintPanel";
import ProgressBar from "./ProgressBar";
import ScoreBadge from "./ScoreBadge";

type Hybridization = "sp" | "sp²" | "sp³";

type Exercise = {
  id: string;
  formula: string;
  atomLabel: string;
  hybridization: Hybridization;
  electronDomains: number;
  geometry: string;
  bondPattern: string;
  hint: string;
  explanation: string;
  difficulty: "Foundation" | "Intermediate";
};

const exercises: Exercise[] = [
  {
    id: "methane-carbon",
    formula: "CH₄",
    atomLabel: "carbon",
    hybridization: "sp³",
    electronDomains: 4,
    geometry: "tetrahedral",
    bondPattern: "four σ bonds",
    hint: "Count each bond or lone pair around the selected atom as one electron domain.",
    explanation: "Carbon has four electron domains and no π bonds, so it uses four sp³ hybrid orbitals.",
    difficulty: "Foundation",
  },
  {
    id: "ethene-carbon",
    formula: "CH₂=CH₂",
    atomLabel: "either carbon",
    hybridization: "sp²",
    electronDomains: 3,
    geometry: "trigonal planar",
    bondPattern: "three σ domains and one π bond",
    hint: "A double bond counts as one electron domain but leaves one unhybridized p orbital.",
    explanation: "Each carbon has three electron domains and contributes one p orbital to the π bond, giving sp² hybridization.",
    difficulty: "Foundation",
  },
  {
    id: "ethyne-carbon",
    formula: "HC≡CH",
    atomLabel: "either carbon",
    hybridization: "sp",
    electronDomains: 2,
    geometry: "linear",
    bondPattern: "two σ domains and two π bonds",
    hint: "A triple bond requires two unhybridized p orbitals.",
    explanation: "Each carbon has two electron domains and two unhybridized p orbitals, so it is sp hybridized.",
    difficulty: "Foundation",
  },
  {
    id: "ammonia-nitrogen",
    formula: "NH₃",
    atomLabel: "nitrogen",
    hybridization: "sp³",
    electronDomains: 4,
    geometry: "trigonal pyramidal",
    bondPattern: "three σ bonds and one lone pair",
    hint: "Do not forget the lone pair on nitrogen.",
    explanation: "Nitrogen has three σ bonds plus one lone pair: four electron domains, so it is sp³ hybridized.",
    difficulty: "Foundation",
  },
  {
    id: "carbonyl-carbon",
    formula: "CH₃C(=O)CH₃",
    atomLabel: "carbonyl carbon",
    hybridization: "sp²",
    electronDomains: 3,
    geometry: "trigonal planar",
    bondPattern: "three σ domains and one π bond",
    hint: "Focus only on the carbonyl carbon, not the methyl carbons.",
    explanation: "The carbonyl carbon has three electron domains and one unhybridized p orbital for the C=O π bond, so it is sp².",
    difficulty: "Intermediate",
  },
  {
    id: "nitrile-carbon",
    formula: "CH₃C≡N",
    atomLabel: "nitrile carbon",
    hybridization: "sp",
    electronDomains: 2,
    geometry: "linear",
    bondPattern: "two σ domains and two π bonds",
    hint: "The C≡N triple bond uses two p orbitals.",
    explanation: "The nitrile carbon has two electron domains and two π bonds, which requires sp hybridization.",
    difficulty: "Intermediate",
  },
  {
    id: "amide-nitrogen",
    formula: "CH₃C(=O)NH₂",
    atomLabel: "amide nitrogen",
    hybridization: "sp²",
    electronDomains: 3,
    geometry: "approximately trigonal planar",
    bondPattern: "three σ bonds with a delocalized lone pair",
    hint: "Ask whether the lone pair participates in resonance with a neighbouring π system.",
    explanation: "The nitrogen lone pair delocalizes into the carbonyl, so the nitrogen is approximately planar and treated as sp² hybridized.",
    difficulty: "Intermediate",
  },
  {
    id: "carbocation-carbon",
    formula: "(CH₃)₃C⁺",
    atomLabel: "positively charged carbon",
    hybridization: "sp²",
    electronDomains: 3,
    geometry: "trigonal planar",
    bondPattern: "three σ bonds and an empty p orbital",
    hint: "A classical carbocation has an empty p orbital.",
    explanation: "The cationic carbon forms three σ bonds and retains an empty p orbital, so it is sp² and trigonal planar.",
    difficulty: "Intermediate",
  },
];

const options: Hybridization[] = ["sp", "sp²", "sp³"];

function OrbitalPreview({
  answer,
  revealed,
}: {
  answer: Hybridization;
  revealed: boolean;
}) {
  const angles =
    answer === "sp"
      ? [0, 180]
      : answer === "sp²"
        ? [-90, 30, 150]
        : [45, 135, 225, 315];

  const stroke = revealed ? "#93c5fd" : "#475569";
  const fill = revealed ? "rgba(96, 165, 250, 0.28)" : "rgba(51, 65, 85, 0.32)";

  const centerX = 260;
  const centerY = 88;

  return (
    <div className="relative mx-auto h-44 max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
      <svg
        viewBox="0 0 520 176"
        role="img"
        aria-label={`${answer} hybrid orbital preview`}
        className="h-full w-full"
      >
        <defs>
          <radialGradient id="orbitalBackground" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </radialGradient>

          <filter id="nucleusGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="520" height="176" fill="url(#orbitalBackground)" />

        <g transform={`translate(${centerX} ${centerY})`}>
          {angles.map((angle) => (
            <ellipse
              key={angle}
              cx="49"
              cy="0"
              rx="55"
              ry="22"
              transform={`rotate(${angle})`}
              fill={fill}
              stroke={stroke}
              strokeWidth="1.2"
              className="transition-all duration-500"
            />
          ))}

          <circle
            cx="0"
            cy="0"
            r="18"
            fill="#f8fafc"
            filter="url(#nucleusGlow)"
          />
        </g>

        <text
          x="500"
          y="160"
          textAnchor="end"
          fill="#94a3b8"
          fontSize="12"
          fontWeight="600"
          letterSpacing="2"
        >
          SIMPLIFIED ORBITAL VIEW
        </text>
      </svg>
    </div>
  );
}

export default function HybridizationTrainer() {
  const [difficulty, setDifficulty] = useState<"Foundation" | "Intermediate" | "All">("Foundation");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Hybridization | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  const pool = useMemo(
    () => exercises.filter((exercise) => difficulty === "All" || exercise.difficulty === difficulty),
    [difficulty],
  );
  const exercise = pool[index % pool.length];
  const isCorrect = selected === exercise.hybridization;

  function choose(value: Hybridization) {
    if (selected !== null) return;
    setSelected(value);
    setAttempted((current) => current + 1);
    if (value === exercise.hybridization) setScore((current) => current + 1);
  }

  function next() {
    setSelected(null);
    setIndex((current) => (current + 1) % pool.length);
  }

  function reset() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAttempted(0);
  }

  function changeDifficulty(value: "Foundation" | "Intermediate" | "All") {
    setDifficulty(value);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAttempted(0);
  }

  return (
    <ExerciseCard
      number={index + 1}
      title="Predict the hybridization"
      instructions={`Determine the hybridization of the ${exercise.atomLabel}.`}
      footer={
        <ChallengeFooter
          onReset={reset}
          onNext={next}
          nextDisabled={!isCorrect}
          nextLabel="Next structure"
        />
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["Foundation", "Intermediate", "All"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => changeDifficulty(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                difficulty === value
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-400"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <ScoreBadge score={score} total={attempted} />
      </div>

      <ProgressBar current={index + 1} total={pool.length} />

      <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-8 text-center sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Selected atom: {exercise.atomLabel}</p>
        <p className="mt-4 font-mono text-3xl font-bold tracking-wide text-slate-950 sm:text-5xl">{exercise.formula}</p>
      </div>

      <OrbitalPreview answer={exercise.hybridization} revealed={selected !== null} />

      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const chosen = selected === option;
          const correct = option === exercise.hybridization;
          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              disabled={selected !== null}
              className={`rounded-2xl border px-5 py-5 text-xl font-bold transition ${
                selected === null
                  ? "border-slate-200 bg-white text-slate-950 hover:border-blue-500 hover:bg-blue-50"
                  : correct
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                    : chosen
                      ? "border-rose-400 bg-rose-50 text-rose-900"
                      : "border-slate-200 bg-slate-50 text-slate-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected === null ? (
        <HintPanel buttonLabel="Show hint">{exercise.hint}</HintPanel>
      ) : (
        <FeedbackPanel
          tone={isCorrect ? "success" : "error"}
          title={isCorrect ? "Correct" : `Not quite — the answer is ${exercise.hybridization}`}
        >
          <p>{exercise.explanation}</p>
          <dl className="mt-4 grid gap-3 rounded-2xl bg-white/70 p-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Electron domains</dt>
              <dd className="mt-1 font-bold text-slate-950">{exercise.electronDomains}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Geometry</dt>
              <dd className="mt-1 font-bold text-slate-950">{exercise.geometry}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bonding pattern</dt>
              <dd className="mt-1 font-bold text-slate-950">{exercise.bondPattern}</dd>
            </div>
          </dl>
        </FeedbackPanel>
      )}
    </ExerciseCard>
  );
}
