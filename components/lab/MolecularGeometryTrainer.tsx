"use client";

import { useMemo, useState } from "react";
import ChallengeFooter from "./ChallengeFooter";
import ExerciseCard from "./ExerciseCard";
import FeedbackPanel from "./FeedbackPanel";
import HintPanel from "./HintPanel";
import ProgressBar from "./ProgressBar";
import ScoreBadge from "./ScoreBadge";

type Difficulty = "Foundation" | "Intermediate";
type MolecularGeometry =
  | "Linear"
  | "Bent"
  | "Trigonal planar"
  | "Tetrahedral"
  | "Trigonal pyramidal"
  | "Trigonal bipyramidal"
  | "Octahedral";

type Exercise = {
  id: string;
  formula: string;
  centralAtom: string;
  electronDomains: number;
  lonePairs: number;
  electronGeometry: string;
  molecularGeometry: MolecularGeometry;
  hybridization: string;
  bondAngle: string;
  hint: string;
  explanation: string;
  difficulty: Difficulty;
};

const exercises: Exercise[] = [
  {
    id: "carbon-dioxide",
    formula: "CO₂",
    centralAtom: "carbon",
    electronDomains: 2,
    lonePairs: 0,
    electronGeometry: "linear",
    molecularGeometry: "Linear",
    hybridization: "sp",
    bondAngle: "180°",
    hint: "Each double bond counts as one electron domain around carbon.",
    explanation: "Carbon has two bonding domains and no lone pairs, so both the electron geometry and molecular geometry are linear.",
    difficulty: "Foundation",
  },
  {
    id: "boron-trifluoride",
    formula: "BF₃",
    centralAtom: "boron",
    electronDomains: 3,
    lonePairs: 0,
    electronGeometry: "trigonal planar",
    molecularGeometry: "Trigonal planar",
    hybridization: "sp²",
    bondAngle: "120°",
    hint: "Boron has three B–F bonding domains and no lone pairs.",
    explanation: "Three bonding domains spread evenly in one plane, producing trigonal planar geometry.",
    difficulty: "Foundation",
  },
  {
    id: "sulfur-dioxide",
    formula: "SO₂",
    centralAtom: "sulfur",
    electronDomains: 3,
    lonePairs: 1,
    electronGeometry: "trigonal planar",
    molecularGeometry: "Bent",
    hybridization: "sp²",
    bondAngle: "slightly less than 120°",
    hint: "Use three electron domains for the electron geometry, then hide the lone-pair position.",
    explanation: "Sulfur has two bonding domains and one lone pair. The electron geometry is trigonal planar, but the visible atoms form a bent shape.",
    difficulty: "Foundation",
  },
  {
    id: "methane",
    formula: "CH₄",
    centralAtom: "carbon",
    electronDomains: 4,
    lonePairs: 0,
    electronGeometry: "tetrahedral",
    molecularGeometry: "Tetrahedral",
    hybridization: "sp³",
    bondAngle: "109.5°",
    hint: "Four bonding domains and no lone pairs preserve the full electron geometry.",
    explanation: "Four equivalent C–H bonding domains point toward the corners of a tetrahedron.",
    difficulty: "Foundation",
  },
  {
    id: "ammonia",
    formula: "NH₃",
    centralAtom: "nitrogen",
    electronDomains: 4,
    lonePairs: 1,
    electronGeometry: "tetrahedral",
    molecularGeometry: "Trigonal pyramidal",
    hybridization: "sp³",
    bondAngle: "about 107°",
    hint: "Start with a tetrahedral electron geometry and remove the lone-pair position from the visible shape.",
    explanation: "Nitrogen has three bonding domains and one lone pair. The atoms form a trigonal pyramid, and lone-pair repulsion compresses the bond angle.",
    difficulty: "Foundation",
  },
  {
    id: "water",
    formula: "H₂O",
    centralAtom: "oxygen",
    electronDomains: 4,
    lonePairs: 2,
    electronGeometry: "tetrahedral",
    molecularGeometry: "Bent",
    hybridization: "sp³",
    bondAngle: "about 104.5°",
    hint: "Oxygen has two O–H bonds and two lone pairs.",
    explanation: "Four electron domains give tetrahedral electron geometry, but only the two O–H bonds define the molecular shape, which is bent.",
    difficulty: "Foundation",
  },
  {
    id: "ammonium",
    formula: "NH₄⁺",
    centralAtom: "nitrogen",
    electronDomains: 4,
    lonePairs: 0,
    electronGeometry: "tetrahedral",
    molecularGeometry: "Tetrahedral",
    hybridization: "sp³",
    bondAngle: "109.5°",
    hint: "The positive charge means nitrogen no longer has the lone pair found in NH₃.",
    explanation: "Ammonium has four N–H bonding domains and no lone pairs, so it is tetrahedral.",
    difficulty: "Intermediate",
  },
  {
    id: "formaldehyde",
    formula: "H₂C=O",
    centralAtom: "carbon",
    electronDomains: 3,
    lonePairs: 0,
    electronGeometry: "trigonal planar",
    molecularGeometry: "Trigonal planar",
    hybridization: "sp²",
    bondAngle: "about 120°",
    hint: "The C=O double bond is one electron domain around carbon.",
    explanation: "The carbonyl carbon has three bonding domains and no lone pairs, producing trigonal planar geometry.",
    difficulty: "Intermediate",
  },
  {
    id: "nitrite",
    formula: "NO₂⁻",
    centralAtom: "nitrogen",
    electronDomains: 3,
    lonePairs: 1,
    electronGeometry: "trigonal planar",
    molecularGeometry: "Bent",
    hybridization: "sp²",
    bondAngle: "less than 120°",
    hint: "Resonance changes bond order, but not the number of electron domains around nitrogen.",
    explanation: "Nitrogen has two bonding domains and one lone pair. Its electron geometry is trigonal planar and its molecular geometry is bent.",
    difficulty: "Intermediate",
  },
  {
    id: "phosphorus-pentachloride",
    formula: "PCl₅",
    centralAtom: "phosphorus",
    electronDomains: 5,
    lonePairs: 0,
    electronGeometry: "trigonal bipyramidal",
    molecularGeometry: "Trigonal bipyramidal",
    hybridization: "sp³d",
    bondAngle: "90°, 120°, and 180°",
    hint: "Five bonding domains require two axial and three equatorial positions.",
    explanation: "Five bonding domains arrange as three equatorial bonds and two axial bonds in a trigonal bipyramid.",
    difficulty: "Intermediate",
  },
  {
    id: "sulfur-hexafluoride",
    formula: "SF₆",
    centralAtom: "sulfur",
    electronDomains: 6,
    lonePairs: 0,
    electronGeometry: "octahedral",
    molecularGeometry: "Octahedral",
    hybridization: "sp³d²",
    bondAngle: "90° and 180°",
    hint: "Six equivalent bonding domains point along three perpendicular axes.",
    explanation: "Six S–F bonding domains occupy the six vertices of an octahedron.",
    difficulty: "Intermediate",
  },
  {
    id: "beryllium-chloride",
    formula: "BeCl₂",
    centralAtom: "beryllium",
    electronDomains: 2,
    lonePairs: 0,
    electronGeometry: "linear",
    molecularGeometry: "Linear",
    hybridization: "sp",
    bondAngle: "180°",
    hint: "There are only two bonding domains around beryllium.",
    explanation: "Two electron domains repel to opposite sides, giving a linear molecule.",
    difficulty: "Intermediate",
  },
];

