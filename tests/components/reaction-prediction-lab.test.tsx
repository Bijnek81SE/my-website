import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ReactionPredictionLab } from "@/components/prediction";

describe("ReactionPredictionLab", () => {
  it("scores a complete major-product prediction", async () => {
    const user = userEvent.setup();

    render(<ReactionPredictionLab />);

    await user.click(
      screen.getByRole("radio", {
        name: /^HBr No peroxide/i,
      }),
    );

    await user.click(
      screen.getByRole("radio", {
        name: /2-Bromopropane/i,
      }),
    );

    await user.click(
      screen.getByRole("radio", {
        name: /more stable secondary carbocation/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: "Check prediction",
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "3/3 decisions correct",
      }),
    ).toBeVisible();

    expect(
      screen.getByText(/Markovnikov: bromine appears/i),
    ).toBeVisible();
  });

  it("builds an efficient synthesis route", async () => {
    const user = userEvent.setup();

    render(<ReactionPredictionLab />);

    await user.click(
      screen.getByRole("tab", {
        name: "Plan a synthesis",
      }),
    );

    await user.selectOptions(
      screen.getByLabelText("Target problem"),
      "secondary-bromide-to-primary-alcohol",
    );

    await user.click(
      screen.getByRole("button", {
        name: /Dehydrohalogenation/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /Hydroboration–oxidation/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "Efficient route complete",
      }),
    ).toBeVisible();

    expect(
      screen.getByText(/reached 1-Propanol in 2 steps/i),
    ).toBeVisible();
  });
});