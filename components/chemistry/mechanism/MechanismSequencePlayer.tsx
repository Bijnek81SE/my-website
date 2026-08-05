"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SkeletalMoleculeDefinition } from "../skeletal/types";
import MechanismCanvas, {
  type MechanismCanvasPhase,
} from "./MechanismCanvas";
import {
  executeMechanismStep,
  type MechanismExecutionOptions,
  type MechanismExecutionResult,
} from "./MechanismExecutor";
import type { MechanismStepDefinition } from "./MechanismStep";

export type MechanismSequencePlayerProps = {
  molecule: SkeletalMoleculeDefinition;
  steps: readonly MechanismStepDefinition[];
  title?: string;
  description?: string;
  executionOptions?: MechanismExecutionOptions;
  playbackInterval?: number;
  initialStepIndex?: number;
  loop?: boolean;
  showControls?: boolean;
  showProgress?: boolean;
  showStepDetails?: boolean;
  showExecutionIssues?: boolean;
  canvasHeight?: number | string;
  canvasViewBox?: string;
  showCarbons?: boolean;
  animatedArrows?: boolean;
  className?: string;
  onStepChange?: (
    step: MechanismStepDefinition,
    index: number,
  ) => void;
  onSequenceComplete?: (
    molecule: SkeletalMoleculeDefinition,
  ) => void;
};

type SequenceState = {
  startingMolecules: readonly SkeletalMoleculeDefinition[];
  results: readonly MechanismExecutionResult[];
  finalMolecule: SkeletalMoleculeDefinition;
};

function clampStepIndex(
  index: number,
  stepCount: number,
): number {
  if (stepCount === 0) {
    return 0;
  }

  return Math.min(
    Math.max(Math.trunc(index), 0),
    stepCount - 1,
  );
}

function buildSequenceState(
  molecule: SkeletalMoleculeDefinition,
  steps: readonly MechanismStepDefinition[],
  executionOptions?: MechanismExecutionOptions,
): SequenceState {
  const startingMolecules: SkeletalMoleculeDefinition[] = [];
  const results: MechanismExecutionResult[] = [];
  let currentMolecule = molecule;

  for (const step of steps) {
    startingMolecules.push(currentMolecule);

    const result = executeMechanismStep(
      currentMolecule,
      step,
      executionOptions,
    );

    results.push(result);

    if (result.success) {
      currentMolecule = result.molecule;
    }
  }

  return {
    startingMolecules,
    results,
    finalMolecule: currentMolecule,
  };
}

