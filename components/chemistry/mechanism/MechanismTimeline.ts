import type { MechanismCanvasPhase } from "./MechanismCanvas";

export type MechanismTimelineState = {
  stepIndex: number;
  phase: MechanismCanvasPhase;
  playing: boolean;
};

export type MechanismTimelineSnapshot = MechanismTimelineState & {
  stepCount: number;
  stateIndex: number;
  stateCount: number;
  progress: number;
  isEmpty: boolean;
  isAtStart: boolean;
  isAtEnd: boolean;
  canMovePrevious: boolean;
  canMoveNext: boolean;
  completedStepCount: number;
};

export type MechanismTimelineInput = {
  stepCount: number;
  initialStepIndex?: number;
  initialPhase?: MechanismCanvasPhase;
  playing?: boolean;
};

function normalizeStepCount(stepCount: number): number {
  if (!Number.isFinite(stepCount)) {
    return 0;
  }

  return Math.max(0, Math.trunc(stepCount));
}

export function clampMechanismStepIndex(
  stepIndex: number,
  stepCount: number,
): number {
  const normalizedStepCount = normalizeStepCount(stepCount);

  if (normalizedStepCount === 0 || !Number.isFinite(stepIndex)) {
    return 0;
  }

  return Math.min(
    Math.max(Math.trunc(stepIndex), 0),
    normalizedStepCount - 1,
  );
}

export function createMechanismTimeline(
  input: MechanismTimelineInput,
): MechanismTimelineState {
  const stepCount = normalizeStepCount(input.stepCount);

  return {
    stepIndex: clampMechanismStepIndex(
      input.initialStepIndex ?? 0,
      stepCount,
    ),
    phase: stepCount === 0 ? "during" : input.initialPhase ?? "during",
    playing: stepCount > 0 && Boolean(input.playing),
  };
}

export function getMechanismTimelineSnapshot(
  state: MechanismTimelineState,
  stepCount: number,
): MechanismTimelineSnapshot {
  const normalizedStepCount = normalizeStepCount(stepCount);
  const stepIndex = clampMechanismStepIndex(
    state.stepIndex,
    normalizedStepCount,
  );
  const phase = normalizedStepCount === 0 ? "during" : state.phase;
  const isEmpty = normalizedStepCount === 0;
  const stateCount = normalizedStepCount * 2;
  const stateIndex = isEmpty
    ? 0
    : stepIndex * 2 + (phase === "after" ? 1 : 0);
  const completedStepCount = isEmpty
    ? 0
    : stepIndex + (phase === "after" ? 1 : 0);
  const isAtStart = isEmpty || (stepIndex === 0 && phase === "during");
  const isAtEnd =
    !isEmpty &&
    stepIndex === normalizedStepCount - 1 &&
    phase === "after";

  return {
    stepIndex,
    phase,
    playing: !isEmpty && state.playing,
    stepCount: normalizedStepCount,
    stateIndex,
    stateCount,
    progress: isEmpty ? 0 : (stateIndex + 1) / stateCount,
    isEmpty,
    isAtStart,
    isAtEnd,
    canMovePrevious: !isAtStart,
    canMoveNext: !isEmpty,
    completedStepCount,
  };
}

export function setMechanismTimelineStep(
  state: MechanismTimelineState,
  stepIndex: number,
  stepCount: number,
  phase: MechanismCanvasPhase = "during",
): MechanismTimelineState {
  const normalizedStepCount = normalizeStepCount(stepCount);

  if (normalizedStepCount === 0) {
    return createMechanismTimeline({ stepCount: 0 });
  }

  return {
    ...state,
    stepIndex: clampMechanismStepIndex(stepIndex, normalizedStepCount),
    phase,
  };
}

export function moveMechanismTimelinePrevious(
  state: MechanismTimelineState,
  stepCount: number,
): MechanismTimelineState {
  const snapshot = getMechanismTimelineSnapshot(state, stepCount);

  if (!snapshot.canMovePrevious) {
    return {
      ...state,
      stepIndex: snapshot.stepIndex,
      phase: snapshot.phase,
    };
  }

  if (snapshot.phase === "after") {
    return {
      ...state,
      stepIndex: snapshot.stepIndex,
      phase: "during",
    };
  }

  return {
    ...state,
    stepIndex: snapshot.stepIndex - 1,
    phase: "after",
  };
}

export function moveMechanismTimelineNext(
  state: MechanismTimelineState,
  stepCount: number,
  loop = false,
): MechanismTimelineState {
  const snapshot = getMechanismTimelineSnapshot(state, stepCount);

  if (snapshot.isEmpty) {
    return createMechanismTimeline({ stepCount: 0 });
  }

  if (snapshot.phase === "during") {
    return {
      ...state,
      stepIndex: snapshot.stepIndex,
      phase: "after",
    };
  }

  if (snapshot.stepIndex < snapshot.stepCount - 1) {
    return {
      ...state,
      stepIndex: snapshot.stepIndex + 1,
      phase: "during",
    };
  }

  if (loop) {
    return {
      ...state,
      stepIndex: 0,
      phase: "during",
    };
  }

  return {
    ...state,
    stepIndex: snapshot.stepIndex,
    phase: "after",
    playing: false,
  };
}

export function resetMechanismTimeline(
  stepCount: number,
  initialStepIndex = 0,
): MechanismTimelineState {
  return createMechanismTimeline({
    stepCount,
    initialStepIndex,
  });
}

export function setMechanismTimelinePlaying(
  state: MechanismTimelineState,
  playing: boolean,
  stepCount: number,
): MechanismTimelineState {
  const snapshot = getMechanismTimelineSnapshot(state, stepCount);

  return {
    ...state,
    stepIndex: snapshot.stepIndex,
    phase: snapshot.phase,
    playing: !snapshot.isEmpty && playing,
  };
}

export function toggleMechanismTimelinePlaying(
  state: MechanismTimelineState,
  stepCount: number,
  loop = false,
): MechanismTimelineState {
  const snapshot = getMechanismTimelineSnapshot(state, stepCount);

  if (snapshot.isEmpty) {
    return createMechanismTimeline({ stepCount: 0 });
  }

  if (snapshot.isAtEnd && !loop) {
    return {
      stepIndex: 0,
      phase: "during",
      playing: true,
    };
  }

  return {
    ...state,
    stepIndex: snapshot.stepIndex,
    phase: snapshot.phase,
    playing: !snapshot.playing,
  };
}