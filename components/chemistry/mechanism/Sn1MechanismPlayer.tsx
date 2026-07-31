"use client";

import { useEffect, useMemo, useState } from "react";
import PracticeEngine from "./PracticeEngine";
import Sn2ReactionCanvas, {
  type Sn2PracticeTarget,
} from "./Sn2ReactionCanvas";
import type { PracticeQuestion } from "./PracticeTypes";
import type { MechanismStep } from "./types";

type PlayerMode = "learn" | "practice";

const steps: MechanismStep[] = [
  {
    id: "identify-nucleophile",
    title: "Identify the nucleophile",
    description:
      "Hydroxide carries a negative charge and a lone pair, making it electron-rich and able to attack the electrophilic carbon.",
    note: "The lone pair on oxygen is the electron source.",
    highlight: "nucleophile",
    arrows: [],
  },
  {
    id: "backside-attack",
    title: "Backside attack begins",
    description:
      "The hydroxide lone pair attacks the carbon from the side opposite bromine. The new C–O bond begins forming.",
    note: "SN2 reactions use backside attack at the electrophilic carbon.",
    highlight: "substrate",
    arrows: [
      {
        id: "attack",
        start: { x: 132, y: 176 },
        control: { x: 230, y: 58 },
        end: { x: 325, y: 190 },
        colour: "#2563eb",
        label: "Hydroxide lone pair attacks the methyl carbon",
      },
    ],
  },
  {
    id: "bond-breaking",
    title: "The leaving-group bond breaks",
    description:
      "As the C–O bond forms, the C–Br bond electrons move onto bromine. Bond formation and bond breaking occur together.",
    note: "SN2 is concerted: both electron movements happen in one step.",
    highlight: "leaving-group",
    arrows: [
      {
        id: "attack",
        start: { x: 132, y: 176 },
        control: { x: 230, y: 58 },
        end: { x: 325, y: 190 },
        colour: "#2563eb",
        label: "Hydroxide lone pair attacks the methyl carbon",
      },
      {
        id: "departure",
        start: { x: 420, y: 190 },
        control: { x: 490, y: 96 },
        end: { x: 532, y: 174 },
        colour: "#dc2626",
        label: "Carbon bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "products",
    title: "Products form",
    description:
      "Methanol is formed and bromide leaves with the electron pair from the original C–Br bond.",
    note: "Overall: HO⁻ + CH₃Br → CH₃OH + Br⁻",
    highlight: "product",
    arrows: [],
  },
];

const practiceQuestions: PracticeQuestion<Sn2PracticeTarget>[] = [
  {
    id: "identify-nucleophile",
    title: "Which species is the nucleophile?",
    description:
      "Identify the electron-rich species that donates an electron pair to the electrophilic carbon.",
    instruction:
      "Click the atom that belongs to the nucleophile.",
    correctTarget: "oxygen",
    incorrectFeedback:
      "Not quite. The nucleophile must be able to donate an electron pair.",
    correctExplanation:
      "Hydroxide is the nucleophile because oxygen donates a lone pair to the electrophilic carbon.",
  },
  {
    id: "identify-arrow-source",
    title: "Where does the first curved arrow start?",
    description:
      "Curved arrows begin at electrons, such as a lone pair or a bond.",
    instruction:
      "Click the atom whose lone pair supplies the electrons.",
    correctTarget: "oxygen",
    incorrectFeedback:
      "Not quite. Look for the atom that owns the donating lone pair.",
    correctExplanation:
      "The first curved arrow starts at the oxygen lone pair. Those electrons form the new carbon–oxygen bond.",
  },
  {
    id: "identify-breaking-bond",
    title: "Which bond breaks during the reaction?",
    description:
      "SN2 bond formation and bond breaking happen together in one concerted step.",
    instruction:
      "Click the bond whose electrons move onto the leaving group.",
    correctTarget: "carbon-bromine-bond",
    incorrectFeedback:
      "Not quite. Identify the bond connecting the electrophilic carbon to the leaving group.",
    correctExplanation:
      "The carbon–bromine bond breaks, and its electron pair moves onto bromine.",
  },
  {
    id: "identify-leaving-group-product",
    title: "Which product is the leaving group?",
    description:
      "The leaving group departs with the electron pair from its original bond.",
    instruction:
      "Click the leaving-group product.",
    correctTarget: "product-bromide",
    incorrectFeedback:
      "Not quite. The leaving group is the species that departed from carbon with the bonding electron pair.",
    correctExplanation:
      "Bromide is the leaving-group product. It leaves with the electron pair from the original C–Br bond.",
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

export default function MechanismPlayer() {
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
    }, 2600);

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

  function togglePlayback() {
    if (mode === "practice") {
      return;
    }

    if (playing) {
      setPlaying(false);
      return;
    }

    if (isLast) {
      setIndex(0);
    }

    setPlaying(true);
  }

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Reaction mechanism player
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            SN2 substitution
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Follow the electron movement from nucleophile attack to
            leaving-group departure.
          </p>
        </div>

        <button
          type="button"
          aria-pressed={animated}
          onClick={() => setAnimated((value) => !value)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-400"
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
              ? "bg-white text-blue-700 shadow-sm"
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
              ? "bg-white text-blue-700 shadow-sm"
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
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {mode === "learn" ? (
        <>
          <Sn2ReactionCanvas
            step={step}
            animated={animated}
          />

          <div
            className="rounded-2xl border border-blue-100 bg-blue-50 p-5"
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
            index === steps.length - 1
              ? "You have identified the correct product."
              : "The correct electron movement is now shown on the reaction diagram."
          }
          onAnsweredChange={setPracticeAnswered}
          renderCanvas={({ answered, onTargetClick }) => {
            const practiceStep: MechanismStep = {
              ...step,
              arrows: answered
                ? index === 0
                  ? steps[1].arrows
                  : step.arrows
                : [],
            };

            return (
              <Sn2ReactionCanvas
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
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={togglePlayback}
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
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <button
          type="button"
          onClick={reset}
          className="text-sm font-semibold text-blue-700 transition hover:text-blue-900"
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