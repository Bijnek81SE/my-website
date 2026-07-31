"use client";

import { useEffect, useMemo, useState } from "react";
import PracticeEngine from "./PracticeEngine";
import Sn1ReactionCanvas, {
  type Sn1PracticeTarget,
} from "./Sn1ReactionCanvas";
import type { PracticeQuestion } from "./PracticeTypes";
import type { MechanismStep } from "./types";

type PlayerMode = "learn" | "practice";

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

const practiceQuestions: PracticeQuestion<Sn1PracticeTarget>[] = [
  {
    id: "identify-tertiary-substrate",
    title: "Which structure is the tertiary substrate?",
    description:
      "Identify the carbon skeleton containing the carbon bonded to bromine.",
    instruction:
      "Click the tert-butyl portion of the substrate.",
    correctTarget: "tertiary-substrate",
    incorrectFeedback:
      "Not quite. Look for the carbon attached to three methyl groups and the leaving group.",
    correctExplanation:
      "tert-Butyl bromide is a tertiary substrate because the carbon bonded to bromine is attached to three carbon groups.",
  },
  {
    id: "identify-ionising-bond",
    title: "Which bond breaks during ionisation?",
    description:
      "The rate-determining step begins when the leaving-group bond breaks heterolytically.",
    instruction:
      "Click the bond whose electrons move onto bromine.",
    correctTarget: "carbon-bromine-bond",
    incorrectFeedback:
      "Not quite. Select the bond between the tertiary carbon and bromine.",
    correctExplanation:
      "The carbon–bromine bond breaks heterolytically, and both bonding electrons move onto bromine.",
  },
  {
    id: "identify-carbocation",
    title: "Which species is the reaction intermediate?",
    description:
      "SN1 reactions contain a discrete, positively charged intermediate.",
    instruction:
      "Click the carbocation intermediate.",
    correctTarget: "carbocation",
    incorrectFeedback:
      "Not quite. Look for the positively charged carbon species.",
    correctExplanation:
      "The tertiary carbocation is the intermediate formed after bromide leaves.",
  },
  {
    id: "identify-nucleophile",
    title: "Which species attacks the carbocation?",
    description:
      "The nucleophile donates a lone pair to the electron-deficient carbon.",
    instruction:
      "Click the water molecule acting as the nucleophile.",
    correctTarget: "water-nucleophile",
    incorrectFeedback:
      "Not quite. Look for the neutral species with a lone pair that can attack the carbocation.",
    correctExplanation:
      "Water acts as the nucleophile by donating a lone pair to the carbocation.",
  },
  {
    id: "identify-base",
    title: "Which species removes the proton?",
    description:
      "The oxonium intermediate must lose a proton to form the neutral alcohol.",
    instruction:
      "Click the water molecule acting as a base.",
    correctTarget: "base-water",
    incorrectFeedback:
      "Not quite. Select the second water molecule that accepts the proton.",
    correctExplanation:
      "A second water molecule acts as a base and removes a proton from the oxonium intermediate.",
  },
  {
    id: "identify-product",
    title: "Which species is the substitution product?",
    description:
      "Identify the neutral alcohol formed after deprotonation.",
    instruction:
      "Click the tert-butanol product.",
    correctTarget: "alcohol-product",
    incorrectFeedback:
      "Not quite. The substitution product is the alcohol formed when OH replaces bromine.",
    correctExplanation:
      "tert-Butanol is the substitution product because the hydroxyl group has replaced bromine.",
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

export default function Sn1MechanismPlayer() {
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
    }, 2800);

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
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">
            Reaction mechanism player
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            SN1 substitution
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Follow ionisation, carbocation formation, nucleophile
            attack, and deprotonation.
          </p>
        </div>

        <button
          type="button"
          aria-pressed={animated}
          onClick={() => setAnimated((value) => !value)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-400"
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
              ? "bg-white text-violet-700 shadow-sm"
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
              ? "bg-white text-violet-700 shadow-sm"
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
            className="h-full rounded-full bg-violet-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {mode === "learn" ? (
        <>
          <Sn1ReactionCanvas
            step={step}
            animated={animated}
          />

          <div
            className="rounded-2xl border border-violet-100 bg-violet-50 p-5"
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
              ? "The correct electron movement is now shown on the reaction diagram."
              : index === steps.length - 1
                ? "You have identified the substitution product."
                : "You have identified the correct species."
          }
          onAnsweredChange={setPracticeAnswered}
          renderCanvas={({ answered, onTargetClick }) => {
            const practiceStep: MechanismStep = {
              ...step,
              arrows: answered ? step.arrows : [],
            };

            return (
              <Sn1ReactionCanvas
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
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
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
            className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <button
          type="button"
          onClick={reset}
          className="text-sm font-semibold text-violet-700 transition hover:text-violet-900"
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