const foundationOptions: MolecularGeometry[] = [
  "Linear",
  "Bent",
  "Trigonal planar",
  "Tetrahedral",
  "Trigonal pyramidal",
];

const allOptions: MolecularGeometry[] = [
  ...foundationOptions,
  "Trigonal bipyramidal",
  "Octahedral",
];

type Point = { x: number; y: number; depth?: "front" | "back" | "flat" };

const geometryPoints: Record<MolecularGeometry, Point[]> = {
  Linear: [
    { x: 100, y: 100 },
    { x: 420, y: 100 },
  ],
  Bent: [
    { x: 130, y: 45 },
    { x: 390, y: 45 },
  ],
  "Trigonal planar": [
    { x: 260, y: 18 },
    { x: 105, y: 165 },
    { x: 415, y: 165 },
  ],
  Tetrahedral: [
    { x: 260, y: 20, depth: "flat" },
    { x: 105, y: 150, depth: "flat" },
    { x: 410, y: 150, depth: "back" },
    { x: 300, y: 180, depth: "front" },
  ],
  "Trigonal pyramidal": [
    { x: 260, y: 28, depth: "flat" },
    { x: 115, y: 158, depth: "back" },
    { x: 405, y: 158, depth: "front" },
  ],
  "Trigonal bipyramidal": [
    { x: 260, y: 16, depth: "flat" },
    { x: 260, y: 186, depth: "flat" },
    { x: 95, y: 105, depth: "flat" },
    { x: 405, y: 105, depth: "back" },
    { x: 305, y: 135, depth: "front" },
  ],
  Octahedral: [
    { x: 260, y: 14, depth: "flat" },
    { x: 260, y: 188, depth: "flat" },
    { x: 92, y: 102, depth: "flat" },
    { x: 428, y: 102, depth: "flat" },
    { x: 175, y: 145, depth: "back" },
    { x: 345, y: 58, depth: "front" },
  ],
};

