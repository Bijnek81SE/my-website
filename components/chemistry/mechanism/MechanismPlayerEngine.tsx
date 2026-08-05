"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import PracticeEngine from "./PracticeEngine";
import { Prerequisites, RelatedConcepts } from "@/components/knowledge";
import type { ReactionDataDefinition } from "./ReactionDataEngine";
import { assertValidMechanismDefinition } from "./MechanismValidationEngine";
import type {
  PracticeQuestion,
  PracticeSessionMode,
} from "./PracticeTypes";

export type MechanismPlayerMode = "learn" | PracticeSessionMode;

export type MechanismPlayerStep = {
  id: string;
  title: string;
  description: string;
};

type CanvasRenderState<
  TStep extends MechanismPlayerStep,
  TTarget extends string,
> = {
  step: TStep;
  index: number;
  mode: MechanismPlayerMode;
  animated: boolean;
  answered: boolean;
  interactive: boolean;
  onTargetClick?: (target: TTarget) => void;
};

type Accent = "blue" | "violet" | "orange" | "emerald" | "rose" | "cyan";

export type MechanismPlayerEngineProps<
  TStep extends MechanismPlayerStep,
  TTarget extends string,
> = {
  title: string;
  description: string;
  accent: Accent;
  steps: TStep[];
  questions: PracticeQuestion<TTarget>[];
  playbackInterval?: number;
  getRevealMessage: (step: TStep, index: number) => string;
  renderCanvas: (
    state: CanvasRenderState<TStep, TTarget>,
  ) => ReactNode;
  validation: {
    id: string;
    reactionData: ReactionDataDefinition<TTarget>;
    getSceneForStep: (step: TStep, index: number) => string;
  };
};

const accentClasses = {
  blue: {
    text: "text-blue-700",
    hoverBorder: "hover:border-blue-400",
    progress: "bg-blue-600",
    panelBorder: "border-blue-100",
    panelBackground: "bg-blue-50",
    resetHover: "hover:text-blue-900",
  },
  violet: {
    text: "text-violet-700",
    hoverBorder: "hover:border-violet-400",
    progress: "bg-violet-600",
    panelBorder: "border-violet-100",
    panelBackground: "bg-violet-50",
    resetHover: "hover:text-violet-900",
  },
  orange: {
    text: "text-orange-700",
    hoverBorder: "hover:border-orange-400",
    progress: "bg-orange-600",
    panelBorder: "border-orange-100",
    panelBackground: "bg-orange-50",
    resetHover: "hover:text-orange-900",
  },
  emerald: {
    text: "text-emerald-700",
    hoverBorder: "hover:border-emerald-400",
    progress: "bg-emerald-600",
    panelBorder: "border-emerald-100",
    panelBackground: "bg-emerald-50",
    resetHover: "hover:text-emerald-900",
  },
  rose: {
    text: "text-rose-700",
    hoverBorder: "hover:border-rose-400",
    progress: "bg-rose-600",
    panelBorder: "border-rose-100",
    panelBackground: "bg-rose-50",
    resetHover: "hover:text-rose-900",
  },
  cyan: {
    text: "text-cyan-700",
    hoverBorder: "hover:border-cyan-400",
    progress: "bg-cyan-600",
    panelBorder: "border-cyan-100",
    panelBackground: "bg-cyan-50",
    resetHover: "hover:text-cyan-900",
  },
} as const;

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

export default function MechanismPlayerEngine<
  TStep extends MechanismPlayerStep,
  TTarget extends string,
