"use client";

import { useEffect, useMemo, useState } from "react";
import PracticeEngine from "./PracticeEngine";
import E2ReactionCanvas, {
  type E2MechanismStep,
  type E2PracticeTarget,
} from "./E2ReactionCanvas";
import type { PracticeQuestion } from "./PracticeTypes";

type PlayerMode = "learn" | "practice";

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
        start: { x: 187, y: 150 },
        control: { x: 230, y: 72 },
        end: { x: 300, y: 170 },
        colour: "#2563eb",
        label: "Base lone pair removes the beta hydrogen",
      },
      {
        id: "ch-to-pi",
        start: { x: 355, y: 167 },
        control: { x: 407, y: 88 },
        end: { x: 445, y: 183 },
        colour: "#7c3aed",
        label: "Carbon hydrogen bond electrons form the pi bond",
      },
      {
        id: "cbr-to-br",
        start: { x: 525, y: 202 },
        control: { x: 597, y: 112 },
        end: { x: 645, y: 184 },
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

const practiceQuestions: PracticeQuestion<E2PracticeTarget>[] = [
  {
    id: "identify-beta-hydrogen",
    title: "Which hydrogen can the base remove?",
    description:
      "The removable hydrogen must be on the β-carbon and anti-periplanar to the leaving group.",
    instruction:
      "Click the correctly aligned β-hydrogen.",
    correctTarget: "beta-hydrogen",
    incorrectFeedback:
      "Not quite. Look for the hydrogen on the carbon adjacent to the carbon bearing bromine.",
    correctExplanation:
      "This β-hydrogen is anti-periplanar to bromine, allowing the required orbital overlap for E2 elimination.",
  },
  {
    id: "identify-base",
    title: "Which species removes the β-hydrogen?",
    description:
      "E2 reactions require a base that can abstract the β-hydrogen.",
    instruction:
      "Click the species acting as the base.",
    correctTarget: "base",
    incorrectFeedback:
      "Not quite. Select the electron-rich species that accepts the proton.",
    correctExplanation:
      "Hydroxide acts as the base by donating a lone pair to the β-hydrogen.",
  },
  {
    id: "identify-alkene-product",
    title: "Which product contains the new π bond?",
    description:
      "The E2 reaction forms an alkene as the β-hydrogen and leaving group are removed.",
    instruction:
      "Click the alkene product.",
    correctTarget: "alkene-product",
    incorrectFeedback:
      "Not quite. Look for the product containing a carbon–carbon double bond.",
    correctExplanation:
      "The alkene is the elimination product formed when the new carbon–carbon π bond is created.",
  },
];

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(
      target.tagName,
    )
  );
}

