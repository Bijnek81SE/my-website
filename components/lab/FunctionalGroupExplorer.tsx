"use client";

import { useMemo, useState } from "react";
import ChallengeFooter from "./ChallengeFooter";
import ExerciseCard from "./ExerciseCard";
import FeedbackPanel from "./FeedbackPanel";
import HintPanel from "./HintPanel";
import ProgressBar from "./ProgressBar";
import ScoreBadge from "./ScoreBadge";

type FunctionalGroup = {
  id: string;
  name: string;
  formula: string;
  highlightedFormula: string;
  pattern: string;
  suffix: string;
  prefix: string;
  example: string;
  clue: string;
  explanation: string;
  distractors: string[];
  difficulty: "Foundation" | "Intermediate";
};

const functionalGroups: FunctionalGroup[] = [
  {
    id: "alcohol",
    name: "Alcohol",
    formula: "CH₃CH₂OH",
    highlightedFormula: "CH₃CH₂[OH]",
    pattern: "R–OH",
    suffix: "-ol",
    prefix: "hydroxy-",
    example: "Ethanol",
    clue: "Look for oxygen bonded to hydrogen.",
    explanation: "The hydroxyl group, –OH, is bonded to carbon, so this molecule is an alcohol.",
    distractors: ["Ether", "Aldehyde", "Amine"],
    difficulty: "Foundation",
  },
  {
    id: "ether",
    name: "Ether",
    formula: "CH₃OCH₃",
    highlightedFormula: "CH₃[O]CH₃",
    pattern: "R–O–R′",
    suffix: "No dedicated suffix",
    prefix: "alkoxy-",
    example: "Methoxymethane",
    clue: "Find oxygen bonded to two carbon groups.",
    explanation: "The oxygen atom connects two carbon groups, which is the defining pattern of an ether.",
    distractors: ["Alcohol", "Ester", "Ketone"],
    difficulty: "Foundation",
  },
  {
    id: "aldehyde",
    name: "Aldehyde",
    formula: "CH₃CHO",
    highlightedFormula: "CH₃[CHO]",
    pattern: "R–CHO",
    suffix: "-al",
    prefix: "formyl-",
    example: "Ethanal",
    clue: "The carbonyl carbon is at the end of the chain and bonded to hydrogen.",
    explanation: "A terminal carbonyl carbon bonded to hydrogen gives an aldehyde group, –CHO.",
    distractors: ["Ketone", "Alcohol", "Carboxylic acid"],
    difficulty: "Foundation",
  },
  {
    id: "ketone",
    name: "Ketone",
    formula: "CH₃COCH₃",
    highlightedFormula: "CH₃[CO]CH₃",
    pattern: "R–C(=O)–R′",
    suffix: "-one",
    prefix: "oxo-",
    example: "Propanone",
    clue: "The carbonyl carbon is bonded to two carbon groups.",
    explanation: "A carbonyl group within a carbon chain, bonded to two carbon groups, is a ketone.",
    distractors: ["Aldehyde", "Ester", "Amide"],
    difficulty: "Foundation",
  },
  {
    id: "carboxylic-acid",
    name: "Carboxylic acid",
    formula: "CH₃COOH",
    highlightedFormula: "CH₃[COOH]",
    pattern: "R–COOH",
    suffix: "-oic acid",
    prefix: "carboxy-",
    example: "Ethanoic acid",
    clue: "Look for a carbonyl and hydroxyl on the same carbon.",
    explanation: "The –COOH group combines a carbonyl and hydroxyl on one carbon, forming a carboxylic acid.",
    distractors: ["Ester", "Alcohol", "Aldehyde"],
    difficulty: "Foundation",
  },
  {
    id: "ester",
    name: "Ester",
    formula: "CH₃COOCH₃",
    highlightedFormula: "CH₃[COO]CH₃",
    pattern: "R–C(=O)–O–R′",
    suffix: "-oate",
    prefix: "alkoxycarbonyl-",
    example: "Methyl ethanoate",
    clue: "Find a carbonyl directly bonded to an oxygen that continues to carbon.",
    explanation: "A carbonyl bonded to an –O–R group gives the ester pattern R–C(=O)–O–R′.",
    distractors: ["Carboxylic acid", "Ether", "Ketone"],
    difficulty: "Intermediate",
  },
  {
    id: "amine",
    name: "Amine",
    formula: "CH₃CH₂NH₂",
    highlightedFormula: "CH₃CH₂[NH₂]",
    pattern: "R–NH₂, R₂NH, or R₃N",
    suffix: "-amine",
    prefix: "amino-",
    example: "Ethanamine",
    clue: "Find nitrogen that is not directly bonded to a carbonyl carbon.",
    explanation: "The nitrogen is bonded to carbon and hydrogen but not to a carbonyl carbon, so it is an amine.",
    distractors: ["Amide", "Nitrile", "Alcohol"],
    difficulty: "Foundation",
  },
  {
    id: "amide",
    name: "Amide",
    formula: "CH₃CONH₂",
    highlightedFormula: "CH₃[CONH₂]",
    pattern: "R–C(=O)–NR₂",
    suffix: "-amide",
    prefix: "carbamoyl-",
    example: "Ethanamide",
    clue: "Find nitrogen directly bonded to a carbonyl carbon.",
    explanation: "Nitrogen directly attached to a carbonyl carbon is the defining feature of an amide.",
    distractors: ["Amine", "Nitrile", "Ester"],
    difficulty: "Intermediate",
  },
  {
    id: "nitrile",
    name: "Nitrile",
    formula: "CH₃C≡N",
    highlightedFormula: "CH₃[C≡N]",
    pattern: "R–C≡N",
    suffix: "-nitrile",
    prefix: "cyano-",
    example: "Ethanenitrile",
    clue: "Look for a carbon–nitrogen triple bond.",
    explanation: "The C≡N unit is a nitrile functional group.",
    distractors: ["Amine", "Amide", "Alkyne"],
    difficulty: "Intermediate",
  },
];

