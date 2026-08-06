import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RelatedConcepts } from "@/components/knowledge";

describe("knowledge connections", () => {
  it("renders linked concepts for a mechanism", () => {
    render(<RelatedConcepts nodeId="mechanism:sn2" />);

    expect(
      screen.getByRole("heading", {
        name: "Apply this mechanism",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /curved arrow designer/i,
      }),
    ).toHaveAttribute(
      "href",
      "/lab/curved-arrow-designer",
    );
  });
});