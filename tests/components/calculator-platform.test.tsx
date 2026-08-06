import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  DilutionCalculator,
  MolecularWeightCalculator,
} from "@/components/calculators";

describe("quantitative calculator components", () => {
  it("updates molecular weight from a formula", async () => {
    const user = userEvent.setup();

    render(<MolecularWeightCalculator />);

    const input = screen.getByLabelText("Molecular formula");

    await user.clear(input);
    await user.type(input, "H2O");

    const resultHeading = screen.getByText("Result");

    expect(resultHeading).toBeInTheDocument();
    expect(resultHeading.parentElement).toHaveTextContent(
      "18.0150 g/mol",
    );
  });

  it("solves a dilution with visible steps", () => {
    render(<DilutionCalculator />);

    expect(screen.getByText("10 mL")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Calculation steps",
      }),
    ).toBeInTheDocument();
  });
});