function orderedChoices(group: FunctionalGroup) {
  const labels = [group.name, ...group.distractors];
  const offset = group.id.length % labels.length;
  return [...labels.slice(offset), ...labels.slice(0, offset)];
}

function HighlightedFormula({ value }: { value: string }) {
  const match = value.match(/^(.*)\[(.*)\](.*)$/);
  if (!match) return <>{value}</>;
  return (
    <>
      {match[1]}
      <span className="rounded-lg bg-amber-300 px-1.5 py-1 text-slate-950 ring-2 ring-amber-400/40">
        {match[2]}
      </span>
      {match[3]}
    </>
  );
}

export default function FunctionalGroupExplorer() {
  const [difficulty, setDifficulty] = useState<"Foundation" | "Intermediate" | "All">("Foundation");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);

  const pool = useMemo(
    () => functionalGroups.filter((group) => difficulty === "All" || group.difficulty === difficulty),
    [difficulty],
  );
  const group = pool[index % pool.length];
  const choices = useMemo(() => orderedChoices(group), [group]);
  const isCorrect = selected === group.name;

  function choose(label: string) {
    if (selected !== null) return;
    setSelected(label);
    setAttempted((value) => value + 1);
    if (label === group.name) {
      setScore((value) => value + 1);
      setShowHighlight(true);
    }
  }

  function next() {
    setSelected(null);
    setShowHint(false);
    setShowHighlight(false);
    setIndex((value) => (value + 1) % pool.length);
  }

  function reset() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAttempted(0);
    setShowHint(false);
    setShowHighlight(false);
  }

  function changeDifficulty(value: "Foundation" | "Intermediate" | "All") {
    setDifficulty(value);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAttempted(0);
    setShowHint(false);
    setShowHighlight(false);
  }

  return (
    <ExerciseCard
      number={index + 1}
      title="Identify the functional group"
      instructions="Inspect the condensed structure, then choose the group it contains."
      footer={
        <ChallengeFooter
          onReset={reset}
          onNext={next}
          nextDisabled={!isCorrect}
          nextLabel="Next molecule"
        />
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-slate-700">Difficulty</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["Foundation", "Intermediate", "All"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => changeDifficulty(value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                  difficulty === value
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <ScoreBadge score={score} total={attempted} />
      </div>

      <div className="mt-6">
        <ProgressBar current={(index % pool.length) + 1} total={pool.length} />
      </div>

      <div className="my-8 rounded-3xl border border-slate-800 bg-slate-950 px-5 py-12 text-center font-mono text-3xl font-semibold tracking-wide text-white sm:text-5xl">
        {showHighlight ? <HighlightedFormula value={group.highlightedFormula} /> : group.formula}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {choices.map((label) => {
          const picked = selected === label;
          const correct = label === group.name;
          let className = "border-slate-300 bg-white text-slate-900 hover:border-blue-500 hover:bg-blue-50";
          if (selected !== null && correct) className = "border-emerald-500 bg-emerald-50 text-emerald-950";
          else if (picked) className = "border-rose-500 bg-rose-50 text-rose-950";

          return (
            <button
              key={label}
              type="button"
              onClick={() => choose(label)}
              disabled={selected !== null}
              className={`rounded-2xl border-2 px-5 py-4 text-left font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-default ${className}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-4">
        {selected === null ? (
          <FeedbackPanel title="Choose an answer">
            Select the functional group that best matches the structure.
          </FeedbackPanel>
        ) : (
          <FeedbackPanel tone={isCorrect ? "success" : "error"} title={isCorrect ? "Correct" : "Not quite"}>
            {isCorrect ? group.explanation : `${selected} does not match this bonding pattern. Try the hint, then reset the exercise.`}
          </FeedbackPanel>
        )}

        {!isCorrect ? (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowHint((value) => !value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-blue-400 hover:bg-blue-50"
            >
              {showHint ? "Hide hint" : "Show hint"}
            </button>
            {selected !== null ? (
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-blue-400 hover:bg-blue-50"
              >
                Try again
              </button>
            ) : null}
          </div>
        ) : null}

        {showHint && !isCorrect ? <HintPanel>{group.clue}</HintPanel> : null}

        {isCorrect ? (
          <div className="grid gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Pattern</p><p className="mt-1 font-semibold text-slate-950">{group.pattern}</p></div>
            <div><p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Suffix</p><p className="mt-1 font-semibold text-slate-950">{group.suffix}</p></div>
            <div><p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Prefix</p><p className="mt-1 font-semibold text-slate-950">{group.prefix}</p></div>
            <div><p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Example</p><p className="mt-1 font-semibold text-slate-950">{group.example}</p></div>
          </div>
        ) : null}
      </div>
    </ExerciseCard>
  );
}
