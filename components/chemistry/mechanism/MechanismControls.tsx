"use client";

import { useEffect, useId, useMemo } from "react";
import type { MechanismCanvasPhase } from "./MechanismCanvas";

export type MechanismPlaybackSpeed = {
  label: string;
  interval: number;
};

export type MechanismControlsProps = {
  stepIndex: number;
  stepCount: number;
  phase: MechanismCanvasPhase;
  playing: boolean;
  playbackInterval: number;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlayback: () => void;
  onReset: () => void;
  onPlaybackIntervalChange?: (interval: number) => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  playDisabled?: boolean;
  resetDisabled?: boolean;
  loop?: boolean;
  keyboardShortcuts?: boolean;
  showProgress?: boolean;
  showSpeedControl?: boolean;
  speedOptions?: readonly MechanismPlaybackSpeed[];
  className?: string;
};

const DEFAULT_SPEED_OPTIONS: readonly MechanismPlaybackSpeed[] = [
  { label: "Slow", interval: 4000 },
  { label: "Normal", interval: 2400 },
  { label: "Fast", interval: 1200 },
] as const;

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

function clampStepIndex(stepIndex: number, stepCount: number): number {
  if (stepCount <= 0) {
    return 0;
  }

  return Math.min(Math.max(Math.trunc(stepIndex), 0), stepCount - 1);
}

function progressPercentage(
  stepIndex: number,
  stepCount: number,
  phase: MechanismCanvasPhase,
): number {
  if (stepCount <= 0) {
    return 0;
  }

  const completedSteps =
    clampStepIndex(stepIndex, stepCount) + (phase === "after" ? 1 : 0.5);

  return Math.min(100, Math.max(0, (completedSteps / stepCount) * 100));
}

function nextButtonLabel(
  stepIndex: number,
  stepCount: number,
  phase: MechanismCanvasPhase,
  loop: boolean,
): string {
  if (phase !== "after") {
    return "Show product";
  }

  if (stepIndex >= stepCount - 1) {
    return loop ? "Restart" : "Complete";
  }

  return "Next step";
}

export default function MechanismControls({
  stepIndex,
  stepCount,
  phase,
  playing,
  playbackInterval,
  onPrevious,
  onNext,
  onTogglePlayback,
  onReset,
  onPlaybackIntervalChange,
  previousDisabled = false,
  nextDisabled = false,
  playDisabled = false,
  resetDisabled = false,
  loop = false,
  keyboardShortcuts = true,
  showProgress = true,
  showSpeedControl = true,
  speedOptions = DEFAULT_SPEED_OPTIONS,
  className,
}: MechanismControlsProps) {
  const speedSelectId = useId();
  const safeStepIndex = clampStepIndex(stepIndex, stepCount);
  const progress = useMemo(
    () => progressPercentage(safeStepIndex, stepCount, phase),
    [phase, safeStepIndex, stepCount],
  );
  const currentSpeed = useMemo(() => {
    const exact = speedOptions.find(
      (option) => option.interval === playbackInterval,
    );

    if (exact) {
      return exact.interval;
    }

    return [...speedOptions].sort(
      (left, right) =>
        Math.abs(left.interval - playbackInterval) -
        Math.abs(right.interval - playbackInterval),
    )[0]?.interval;
  }, [playbackInterval, speedOptions]);

  useEffect(() => {
    if (!keyboardShortcuts || stepCount <= 0) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key === "ArrowLeft" && !previousDisabled) {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (event.key === "ArrowRight" && !nextDisabled) {
        event.preventDefault();
        onNext();
        return;
      }

      if ((event.key === " " || event.key === "k") && !playDisabled) {
        event.preventDefault();
        onTogglePlayback();
        return;
      }

      if (event.key === "Home" && !resetDisabled) {
        event.preventDefault();
        onReset();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    keyboardShortcuts,
    nextDisabled,
    onNext,
    onPrevious,
    onReset,
    onTogglePlayback,
    playDisabled,
    previousDisabled,
    resetDisabled,
    stepCount,
  ]);

  if (stepCount <= 0) {
    return null;
  }

  const nextLabel = nextButtonLabel(
    safeStepIndex,
    stepCount,
    phase,
    loop,
  );

  return (
    <div
      className={className}
      aria-label="Mechanism playback controls"
    >
      {showProgress ? (
        <div className="mb-4" aria-live="polite">
          <div className="mb-2 flex items-center justify-between gap-4 text-sm text-slate-600">
            <span>
              Step {safeStepIndex + 1} of {stepCount}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-label="Mechanism progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full rounded-full bg-blue-600 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={previousDisabled}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-45"
          aria-label="Previous mechanism state"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onTogglePlayback}
          disabled={playDisabled}
          aria-pressed={playing}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {playing ? "Pause" : "Play"}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-45"
          aria-label={nextLabel}
        >
          {nextLabel}
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={resetDisabled}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Reset
        </button>

        {showSpeedControl &&
        onPlaybackIntervalChange &&
        speedOptions.length > 0 ? (
          <div className="ml-auto flex items-center gap-2">
            <label
              htmlFor={speedSelectId}
              className="text-sm font-medium text-slate-600"
            >
              Speed
            </label>
            <select
              id={speedSelectId}
              value={currentSpeed}
              onChange={(event) =>
                onPlaybackIntervalChange(Number(event.target.value))
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              aria-label="Playback speed"
            >
              {speedOptions.map((option) => (
                <option key={option.interval} value={option.interval}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      {keyboardShortcuts ? (
        <p className="mt-3 text-xs text-slate-500">
          Keyboard: Left/Right to navigate, Space or K to play or pause,
          Home to reset.
        </p>
      ) : null}
    </div>
  );
}