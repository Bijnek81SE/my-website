import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AccessibleChemistryFigure from "@/components/chemistry/graphics/AccessibleChemistryFigure";

describe("AccessibleChemistryFigure", () => {
  it("provides an accessible graphic name and caption", () => {
    render(<AccessibleChemistryFigure title="Methane" description="A tetrahedral carbon atom" caption="CH4 structure"><svg /></AccessibleChemistryFigure>);
    expect(screen.getByRole("img", { name: /Methane/ })).toBeInTheDocument();
    expect(screen.getByText("CH4 structure")).toBeInTheDocument();
  });
});
