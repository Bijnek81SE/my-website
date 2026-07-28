"use client";

import { useMemo, useState } from "react";
import ChallengeFooter from "./ChallengeFooter";
import ExerciseCard from "./ExerciseCard";
import FeedbackPanel from "./FeedbackPanel";
import HintPanel from "./HintPanel";
import ProgressBar from "./ProgressBar";
import ScoreBadge from "./ScoreBadge";

type Choice = {
  label: string;
  correct: boolean;
  explanation: string;
};

type Question = {
  formula: string;
  prompt: string;
  hint: string;
  choices: Choice[];
};

const questions: Question[] = [
  {
    formula: "CH₃CH₂OH",
    prompt: "Which functional group is present?",
    hint: "Look for an oxygen bonded to hydrogen.",
    choices: [
      { label: "Alcohol", correct: true, explanation: "The –OH group bonded to carbon is an alcohol functional group." },
      { label: "Ether", correct: false, explanation: "An ether has oxygen bonded to two carbon groups: R–O–R′." },
      { label: "Aldehyde", correct: false, explanation: "An aldehyde contains a terminal carbonyl group, –CHO." },
    ],
  },
  {
    formula: "CH₃COCH₃",
    prompt: "Which functional group is present?",
    hint: "The carbonyl carbon is bonded to two carbon groups.",
    choices: [
      { label: "Ketone", correct: true, explanation: "A ketone contains a carbonyl carbon bonded to two carbon groups." },
      { label: "Carboxylic acid", correct: false, explanation: "A carboxylic acid requires a –COOH group." },
      { label: "Ester", correct: false, explanation: "An ester has the pattern R–C(=O)–O–R′." },
    ],
  },
  {
    formula: "CH₃CONH₂",
    prompt: "Which functional group is present?",
    hint: "Find a nitrogen directly bonded to a carbonyl carbon.",
    choices: [
      { label: "Amine", correct: false, explanation: "In an amine, nitrogen is not directly attached to a carbonyl carbon." },
      { label: "Amide", correct: true, explanation: "An amide contains nitrogen directly bonded to a carbonyl carbon." },
      { label: "Nitrile", correct: false, explanation: "A nitrile contains a carbon–nitrogen triple bond, C≡N." },
    ],
  },
];

export default function FunctionalGroupQuickCheck() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[questionIndex];
  const selectedChoice = selectedIndex === null ? null : question.choices[selectedIndex];
  const completed = selectedChoice?.correct ?? false;

  const progress = useMemo(() => questionIndex + (selectedIndex !== null ? 1 : 0), [questionIndex, selectedIndex]);

  function selectChoice(index: number) {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    if (question.choices[index].correct) setScore((value) => value + 1);
  }

  function resetQuestion() {
    if (selectedChoice?.correct) setScore((value) => Math.max(0, value - 1));
    setSelectedIndex(null);
  }

  function nextQuestion() {
    setSelectedIndex(null);
    setQuestionIndex((value) => (value + 1) % questions.length);
  }

  return (
    <ExerciseCard
      number={questionIndex + 1}
      title="Functional-group quick check"
      instructions={question.prompt}
      footer={
        <ChallengeFooter
          onReset={resetQuestion}
          onNext={nextQuestion}
          nextDisabled={!completed}
          nextLabel={questionIndex === questions.length - 1 ? "Start again" : "Next exercise"}
        />
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ProgressBar current={progress} total={questions.length} />
        <ScoreBadge score={score} total={questions.length} />
      </div>

      <div className="my-8 rounded-3xl border border-slate-200 bg-slate-950 px-6 py-10 text-center font-mono text-4xl font-semibold tracking-wide text-white sm:text-5xl">
        {question.formula}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {question.choices.map((choice, index) => {
          const selected = selectedIndex === index;
          const className = selected
            ? choice.correct
              ? "border-emerald-500 bg-emerald-50 text-emerald-950"
              : "border-rose-500 bg-rose-50 text-rose-950"
            : "border-slate-300 bg-white text-slate-900 hover:border-blue-500 hover:bg-blue-50";

          return (
            <button
              key={choice.label}
              type="button"
              onClick={() => selectChoice(index)}
              disabled={selectedIndex !== null}
              className={`rounded-2xl border-2 px-5 py-4 text-left font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-default ${className}`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-4">
        {selectedChoice ? (
          <FeedbackPanel
            tone={selectedChoice.correct ? "success" : "error"}
            title={selectedChoice.correct ? "Correct" : "Try again"}
          >
            {selectedChoice.explanation}
          </FeedbackPanel>
        ) : (
          <FeedbackPanel title="Choose an answer">
            Select the functional group that best matches the structure.
          </FeedbackPanel>
        )}
        {!completed ? <HintPanel>{question.hint}</HintPanel> : null}
      </div>
    </ExerciseCard>
  );
}
