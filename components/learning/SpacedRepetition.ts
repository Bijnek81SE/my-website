export type ReviewGrade = 0 | 1 | 2 | 3 | 4 | 5;

export type ReviewSchedule = {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
};

export const DEFAULT_REVIEW_SCHEDULE: ReviewSchedule = {
  repetitions: 0,
  intervalDays: 0,
  easeFactor: 2.5,
};

const DAY_MS = 24 * 60 * 60 * 1000;

function addDays(date: Date, days: number): string {
  return new Date(date.getTime() + days * DAY_MS).toISOString();
}

export function scheduleReview(
  current: ReviewSchedule,
  grade: ReviewGrade,
  reviewedAt = new Date(),
): ReviewSchedule {
  const failed = grade < 3;
  const repetitions = failed ? 0 : current.repetitions + 1;
  const easeFactor = Math.max(
    1.3,
    current.easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
  );

  let intervalDays: number;
  if (failed) {
    intervalDays = 1;
  } else if (repetitions === 1) {
    intervalDays = 1;
  } else if (repetitions === 2) {
    intervalDays = 6;
  } else {
    intervalDays = Math.max(1, Math.round(current.intervalDays * easeFactor));
  }

  return {
    repetitions,
    intervalDays,
    easeFactor,
    lastReviewedAt: reviewedAt.toISOString(),
    nextReviewAt: addDays(reviewedAt, intervalDays),
  };
}

export function isReviewDue(
  schedule: ReviewSchedule,
  now = new Date(),
): boolean {
  if (!schedule.nextReviewAt) return false;
  return new Date(schedule.nextReviewAt).getTime() <= now.getTime();
}