function GeometryPreview({ geometry, revealed }: { geometry: MolecularGeometry; revealed: boolean }) {
  const points = geometryPoints[geometry];
  const center = { x: 260, y: 102 };

  return (
    <div className="relative mx-auto h-52 max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
      <svg
        viewBox="0 0 520 204"
        className="h-full w-full"
        role="img"
        aria-label={`${geometry} molecular geometry model`}
      >
        <defs>
          <radialGradient id="geometry-bg" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="central-atom" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#93c5fd" />
          </radialGradient>
          <radialGradient id="outer-atom" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#3b82f6" />
          </radialGradient>
        </defs>

        <rect width="520" height="204" fill="#020617" />
        <rect width="520" height="204" fill="url(#geometry-bg)" />

        {points
          .filter((point) => point.depth === "back")
          .map((point, index) => (
            <line
              key={`back-${index}`}
              x1={center.x}
              y1={center.y}
              x2={point.x}
              y2={point.y}
              stroke={revealed ? "#60a5fa" : "#475569"}
              strokeWidth="7"
              strokeDasharray="10 8"
              strokeLinecap="round"
              opacity="0.68"
            />
          ))}

        {points
          .filter((point) => point.depth !== "back")
          .map((point, index) => (
            <line
              key={`bond-${index}`}
              x1={center.x}
              y1={center.y}
              x2={point.x}
              y2={point.y}
              stroke={revealed ? "#93c5fd" : "#64748b"}
              strokeWidth={point.depth === "front" ? 13 : 7}
              strokeLinecap="round"
              opacity={point.depth === "front" ? 0.95 : 0.82}
            />
          ))}

        {points.map((point, index) => (
          <g key={`atom-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r={point.depth === "front" ? 19 : 16}
              fill="url(#outer-atom)"
              stroke="#bfdbfe"
              strokeWidth="1.5"
            />
            <circle cx={point.x - 5} cy={point.y - 5} r="3" fill="#ffffff" opacity="0.68" />
          </g>
        ))}

        <circle cx={center.x} cy={center.y} r="25" fill="url(#central-atom)" stroke="#ffffff" strokeWidth="2" />
        <circle cx={center.x - 8} cy={center.y - 8} r="5" fill="#ffffff" opacity="0.75" />

        <text
          x="500"
          y="188"
          textAnchor="end"
          fill="#94a3b8"
          fontSize="11"
          fontWeight="700"
          letterSpacing="2"
        >
          {revealed ? geometry.toUpperCase() : "GEOMETRY PREVIEW"}
        </text>
      </svg>
    </div>
  );
}

export default function MolecularGeometryTrainer() {
  const [difficulty, setDifficulty] = useState<"Foundation" | "Intermediate" | "All">("Foundation");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<MolecularGeometry | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  const pool = useMemo(
    () => exercises.filter((exercise) => difficulty === "All" || exercise.difficulty === difficulty),
    [difficulty],
  );

  const exercise = pool[index % pool.length];
  const options = difficulty === "Foundation" ? foundationOptions : allOptions;
  const isCorrect = selected === exercise.molecularGeometry;

  function choose(value: MolecularGeometry) {
    if (selected !== null) return;
    setSelected(value);
    setAttempted((current) => current + 1);
    if (value === exercise.molecularGeometry) setScore((current) => current + 1);
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
      title="Predict the molecular geometry"
      instructions={`Determine the shape around the central ${exercise.centralAtom} atom.`}
      footer={
        <ChallengeFooter
          onReset={reset}
          onNext={next}
          nextDisabled={!isCorrect}
          nextLabel="Next molecule"
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
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          Central atom: {exercise.centralAtom}
        </p>
        <p className="mt-4 font-mono text-4xl font-bold tracking-wide text-slate-950 sm:text-6xl">
          {exercise.formula}
        </p>
        <p className="mt-4 text-sm font-medium text-slate-600">
          Electron domains: {exercise.electronDomains} · Lone pairs: {exercise.lonePairs}
        </p>
      </div>

      <GeometryPreview geometry={exercise.molecularGeometry} revealed={selected !== null} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const chosen = selected === option;
          const correct = option === exercise.molecularGeometry;

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              disabled={selected !== null}
              className={`rounded-2xl border px-4 py-4 text-base font-bold transition ${
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
        <HintPanel buttonLabel="Show VSEPR hint">{exercise.hint}</HintPanel>
      ) : (
        <FeedbackPanel
          tone={isCorrect ? "success" : "error"}
          title={isCorrect ? "Correct" : `Not quite — the answer is ${exercise.molecularGeometry}`}
        >
          <p>{exercise.explanation}</p>
          <dl className="mt-4 grid gap-3 rounded-2xl bg-white/70 p-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Electron geometry</dt>
              <dd className="mt-1 font-bold capitalize text-slate-950">{exercise.electronGeometry}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Molecular geometry</dt>
              <dd className="mt-1 font-bold text-slate-950">{exercise.molecularGeometry}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hybridization</dt>
              <dd className="mt-1 font-bold text-slate-950">{exercise.hybridization}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Electron domains</dt>
              <dd className="mt-1 font-bold text-slate-950">{exercise.electronDomains}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Central lone pairs</dt>
              <dd className="mt-1 font-bold text-slate-950">{exercise.lonePairs}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ideal bond angle</dt>
              <dd className="mt-1 font-bold text-slate-950">{exercise.bondAngle}</dd>
            </div>
          </dl>
        </FeedbackPanel>
      )}
    </ExerciseCard>
  );
}
