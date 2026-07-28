"use client";

import { useMemo, useState } from "react";
import ChallengeFooter from "./ChallengeFooter";
import ExerciseCard from "./ExerciseCard";
import FeedbackPanel from "./FeedbackPanel";
import HintPanel from "./HintPanel";
import ProgressBar from "./ProgressBar";
import ScoreBadge from "./ScoreBadge";

type Polarity = "Polar" | "Non-polar";
type Difficulty = "Foundation" | "Intermediate";
type Point = { x: number; y: number; label: string; tone?: "central" | "outer" };
type Vector = { x1: number; y1: number; x2: number; y2: number };

type Exercise = {
  id: string;
  formula: string;
  name: string;
  polarity: Polarity;
  geometry: string;
  bondPolarity: string;
  cancellation: string;
  netDipole: string;
  hint: string;
  explanation: string;
  difficulty: Difficulty;
  atoms: Point[];
  bonds: Array<[number, number]>;
  bondDipoles: Vector[];
  netVector?: Vector;
};

const exercises: Exercise[] = [
  {
    id: "carbon-dioxide",
    formula: "CO₂",
    name: "carbon dioxide",
    polarity: "Non-polar",
    geometry: "linear",
    bondPolarity: "Each C=O bond is polar.",
    cancellation: "The two equal bond dipoles point in opposite directions and cancel.",
    netDipole: "zero",
    hint: "A molecule can contain polar bonds but still be non-polar when its geometry is symmetric.",
    explanation: "CO₂ is linear and symmetric. Its two C=O bond dipoles are equal and opposite, so the molecule has no net dipole.",
    difficulty: "Foundation",
    atoms: [
      { x: 260, y: 92, label: "C", tone: "central" },
      { x: 130, y: 92, label: "O" },
      { x: 390, y: 92, label: "O" },
    ],
    bonds: [[0, 1], [0, 2]],
    bondDipoles: [
      { x1: 230, y1: 72, x2: 165, y2: 72 },
      { x1: 290, y1: 72, x2: 355, y2: 72 },
    ],
  },
  {
    id: "water",
    formula: "H₂O",
    name: "water",
    polarity: "Polar",
    geometry: "bent",
    bondPolarity: "Both O–H bonds are polar toward oxygen.",
    cancellation: "The bent geometry prevents the bond dipoles from cancelling.",
    netDipole: "toward oxygen",
    hint: "Compare the bent shape with a linear molecule such as CO₂.",
    explanation: "Water is bent, so its two O–H bond dipoles reinforce one another and create a net molecular dipole toward oxygen.",
    difficulty: "Foundation",
    atoms: [
      { x: 260, y: 70, label: "O", tone: "central" },
      { x: 175, y: 135, label: "H" },
      { x: 345, y: 135, label: "H" },
    ],
    bonds: [[0, 1], [0, 2]],
    bondDipoles: [
      { x1: 195, y1: 120, x2: 238, y2: 85 },
      { x1: 325, y1: 120, x2: 282, y2: 85 },
    ],
    netVector: { x1: 260, y1: 145, x2: 260, y2: 92 },
  },
  {
    id: "methane",
    formula: "CH₄",
    name: "methane",
    polarity: "Non-polar",
    geometry: "tetrahedral",
    bondPolarity: "C–H bonds are only weakly polar.",
    cancellation: "The tetrahedral arrangement is symmetric, so the bond dipoles cancel.",
    netDipole: "zero",
    hint: "Look for four identical outer atoms arranged symmetrically around carbon.",
    explanation: "Methane is tetrahedral and symmetric. Any small C–H bond dipoles cancel, leaving no net molecular dipole.",
    difficulty: "Foundation",
    atoms: [
      { x: 260, y: 92, label: "C", tone: "central" },
      { x: 260, y: 25, label: "H" },
      { x: 170, y: 105, label: "H" },
      { x: 350, y: 105, label: "H" },
      { x: 260, y: 160, label: "H" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
    bondDipoles: [],
  },
  {
    id: "ammonia",
    formula: "NH₃",
    name: "ammonia",
    polarity: "Polar",
    geometry: "trigonal pyramidal",
    bondPolarity: "Each N–H bond is polar toward nitrogen.",
    cancellation: "The trigonal pyramidal shape is not symmetric enough for complete cancellation.",
    netDipole: "toward nitrogen",
    hint: "The lone pair changes tetrahedral electron geometry into a pyramidal molecular shape.",
    explanation: "Ammonia is trigonal pyramidal. The N–H bond dipoles combine to give a net dipole toward nitrogen.",
    difficulty: "Foundation",
    atoms: [
      { x: 260, y: 62, label: "N", tone: "central" },
      { x: 170, y: 130, label: "H" },
      { x: 350, y: 130, label: "H" },
      { x: 260, y: 150, label: "H" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3]],
    bondDipoles: [
      { x1: 195, y1: 115, x2: 238, y2: 78 },
      { x1: 325, y1: 115, x2: 282, y2: 78 },
    ],
    netVector: { x1: 260, y1: 145, x2: 260, y2: 85 },
  },
  {
    id: "boron-trifluoride",
    formula: "BF₃",
    name: "boron trifluoride",
    polarity: "Non-polar",
    geometry: "trigonal planar",
    bondPolarity: "Each B–F bond is strongly polar toward fluorine.",
    cancellation: "Three equal bond dipoles separated by 120° cancel exactly.",
    netDipole: "zero",
    hint: "Three identical bonds in a trigonal planar arrangement form a symmetric molecule.",
    explanation: "BF₃ has polar B–F bonds, but its trigonal planar symmetry causes all three bond dipoles to cancel.",
    difficulty: "Foundation",
    atoms: [
      { x: 260, y: 95, label: "B", tone: "central" },
      { x: 260, y: 25, label: "F" },
      { x: 165, y: 145, label: "F" },
      { x: 355, y: 145, label: "F" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3]],
    bondDipoles: [
      { x1: 260, y1: 70, x2: 260, y2: 45 },
      { x1: 235, y1: 108, x2: 195, y2: 130 },
      { x1: 285, y1: 108, x2: 325, y2: 130 },
    ],
  },
  {
    id: "sulfur-dioxide",
    formula: "SO₂",
    name: "sulfur dioxide",
    polarity: "Polar",
    geometry: "bent",
    bondPolarity: "Both S–O bonds are polar toward oxygen.",
    cancellation: "Because the molecule is bent, the two bond dipoles do not oppose each other directly.",
    netDipole: "away from sulfur and between the oxygen atoms",
    hint: "Do not confuse the trigonal planar electron geometry with the bent molecular geometry.",
    explanation: "SO₂ is bent. Its two S–O dipoles combine rather than cancel, so the molecule has a net dipole.",
    difficulty: "Foundation",
    atoms: [
      { x: 260, y: 70, label: "S", tone: "central" },
      { x: 175, y: 135, label: "O" },
      { x: 345, y: 135, label: "O" },
    ],
    bonds: [[0, 1], [0, 2]],
    bondDipoles: [
      { x1: 238, y1: 85, x2: 195, y2: 120 },
      { x1: 282, y1: 85, x2: 325, y2: 120 },
    ],
    netVector: { x1: 260, y1: 75, x2: 260, y2: 132 },
  },
  {
    id: "dichloromethane",
    formula: "CH₂Cl₂",
    name: "dichloromethane",
    polarity: "Polar",
    geometry: "tetrahedral",
    bondPolarity: "C–Cl bonds are substantially more polar than C–H bonds.",
    cancellation: "Two chlorines and two hydrogens make the tetrahedron unsymmetrical.",
    netDipole: "toward the chlorine side",
    hint: "A tetrahedral molecule is non-polar only when its surrounding groups create a symmetric dipole pattern.",
    explanation: "CH₂Cl₂ is tetrahedral but not symmetric because chlorine and hydrogen create different bond dipoles. The vectors do not cancel.",
    difficulty: "Intermediate",
    atoms: [
      { x: 260, y: 92, label: "C", tone: "central" },
      { x: 190, y: 35, label: "Cl" },
      { x: 330, y: 35, label: "Cl" },
      { x: 180, y: 145, label: "H" },
      { x: 340, y: 145, label: "H" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
    bondDipoles: [
      { x1: 240, y1: 75, x2: 210, y2: 50 },
      { x1: 280, y1: 75, x2: 310, y2: 50 },
    ],
    netVector: { x1: 260, y1: 125, x2: 260, y2: 55 },
  },
  {
    id: "methanol",
    formula: "CH₃OH",
    name: "methanol",
    polarity: "Polar",
    geometry: "tetrahedral around carbon; bent around oxygen",
    bondPolarity: "The C–O and O–H bonds are strongly polar toward oxygen.",
    cancellation: "The molecule is unsymmetrical, so these bond dipoles reinforce a net dipole.",
    netDipole: "toward oxygen",
    hint: "Focus on the electronegative oxygen and the asymmetric arrangement around it.",
    explanation: "Methanol is polar because its C–O and O–H bond dipoles do not cancel. Electron density is concentrated toward oxygen.",
    difficulty: "Intermediate",
    atoms: [
      { x: 190, y: 92, label: "C", tone: "central" },
      { x: 315, y: 92, label: "O" },
      { x: 410, y: 55, label: "H" },
      { x: 105, y: 40, label: "H" },
      { x: 105, y: 145, label: "H" },
      { x: 190, y: 165, label: "H" },
    ],
    bonds: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5]],
    bondDipoles: [
      { x1: 225, y1: 72, x2: 285, y2: 72 },
      { x1: 385, y1: 62, x2: 340, y2: 80 },
    ],
    netVector: { x1: 210, y1: 120, x2: 300, y2: 92 },
  },
  {
    id: "acetone",
    formula: "(CH₃)₂CO",
    name: "acetone",
    polarity: "Polar",
    geometry: "trigonal planar at the carbonyl carbon",
    bondPolarity: "The C=O bond has a strong dipole toward oxygen.",
    cancellation: "The carbonyl dipole is not cancelled by the two methyl groups.",
    netDipole: "toward the carbonyl oxygen",
    hint: "Carbonyl groups produce a strong, directional bond dipole.",
    explanation: "Acetone is polar because the strong carbonyl dipole remains after the other bond vectors are combined.",
    difficulty: "Intermediate",
    atoms: [
      { x: 260, y: 105, label: "C", tone: "central" },
      { x: 260, y: 25, label: "O" },
      { x: 145, y: 145, label: "CH₃" },
      { x: 375, y: 145, label: "CH₃" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3]],
    bondDipoles: [{ x1: 260, y1: 80, x2: 260, y2: 45 }],
    netVector: { x1: 260, y1: 145, x2: 260, y2: 48 },
  },
  {
    id: "benzene",
    formula: "C₆H₆",
    name: "benzene",
    polarity: "Non-polar",
    geometry: "planar hexagonal ring",
    bondPolarity: "The C–H bonds are weakly polar.",
    cancellation: "The sixfold symmetry cancels the bond dipoles around the ring.",
    netDipole: "zero",
    hint: "Look for the high symmetry of the planar ring.",
    explanation: "Benzene is planar and highly symmetric. Its weak bond dipoles cancel around the ring, so it has no net molecular dipole.",
    difficulty: "Intermediate",
    atoms: [
      { x: 260, y: 35, label: "C" },
      { x: 330, y: 70, label: "C" },
      { x: 330, y: 130, label: "C" },
      { x: 260, y: 165, label: "C" },
      { x: 190, y: 130, label: "C" },
      { x: 190, y: 70, label: "C" },
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
    bondDipoles: [],
  },
];

const options: Polarity[] = ["Polar", "Non-polar"];

function Arrow({ vector, colour, markerId }: { vector: Vector; colour: string; markerId: string }) {
  return (
    <line
      x1={vector.x1}
      y1={vector.y1}
      x2={vector.x2}
      y2={vector.y2}
      stroke={colour}
      strokeWidth="3"
      strokeLinecap="round"
      markerEnd={`url(#${markerId})`}
    />
  );
}

function PolarityDiagram({ exercise, revealed }: { exercise: Exercise; revealed: boolean }) {
  const [showBondDipoles, setShowBondDipoles] = useState(true);
  const [showNetDipole, setShowNetDipole] = useState(true);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
      <div className="flex flex-wrap gap-2 border-b border-slate-800 px-4 py-3">
        <button
          type="button"
          onClick={() => setShowBondDipoles((current) => !current)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            showBondDipoles ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-300"
          }`}
        >
          Bond dipoles
        </button>
        <button
          type="button"
          onClick={() => setShowNetDipole((current) => !current)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            showNetDipole ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-300"
          }`}
        >
          Net dipole
        </button>
      </div>

      <svg viewBox="0 0 520 190" className="h-auto w-full" role="img" aria-label={`${exercise.formula} polarity diagram`}>
        <defs>
          <marker id="bondDipoleArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
          </marker>
          <marker id="netDipoleArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
          </marker>
          <radialGradient id="diagramGlow" cx="50%" cy="50%" r="62%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.18)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0)" />
          </radialGradient>
        </defs>

        <rect width="520" height="190" fill="url(#diagramGlow)" />

        {exercise.bonds.map(([from, to], index) => (
          <line
            key={`${from}-${to}-${index}`}
            x1={exercise.atoms[from].x}
            y1={exercise.atoms[from].y}
            x2={exercise.atoms[to].x}
            y2={exercise.atoms[to].y}
            stroke="#94a3b8"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}

        {exercise.atoms.map((atom, index) => (
          <g key={`${atom.label}-${index}`}>
            <circle
              cx={atom.x}
              cy={atom.y}
              r={atom.label.length > 1 ? 25 : atom.tone === "central" ? 23 : 21}
              fill={atom.tone === "central" ? "#dbeafe" : "#f8fafc"}
              stroke={atom.tone === "central" ? "#60a5fa" : "#cbd5e1"}
              strokeWidth="2"
            />
            <text x={atom.x} y={atom.y + 6} textAnchor="middle" fontSize={atom.label.length > 1 ? 14 : 17} fontWeight="700" fill="#0f172a">
              {atom.label}
            </text>
          </g>
        ))}

        {showBondDipoles && exercise.bondDipoles.map((vector, index) => (
          <Arrow key={`bond-${index}`} vector={vector} colour="#60a5fa" markerId="bondDipoleArrow" />
        ))}

        {revealed && showNetDipole && exercise.netVector && (
          <Arrow vector={exercise.netVector} colour="#fbbf24" markerId="netDipoleArrow" />
        )}

        {revealed && showNetDipole && !exercise.netVector && (
          <g>
            <circle cx="465" cy="32" r="14" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <line x1="455" y1="22" x2="475" y2="42" stroke="#fbbf24" strokeWidth="2" />
            <text x="440" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">NET μ = 0</text>
          </g>
        )}

        <text x="16" y="176" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="1.6">
          BLUE = BOND DIPOLES
        </text>
        <text x="504" y="176" textAnchor="end" fill="#fbbf24" fontSize="11" fontWeight="600" letterSpacing="1.6">
          AMBER = NET DIPOLE
        </text>
      </svg>
    </div>
  );
}

export default function MolecularPolarityExplorer() {
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("Foundation");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Polarity | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  const pool = useMemo(
    () => exercises.filter((exercise) => difficulty === "All" || exercise.difficulty === difficulty),
    [difficulty],
  );
  const exercise = pool[index % pool.length];
  const isCorrect = selected === exercise.polarity;

  function choose(value: Polarity) {
    if (selected !== null) return;
    setSelected(value);
    setAttempted((current) => current + 1);
    if (value === exercise.polarity) setScore((current) => current + 1);
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

  function changeDifficulty(value: Difficulty | "All") {
    setDifficulty(value);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAttempted(0);
  }

  return (
    <ExerciseCard
      number={index + 1}
      title="Predict molecular polarity"
      instructions={`Decide whether ${exercise.formula} (${exercise.name}) has a net molecular dipole.`}
      footer={<ChallengeFooter onReset={reset} onNext={next} nextDisabled={!isCorrect} nextLabel="Next molecule" />}
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

      <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-7 text-center sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Molecule</p>
        <p className="mt-3 font-mono text-4xl font-bold tracking-wide text-slate-950 sm:text-5xl">{exercise.formula}</p>
        <p className="mt-2 text-sm text-slate-600">Geometry: {exercise.geometry}</p>
      </div>

      <PolarityDiagram key={exercise.id} exercise={exercise} revealed={selected !== null} />

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const chosen = selected === option;
          const correct = option === exercise.polarity;
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
          title={isCorrect ? "Correct" : `Not quite — ${exercise.formula} is ${exercise.polarity.toLowerCase()}`}
        >
          <p>{exercise.explanation}</p>
          <dl className="mt-4 grid gap-3 rounded-2xl bg-white/70 p-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Bond polarity</dt>
              <dd className="mt-1 font-semibold text-slate-950">{exercise.bondPolarity}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Vector cancellation</dt>
              <dd className="mt-1 font-semibold text-slate-950">{exercise.cancellation}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Molecular geometry</dt>
              <dd className="mt-1 font-semibold text-slate-950">{exercise.geometry}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Net dipole</dt>
              <dd className="mt-1 font-semibold text-slate-950">{exercise.netDipole}</dd>
            </div>
          </dl>
        </FeedbackPanel>
      )}
    </ExerciseCard>
  );
}
