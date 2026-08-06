import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SpectroscopyLab } from "@/components/spectroscopy";

describe("SpectroscopyLab", () => {
  it("links a selected signal to its structure assignment", async () => {
    const user = userEvent.setup();

    render(<SpectroscopyLab />);

    await user.click(
      screen.getByRole("button", {
        name: /CH₃ triplet: select assignment/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "CH₃ triplet",
      }),
    ).toBeVisible();

    expect(
      screen.getByText(/two adjacent CH₂ protons/i),
    ).toBeVisible();
  });

  it("switches between NMR, IR, and mass techniques", async () => {
    const user = userEvent.setup();

    render(<SpectroscopyLab />);

    await user.click(
      screen.getByRole("tab", {
        name: /^IR\b/,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /IR — Ethanol/i,
      }),
    ).toBeVisible();

    await user.click(
      screen.getByRole("tab", {
        name: /^MS\b/,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /Mass spectrum — Ethanol/i,
      }),
    ).toBeVisible();
  });
});