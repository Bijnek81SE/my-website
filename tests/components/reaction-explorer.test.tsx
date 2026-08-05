import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ReactionExplorer } from "@/components/reactions";

describe("reaction explorer", () => {
  it("filters reactions and compares two pathways", async () => {
    const user = userEvent.setup();
    render(<ReactionExplorer />);

    expect(screen.getByRole("heading", { name: /12 reactions/i })).toBeInTheDocument();

    await user.type(screen.getByRole("searchbox"), "SN2");
    expect(screen.getByRole("heading", { name: "SN2 substitution" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "SN1 substitution" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reset" }));
    const compareButtons = screen.getAllByRole("button", { name: "Compare" });
    await user.click(compareButtons[0]);
    await user.click(compareButtons[1]);

    expect(screen.getByRole("heading", { name: /compare selected reactions/i })).toBeInTheDocument();
    expect(screen.getByText("Regioselectivity")).toBeInTheDocument();
  });

  it("opens reaction details", async () => {
    const user = userEvent.setup();
    render(<ReactionExplorer />);

    await user.click(screen.getAllByRole("button", { name: "View details" })[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /launch mechanism lab/i })).toBeInTheDocument();
  });
});
