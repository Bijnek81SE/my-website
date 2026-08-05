import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LearningEngine, StudyDashboard } from "@/components/learning";
import {
  resetLearningProgressStoreForTests,
  setLearningProgress,
} from "@/lib/storage/learning-progress";
import {
  EMPTY_LEARNING_PROGRESS,
  recordLearningActivity,
} from "@/components/learning/ProgressEngine";

describe("StudyDashboard", () => {
  beforeEach(() => resetLearningProgressStoreForTests());

  it("shows an empty-state recommendation for a new learner", () => {
    render(
      <LearningEngine>
        <StudyDashboard />
      </LearningEngine>,
    );

    expect(
      screen.getByRole("heading", { name: /your course progress/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/what is organic chemistry/i)).toBeInTheDocument();
    expect(screen.getByText(/no study activity yet/i)).toBeInTheDocument();
  });

  it("shows saved progress and can clear it", async () => {
    const user = userEvent.setup();
    setLearningProgress(
      recordLearningActivity(EMPTY_LEARNING_PROGRESS, {
        nodeId: "lesson:resonance",
        kind: "lesson",
        title: "Resonance",
        completed: true,
        studiedAt: new Date("2026-08-05T12:00:00Z"),
      }),
    );
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <LearningEngine>
        <StudyDashboard />
      </LearningEngine>,
    );

    expect(screen.getByText("Resonance")).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /clear local progress/i }),
    );
    expect(screen.getByText(/no study activity yet/i)).toBeInTheDocument();
    confirm.mockRestore();
  });
});
