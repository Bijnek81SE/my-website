import {
  EMPTY_LEARNING_PROGRESS,
  type LearningProgressState,
} from "@/components/learning/ProgressEngine";

const STORAGE_KEY = "organic-chemistry-hub:learning-progress:v1";
const listeners = new Set<() => void>();
let snapshot: LearningProgressState = EMPTY_LEARNING_PROGRESS;
let hydrated = false;

function emit(): void {
  for (const listener of listeners) listener();
}

function isProgressState(value: unknown): value is LearningProgressState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<LearningProgressState>;
  return candidate.version === 1 && Boolean(candidate.records) && Boolean(candidate.streak);
}

export function hydrateLearningProgress(): void {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (isProgressState(parsed)) snapshot = parsed;
    }
  } catch {
    snapshot = EMPTY_LEARNING_PROGRESS;
  }

  emit();
}

export function getLearningProgressSnapshot(): LearningProgressState {
  return snapshot;
}

export function getLearningProgressServerSnapshot(): LearningProgressState {
  return EMPTY_LEARNING_PROGRESS;
}

export function subscribeToLearningProgress(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setLearningProgress(next: LearningProgressState): void {
  snapshot = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Progress remains available for the current session when storage is unavailable.
    }
  }
  emit();
}

export function clearLearningProgress(): void {
  snapshot = EMPTY_LEARNING_PROGRESS;
  hydrated = true;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore unavailable browser storage.
    }
  }
  emit();
}

export function resetLearningProgressStoreForTests(): void {
  snapshot = EMPTY_LEARNING_PROGRESS;
  hydrated = false;
  listeners.clear();
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore unavailable browser storage.
    }
  }
}
