import { describe, expect, it } from "vitest";
import {
  DEFAULT_REVIEW_SCHEDULE,
  isReviewDue,
  scheduleReview,
} from "@/components/learning/SpacedRepetition";

describe("spaced repetition", () => {
  it("schedules successful reviews with increasing intervals", () => {
    const first = scheduleReview(DEFAULT_REVIEW_SCHEDULE, 5, new Date("2026-01-01T00:00:00Z"));
    const second = scheduleReview(first, 4, new Date("2026-01-02T00:00:00Z"));
    const third = scheduleReview(second, 4, new Date("2026-01-08T00:00:00Z"));

    expect(first.intervalDays).toBe(1);
    expect(second.intervalDays).toBe(6);
    expect(third.intervalDays).toBeGreaterThan(6);
  });

  it("resets repetitions after a failed review", () => {
    const next = scheduleReview(
      { repetitions: 4, intervalDays: 20, easeFactor: 2.4 },
      2,
      new Date("2026-01-01T00:00:00Z"),
    );

    expect(next.repetitions).toBe(0);
    expect(next.intervalDays).toBe(1);
    expect(isReviewDue(next, new Date("2026-01-03T00:00:00Z"))).toBe(true);
  });
});