export default function MechanismSequencePlayer({
  molecule,
  steps,
  title = "Reaction mechanism",
  description,
  executionOptions,
  playbackInterval = 2400,
  initialStepIndex = 0,
  loop = false,
  showControls = true,
  showProgress = true,
  showStepDetails = true,
  showExecutionIssues = true,
  canvasHeight = 360,
  canvasViewBox = "0 0 800 360",
  showCarbons = false,
  animatedArrows = true,
  className,
  onStepChange,
  onSequenceComplete,
}: MechanismSequencePlayerProps) {
  const sequence = useMemo(
    () =>
      buildSequenceState(
        molecule,
        steps,
        executionOptions,
      ),
    [executionOptions, molecule, steps],
  );

  const [stepIndex, setStepIndex] = useState(
    () =>
      clampStepIndex(
        initialStepIndex,
        steps.length,
      ),
  );
  const [phase, setPhase] =
    useState<MechanismCanvasPhase>("during");
  const [playing, setPlaying] =
    useState(false);

  const currentStepIndex = clampStepIndex(
    stepIndex,
    steps.length,
  );
  const currentStep = steps[currentStepIndex];
  const currentMolecule =
    sequence.startingMolecules[currentStepIndex] ??
    molecule;
  const currentResult =
    sequence.results[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep =
    steps.length > 0 &&
    currentStepIndex === steps.length - 1;

  const selectStep = useCallback(
    (nextIndex: number) => {
      const clampedIndex = clampStepIndex(
        nextIndex,
        steps.length,
      );

      setStepIndex(clampedIndex);
      setPhase("during");

      const selectedStep = steps[clampedIndex];

      if (selectedStep) {
        onStepChange?.(
          selectedStep,
          clampedIndex,
        );
      }
    },
    [onStepChange, steps],
  );

  const movePrevious = useCallback(() => {
    if (phase === "after") {
      setPhase("during");
      return;
    }

    if (!isFirstStep) {
      selectStep(currentStepIndex - 1);
      setPhase("after");
    }
  }, [currentStepIndex, isFirstStep, phase, selectStep]);

  const moveNext = useCallback(() => {
    if (!currentStep) {
      return;
    }

    if (phase !== "after") {
      setPhase("after");

      if (isLastStep) {
        onSequenceComplete?.(
          sequence.finalMolecule,
        );
      }

      return;
    }

    if (!isLastStep) {
      selectStep(currentStepIndex + 1);
      return;
    }

    if (loop) {
      selectStep(0);
      return;
    }

    setPlaying(false);
  }, [
    currentStep,
    isLastStep,
    loop,
    onSequenceComplete,
    phase,
    selectStep,
    sequence.finalMolecule,
    currentStepIndex,
  ]);

  useEffect(() => {
    if (!playing || steps.length === 0) {
      return;
    }

    const timer = window.setTimeout(
      moveNext,
      Math.max(playbackInterval, 250),
    );

    return () => window.clearTimeout(timer);
  }, [
    moveNext,
    playbackInterval,
    playing,
    steps.length,
  ]);

  const togglePlayback = useCallback(() => {
    if (
      isLastStep &&
      phase === "after" &&
      !loop
    ) {
      selectStep(0);
    }

    setPlaying((current) => !current);
  }, [isLastStep, loop, phase, selectStep]);

  const reset = useCallback(() => {
    setPlaying(false);
    selectStep(
      clampStepIndex(
        initialStepIndex,
        steps.length,
      ),
    );
  }, [initialStepIndex, selectStep, steps.length]);

  if (!currentStep) {
    return (
      <section
        className={className}
        aria-label={title}
      >
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
        <p>No mechanism steps are available.</p>
      </section>
    );
  }

  const requiredIssues =
    currentResult?.issues.filter(
      (issue) => issue.required,
    ) ?? [];

  return (
    <section
      className={className}
      aria-label={title}
    >
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>

      {showProgress ? (
        <div
          role="status"
          aria-live="polite"
        >
          Step {currentStepIndex + 1} of {steps.length}
        </div>
      ) : null}

      <MechanismCanvas
        molecule={currentMolecule}
        step={currentStep}
        phase={phase}
        executionOptions={executionOptions}
        height={canvasHeight}
        viewBox={canvasViewBox}
        showCarbons={showCarbons}
        animatedArrows={animatedArrows && playing}
      />

      {showStepDetails ? (
        <div>
          <h3>{currentStep.title}</h3>
          {currentStep.description ? (
            <p>{currentStep.description}</p>
          ) : null}
          {currentStep.note ? (
            <p>{currentStep.note}</p>
          ) : null}
        </div>
      ) : null}

      {showExecutionIssues &&
      currentResult &&
      !currentResult.success ? (
        <div role="alert">
          <strong>
            This step could not be executed.
          </strong>
          <ul>
            {(requiredIssues.length > 0
              ? requiredIssues
              : currentResult.issues
            ).map((issue) => (
              <li
                key={`${issue.code}-${issue.itemId ?? issue.message}`}
              >
                {issue.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {showControls ? (
        <div aria-label="Mechanism playback controls">
          <button
            type="button"
            onClick={movePrevious}
            disabled={isFirstStep && phase !== "after"}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={togglePlayback}
            aria-pressed={playing}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={moveNext}
            disabled={
              isLastStep &&
              phase === "after" &&
              !loop
            }
          >
            {phase === "after"
              ? isLastStep
                ? "Complete"
                : "Next step"
              : "Show product"}
          </button>
          <button
            type="button"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      ) : null}
    </section>
  );
}