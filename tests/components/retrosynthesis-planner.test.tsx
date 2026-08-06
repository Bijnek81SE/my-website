import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RetrosynthesisPlanner } from "@/components/retrosynthesis";

describe("RetrosynthesisPlanner", () => {
  it("shows ranked complete routes and forward validation links", () => {
    render(<RetrosynthesisPlanner />);
    expect(screen.getByRole("heading", { name: "Possible disconnections" })).toBeVisible();
    expect(screen.getAllByText(/1-step complete route/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Validate forward mechanism/i }).length).toBeGreaterThan(0);
  });

  it("changes target problems and reveals a strategic hint", async () => {
    const user = userEvent.setup();
    render(<RetrosynthesisPlanner />);
    await user.selectOptions(screen.getByLabelText("Target problem"), "retro-1-propanol-from-secondary-bromide");
    expect(
  screen.getAllByText(/2-Bromopropane/)[0],
).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Show strategic hint" }));
    expect(screen.getByText(/target alcohol can come from propene/i)).toBeVisible();
  });
});
