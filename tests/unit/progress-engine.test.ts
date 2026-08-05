import { describe, expect, it } from "vitest";
import {
  EMPTY_LEARNING_PROGRESS,
  getProgressSummary,
  recordLearningActivity,
  recordReview,
} from "@/components/learning/ProgressEngine";

describe("progress engine", () => {
  it("records lesson completion and study streaks", () => {
    const state = recordLearningActivity(EMPTY_LEARNING_PROGRESS, {
      nodeId: "lesson:resonance",
      kind: "lesson",
      title: "Resonance",
      completed: true,
      studiedAt: new Date("2026-01-01T12:00:00Z"),
    });

    expect(state.records["lesson:resonance"].status).toBe("completed");
    expect(state.streak.current).toBe(1);
    expect(getProgressSummary(state)).toEqual({ completed: 1, inProgress: 0, total: 1 });
  });

  it("schedules a review for an existing activity", () => {
    const started = recordLearningActivity(EMPTY_LEARNING_PROGRESS, {
      nodeId: "mechanism:sn2",
      kind: "mechanism",
      title: "SN2 substitution",
      studiedAt: new Date("2026-01-01T12:00:00Z"),
    });
    const reviewed = recordReview(
      started,
      "mechanism:sn2",
      4,
      new Date("2026-01-02T12:00:00Z"),
    );

    expect(reviewed.records["mechanism:sn2"].nextReviewAt).toBeDefined();
    expect(reviewed.records["mechanism:sn2"].attempts).toBe(2);
  });
});
