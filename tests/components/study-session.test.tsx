import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LearningEngine, StudySession } from "@/components/learning";
import { resetLearningProgressStoreForTests } from "@/lib/storage/learning-progress";

describe("StudySession", () => {
  beforeEach(() => {
    resetLearningProgressStoreForTests();
  });

  it("marks a lesson complete and persists progress", async () => {
    const user = userEvent.setup();
    render(
      <LearningEngine>
        <StudySession nodeId="lesson:resonance" kind="lesson" title="Resonance" />
      </LearningEngine>,
    );

    await user.click(screen.getByRole("button", { name: /mark lesson complete/i }));

    expect(screen.getByRole("heading", { name: "Completed" })).toBeInTheDocument();
    expect(window.localStorage.getItem("organic-chemistry-hub:learning-progress:v1")).toContain(
      "lesson:resonance",
    );
  });
});
