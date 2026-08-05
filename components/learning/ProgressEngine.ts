import {
  DEFAULT_REVIEW_SCHEDULE,
  scheduleReview,
  type ReviewGrade,
  type ReviewSchedule,
} from "./SpacedRepetition";

export type LearningItemKind = "lesson" | "mechanism";
export type LearningItemStatus = "in-progress" | "completed";

export type LearningProgressRecord = ReviewSchedule & {
  nodeId: string;
  kind: LearningItemKind;
  title: string;
  status: LearningItemStatus;
  attempts: number;
  completedAt?: string;
  lastStudiedAt: string;
};

export type LearningStreak = {
  current: number;
  longest: number;
  lastStudyDate?: string;
};

export type LearningProgressState = {
  version: 1;
  records: Record<string, LearningProgressRecord>;
  streak: LearningStreak;
};

export const EMPTY_LEARNING_PROGRESS: LearningProgressState = {
  version: 1,
  records: {},
  streak: { current: 0, longest: 0 },
};

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function previousDateKey(date: Date): string {
  const previous = new Date(date);
  previous.setUTCDate(previous.getUTCDate() - 1);
  return dateKey(previous);
}

export function updateStreak(
  streak: LearningStreak,
  studiedAt = new Date(),
): LearningStreak {
  const today = dateKey(studiedAt);
  if (streak.lastStudyDate === today) return streak;

  const current =
    streak.lastStudyDate === previousDateKey(studiedAt)
      ? streak.current + 1
      : 1;

  return {
    current,
    longest: Math.max(streak.longest, current),
    lastStudyDate: today,
  };
}

export function recordLearningActivity(
  state: LearningProgressState,
  input: {
    nodeId: string;
    kind: LearningItemKind;
    title: string;
    completed?: boolean;
    studiedAt?: Date;
  },
): LearningProgressState {
  const studiedAt = input.studiedAt ?? new Date();
  const existing = state.records[input.nodeId];
  const completed = input.completed || existing?.status === "completed";

  const record: LearningProgressRecord = {
    ...DEFAULT_REVIEW_SCHEDULE,
    ...existing,
    nodeId: input.nodeId,
    kind: input.kind,
    title: input.title,
    status: completed ? "completed" : "in-progress",
    attempts: (existing?.attempts ?? 0) + 1,
    lastStudiedAt: studiedAt.toISOString(),
    completedAt: completed
      ? existing?.completedAt ?? studiedAt.toISOString()
      : undefined,
  };

  return {
    ...state,
    records: { ...state.records, [input.nodeId]: record },
    streak: updateStreak(state.streak, studiedAt),
  };
}

export function recordReview(
  state: LearningProgressState,
  nodeId: string,
  grade: ReviewGrade,
  reviewedAt = new Date(),
): LearningProgressState {
  const existing = state.records[nodeId];
  if (!existing) return state;

  return {
    ...state,
    records: {
      ...state.records,
      [nodeId]: {
        ...existing,
        ...scheduleReview(existing, grade, reviewedAt),
        attempts: existing.attempts + 1,
        lastStudiedAt: reviewedAt.toISOString(),
      },
    },
    streak: updateStreak(state.streak, reviewedAt),
  };
}

export function getCompletedNodeIds(
  state: LearningProgressState,
): readonly string[] {
  return Object.values(state.records)
    .filter((record) => record.status === "completed")
    .map((record) => record.nodeId);
}

export function getDueReviewRecords(
  state: LearningProgressState,
  now = new Date(),
): readonly LearningProgressRecord[] {
  return Object.values(state.records)
    .filter(
      (record) =>
        Boolean(record.nextReviewAt) &&
        new Date(record.nextReviewAt as string).getTime() <= now.getTime(),
    )
    .sort((left, right) =>
      (left.nextReviewAt ?? "").localeCompare(right.nextReviewAt ?? ""),
    );
}

export function getProgressSummary(state: LearningProgressState): {
  completed: number;
  inProgress: number;
  total: number;
} {
  const records = Object.values(state.records);
  return {
    completed: records.filter((record) => record.status === "completed").length,
    inProgress: records.filter((record) => record.status === "in-progress").length,
    total: records.length,
  };
}
