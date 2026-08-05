import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchProvider, useSearch } from "@/components/search";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

function Harness() {
  const { openSearch } = useSearch();
  return <button onClick={openSearch}>Open search</button>;
}

describe("global search dialog", () => {
  it("opens, searches, and navigates to a result", async () => {
    const user = userEvent.setup();

    render(
      <SearchProvider>
        <Harness />
      </SearchProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Open search" }));

    const input = screen.getByRole("combobox", {
      name: /search organic chemistry hub/i,
    });

    await user.type(input, "resonance");
    await user.click(screen.getByRole("option", { name: /Resonance/i }));

    expect(push).toHaveBeenCalledWith("/learn/fundamentals/resonance");
  });

  it("opens with Control+K", async () => {
    const user = userEvent.setup();

    render(
      <SearchProvider>
        <span>Page</span>
      </SearchProvider>,
    );

    await user.keyboard("{Control>}k{/Control}");

    expect(
      screen.getByRole("dialog", {
        name: /search organic chemistry hub/i,
      }),
    ).toBeVisible();
  });
});