>({
  title,
  description,
  accent,
  steps,
  questions,
  playbackInterval = 2800,
  getRevealMessage,
  renderCanvas,
  validation,
}: MechanismPlayerEngineProps<TStep, TTarget>) {
  useMemo(
    () =>
      assertValidMechanismDefinition({
        id: validation.id,
        title,
        steps,
        questions,
        reactionData: validation.reactionData,
        getSceneForStep: validation.getSceneForStep,
      }),
    [questions, steps, title, validation],
  );
  const [mode, setMode] = useState<MechanismPlayerMode>("learn");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [answeredStepIndex, setAnsweredStepIndex] = useState<number | null>(null);
  const [sessionKey, setSessionKey] = useState(0);

  const classes = accentClasses[accent];
  const step = steps[index];
  const isLearnMode = mode === "learn";
  const isExamMode = mode === "exam";
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const sessionAnswered = answeredStepIndex === index;

  const progress = useMemo(
    () => Math.round(((index + 1) / steps.length) * 100),
    [index, steps.length],
  );

  useEffect(() => {
    if (!playing || !isLearnMode) {
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
    }, playbackInterval);

    return () => window.clearInterval(timer);
  }, [isLearnMode, playbackInterval, playing, steps.length]);


  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        if (isExamMode) {
          return;
        }

        setPlaying(false);
        setIndex((current) => Math.max(0, current - 1));
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        if (!isLearnMode && !sessionAnswered) {
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

        if (isExamMode) {
          return;
        }

        setPlaying(false);
        setIndex(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();

        if (!isLearnMode) {
          return;
        }

        setPlaying(false);
        setIndex(steps.length - 1);
        return;
      }

      if (event.key === " " && isLearnMode) {
        event.preventDefault();

        setPlaying((currentPlaying) => {
          if (currentPlaying) {
            return false;
          }

          setIndex((currentIndex) =>
            currentIndex === steps.length - 1 ? 0 : currentIndex,
          );

          return true;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExamMode, isLearnMode, sessionAnswered, steps.length]);

  function changeMode(nextMode: MechanismPlayerMode) {
    setPlaying(false);
    setIndex(0);
    setAnsweredStepIndex(null);
    setMode(nextMode);
    setSessionKey((current) => current + 1);
  }

  function previous() {
    if (isExamMode) {
      return;
    }

    setPlaying(false);
    setIndex((current) => Math.max(0, current - 1));
  }

  function next() {
    if (!isLearnMode && !sessionAnswered) {
      return;
    }

    setPlaying(false);
    setIndex((current) => Math.min(steps.length - 1, current + 1));
  }

  function reset() {
    setPlaying(false);
    setIndex(0);
    setAnsweredStepIndex(null);
    setSessionKey((current) => current + 1);
  }

  function retryExam() {
    setPlaying(false);
    setIndex(0);
    setAnsweredStepIndex(null);
  }

  function togglePlayback() {
    if (!isLearnMode) {
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
          <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${classes.text}`}>
            Reaction mechanism player
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            {title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <button
          type="button"
          aria-pressed={animated}
          onClick={() => setAnimated((value) => !value)}
          className={`rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition ${classes.hoverBorder}`}
        >
          Arrow animation: {animated ? "On" : "Off"}
        </button>
      </div>

      <div
        className="inline-flex flex-wrap rounded-xl border border-slate-200 bg-slate-100 p-1"
        role="group"
        aria-label="Mechanism player mode"
      >
        {(["learn", "practice", "exam"] as MechanismPlayerMode[]).map(
          (playerMode) => (
            <button
              key={playerMode}
              type="button"
              aria-pressed={mode === playerMode}
              onClick={() => changeMode(playerMode)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                mode === playerMode
                  ? `bg-white shadow-sm ${classes.text}`
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              {playerMode}
            </button>
          ),
        )}
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
            className={`h-full rounded-full transition-all duration-500 ${classes.progress}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {isLearnMode ? (
        <>
          {renderCanvas({
            step,
            index,
            mode,
            animated,
            answered: false,
            interactive: false,
          })}

          <div
            className={`rounded-2xl border p-5 ${classes.panelBorder} ${classes.panelBackground}`}
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
          key={sessionKey}
          mechanismId={validation.id}
          mechanismTitle={title}
          questions={questions}
          currentIndex={index}
          stepDescription={step.description}
          sessionMode={mode}
          revealMessage={getRevealMessage(step, index)}
          onRetryExam={retryExam}
          onAnsweredChange={(answered) =>
            setAnsweredStepIndex(answered ? index : null)
          }
          renderCanvas={({ answered, onTargetClick }) =>
            renderCanvas({
              step,
              index,
              mode,
              animated,
              answered,
              interactive: !answered,
              onTargetClick,
            })
          }
        />
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Prerequisites nodeId={`mechanism:${validation.id}`} />
        <RelatedConcepts nodeId={`mechanism:${validation.id}`} />
      </div>

      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <span className="font-semibold text-slate-800">Keyboard:</span>{" "}
        {isLearnMode
          ? "← previous, → next, Space play/pause, Home first step, End last step"
          : isExamMode
            ? "→ next after answering"
            : "← previous, → next, Home first step"}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={previous}
            disabled={isFirst || isExamMode}
            className={`rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-40 ${classes.hoverBorder}`}
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={togglePlayback}
            disabled={!isLearnMode}
            className="rounded-xl bg-slate-950 px-5 py-2 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLearnMode
              ? playing
                ? "Pause"
                : isLast
                  ? "Replay"
                  : "Play"
              : isExamMode
                ? "Exam active"
                : "Practice active"}
          </button>

          <button
            type="button"
            onClick={next}
            disabled={isLast || (!isLearnMode && !sessionAnswered)}
            className={`rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-40 ${classes.hoverBorder}`}
          >
            Next →
          </button>
        </div>

        <button
          type="button"
          onClick={reset}
          className={`text-sm font-semibold transition ${classes.text} ${classes.resetHover}`}
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
