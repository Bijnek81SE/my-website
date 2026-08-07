import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LearningEngine } from "@/components/learning";
import { GeneratedMechanismPlayer } from "@/components/chemistry/mechanism/authoring";
import { mechanismAuthoringExamples } from "@/content/mechanisms/authoring";

function renderWithLearningEngine(
  ui: React.ReactNode,
) {
  return render(
    <LearningEngine>
      {ui}
    </LearningEngine>,
  );
}

describe("generated mechanism player experiment", () => {
  it("renders compiled SN2 through the existing mechanism player", async () => {
    const user = userEvent.setup();
    const definition =
      mechanismAuthoringExamples.sn2;

    expect(definition).toBeDefined();

    if (!definition) {
      return;
    }

    renderWithLearningEngine(
      <GeneratedMechanismPlayer
        definition={definition}
      />,
    );

    expect(
  screen.getByRole("heading", {
    name: "SN2 substitution",
    level: 2,
  }),
).toBeVisible();

    expect(
      screen.getByText("Step 1 of 4"),
    ).toBeVisible();

    expect(
      screen.getByRole("img", {
        name: /SN2 mechanism/i,
      }),
    ).toBeVisible();

    await user.click(
      screen.getByRole("button", {
        name: "Next →",
      }),
    );

    expect(
      screen.getByText("Step 2 of 4"),
    ).toBeVisible();
  });

  it("renders compiled E2 with the trusted anti-periplanar canvas", () => {
    const definition =
      mechanismAuthoringExamples.e2;

    expect(definition).toBeDefined();

    if (!definition) {
      return;
    }

    renderWithLearningEngine(
      <GeneratedMechanismPlayer
        definition={definition}
      />,
    );

    expect(
  screen.getByRole("heading", {
    name: "E2 elimination",
    level: 2,
  }),
).toBeVisible();

    expect(
      screen.getByText(
        /β-H and Br are anti-periplanar/i,
      ),
    ).toBeVisible();

    expect(
      screen.getByRole("img", {
        name: /E2 mechanism/i,
      }),
    ).toBeVisible();
  });

  it("renders compiled alkene halogenation through the trusted bromonium canvas", async () => {
    const user = userEvent.setup();
    const definition = mechanismAuthoringExamples.halogenation;

    expect(definition).toBeDefined();
    if (!definition) return;

    renderWithLearningEngine(
      <GeneratedMechanismPlayer definition={definition} />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Halogenation of alkenes",
        level: 2,
      }),
    ).toBeVisible();
    expect(screen.getByText("Step 1 of 5")).toBeVisible();
    expect(
      screen.getByRole("img", { name: /Halogenation mechanism/i }),
    ).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Next →" }));
    expect(screen.getByText("Step 2 of 5")).toBeVisible();
  });

});