export default function E2MechanismPlayer() {
  const [mode, setMode] = useState<PlayerMode>("learn");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [practiceAnswered, setPracticeAnswered] =
    useState(false);
  const [practiceSessionKey, setPracticeSessionKey] =
    useState(0);

  const step = steps[index];

  const isFirst = index === 0;
  const isLast = index === steps.length - 1;

  const progress = useMemo(
    () => Math.round(((index + 1) / steps.length) * 100),
    [index],
  );

  useEffect(() => {
    if (!playing || mode === "practice") {
      return;
    }

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
  }, [mode, playing]);

  useEffect(() => {
    setPracticeAnswered(false);
  }, [index]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setPlaying(false);
        setIndex((current) => Math.max(0, current - 1));
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        if (mode === "practice" && !practiceAnswered) {
          return;
        }

        setPlaying(false);
        setIndex((current) =>
          Math.min(steps.length - 1, current + 1),
        );
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        setPlaying(false);
        setIndex(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();

        if (mode === "practice") {
          return;
        }

        setPlaying(false);
        setIndex(steps.length - 1);
        return;
      }

      if (event.key === " " && mode === "learn") {
        event.preventDefault();

        setPlaying((currentPlaying) => {
          if (currentPlaying) {
            return false;
          }

          setIndex((currentIndex) =>
            currentIndex === steps.length - 1
              ? 0
              : currentIndex,
          );

          return true;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mode, practiceAnswered]);

  function changeMode(nextMode: PlayerMode) {
    setPlaying(false);
    setIndex(0);
    setPracticeAnswered(false);
    setMode(nextMode);

    if (nextMode === "practice") {
      setPracticeSessionKey((current) => current + 1);
    }
  }

  function previous() {
    setPlaying(false);
    setIndex((current) => Math.max(0, current - 1));
  }

  function next() {
    if (mode === "practice" && !practiceAnswered) {
      return;
    }

    setPlaying(false);
    setIndex((current) =>
      Math.min(steps.length - 1, current + 1),
    );
  }

  function reset() {
    setPlaying(false);
    setIndex(0);
    setPracticeAnswered(false);

    if (mode === "practice") {
      setPracticeSessionKey((current) => current + 1);
    }
  }

  function togglePlay() {
    if (mode === "practice") {
      return;
    }

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
            Follow β-hydrogen abstraction, π-bond formation, and
            leaving-group departure in one concerted step.
          </p>
        </div>

        <button
          type="button"
          aria-pressed={animated}
          onClick={() => setAnimated((value) => !value)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-400"
        >
          Arrow animation: {animated ? "On" : "Off"}
        </button>
      </div>

      <div
        className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1"
        role="group"
        aria-label="Mechanism player mode"
      >
        <button
          type="button"
          aria-pressed={mode === "learn"}
          onClick={() => changeMode("learn")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === "learn"
              ? "bg-white text-orange-700 shadow-sm"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          Learn
        </button>

        <button
          type="button"
          aria-pressed={mode === "practice"}
          onClick={() => changeMode("practice")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === "practice"
              ? "bg-white text-orange-700 shadow-sm"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          Practice
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

      {mode === "learn" ? (
        <>
          <E2ReactionCanvas
            step={step}
            animated={animated}
          />

          <div
            className="rounded-2xl border border-orange-100 bg-orange-50 p-5"
            aria-live="polite"
          >
            <h3 className="text-lg font-bold text-slate-950">
              {step.title}
            </h3>

            <p className="mt-2 leading-7 text-slate-700">
              {step.description}
            </p>
          </div>
        </>
      ) : (
        <PracticeEngine
          key={practiceSessionKey}
          questions={practiceQuestions}
          currentIndex={index}
          stepDescription={step.description}
          revealMessage={
            step.arrows.length > 0
              ? "The three concerted electron movements are now shown on the reaction diagram."
              : index === steps.length - 1
                ? "You have identified the alkene product."
                : "You have identified the correctly aligned β-hydrogen."
          }
          onAnsweredChange={setPracticeAnswered}
          renderCanvas={({ answered, onTargetClick }) => {
            const practiceStep: E2MechanismStep = {
              ...step,
              arrows: answered
                ? index === 0
                  ? steps[1].arrows
                  : step.arrows
                : [],
            };

            return (
              <E2ReactionCanvas
                step={practiceStep}
                animated={animated}
                interactive={!answered}
                onTargetClick={onTargetClick}
              />
            );
          }}
        />
      )}

      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <span className="font-semibold text-slate-800">
          Keyboard:
        </span>{" "}
        ← previous, → next
        {mode === "learn"
          ? ", Space play/pause, Home first step, End last step"
          : ", Home first step"}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={previous}
            disabled={isFirst}
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={togglePlay}
            disabled={mode === "practice"}
            className="rounded-xl bg-slate-950 px-5 py-2 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {mode === "practice"
              ? "Practice active"
              : playing
                ? "Pause"
                : isLast
                  ? "Replay"
                  : "Play"}
          </button>

          <button
            type="button"
            onClick={next}
            disabled={
              isLast ||
              (mode === "practice" && !practiceAnswered)
            }
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <button
          type="button"
          onClick={reset}
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