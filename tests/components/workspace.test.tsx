import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { WorkspaceShell } from "@/components/workspace";

describe("Organic Chemistry Workspace", () => {
  it("synchronizes molecule selection and quantitative context", async () => {
    const user = userEvent.setup();
    render(<WorkspaceShell />);

    await user.selectOptions(screen.getByLabelText("Active molecule"), "propene");
    expect(screen.getByRole("heading", { name: "Propene" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Related learning & references" })).toBeVisible();
    expect(screen.getByRole("link", { name: /Bromine/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /Hydroboration–oxidation/i })).toBeVisible();
    expect(screen.queryByText("Open connected reference →")).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Calculations" }));
    expect(screen.getByText(/42\.08/)).toBeVisible();
  });

  it("shows molecule-specific knowledge instead of generic reference buttons", async () => {
    const user = userEvent.setup();
    render(<WorkspaceShell />);

    await user.selectOptions(screen.getByLabelText("Active molecule"), "2-bromopropane");

    expect(screen.getByRole("link", { name: /Open functional-group reference/i })).toHaveAttribute(
      "href",
      "/functional-groups/alkyl-halide",
    );
    expect(screen.getByRole("link", { name: /Hydroxide/i })).toHaveAttribute("href", "/reagents/hydroxide");
    expect(screen.getByRole("link", { name: /SN1 mechanism/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /E2 elimination/i })).toBeVisible();
  });

  it("persists notes in the workspace UI", async () => {
    const user = userEvent.setup();
    render(<WorkspaceShell />);
    await user.click(screen.getByRole("tab", { name: "Notes" }));
    await user.type(screen.getByLabelText("Workspace notes"), "Triplet integrates to three protons.");
    expect(screen.getByDisplayValue(/Triplet integrates/)).toBeVisible();
  });
});
