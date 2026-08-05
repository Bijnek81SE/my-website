"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getLearningProgressServerSnapshot,
  getLearningProgressSnapshot,
  hydrateLearningProgress,
  setLearningProgress,
  subscribeToLearningProgress,
  clearLearningProgress,
} from "@/lib/storage/learning-progress";
import {
  recordLearningActivity,
  recordReview as applyReview,
  type LearningItemKind,
  type LearningProgressState,
} from "./ProgressEngine";
import type { ReviewGrade } from "./SpacedRepetition";

type LearningContextValue = {
  progress: LearningProgressState;
  markActivity: (input: {
    nodeId: string;
    kind: LearningItemKind;
    title: string;
    completed?: boolean;
  }) => void;
  review: (nodeId: string, grade: ReviewGrade) => void;
  clear: () => void;
};

const LearningContext = createContext<LearningContextValue | null>(null);

export default function LearningEngine({ children }: { children: ReactNode }) {
  const progress = useSyncExternalStore(
    subscribeToLearningProgress,
    getLearningProgressSnapshot,
    getLearningProgressServerSnapshot,
  );

  useEffect(() => {
    hydrateLearningProgress();
  }, []);

  const markActivity = useCallback<LearningContextValue["markActivity"]>((input) => {
    setLearningProgress(recordLearningActivity(getLearningProgressSnapshot(), input));
  }, []);

  const review = useCallback((nodeId: string, grade: ReviewGrade) => {
    setLearningProgress(applyReview(getLearningProgressSnapshot(), nodeId, grade));
  }, []);

  const value = useMemo(
    () => ({ progress, markActivity, review, clear: clearLearningProgress }),
    [markActivity, progress, review],
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearningProgress(): LearningContextValue {
  const context = useContext(LearningContext);
  if (!context) throw new Error("useLearningProgress must be used inside LearningEngine.");
  return context;
}
