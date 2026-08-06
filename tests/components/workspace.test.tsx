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

    await user.click(screen.getByRole("tab", { name: "Calculations" }));
    expect(screen.getByText(/42\.08/)).toBeVisible();
  });

  it("persists notes in the workspace UI", async () => {
    const user = userEvent.setup();
    render(<WorkspaceShell />);
    await user.click(screen.getByRole("tab", { name: "Notes" }));
    await user.type(screen.getByLabelText("Workspace notes"), "Triplet integrates to three protons.");
    expect(screen.getByDisplayValue(/Triplet integrates/)).toBeVisible();
  });
});
