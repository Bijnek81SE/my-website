import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RelationshipSection } from "@/components/relationships";

describe("RelationshipSection", () => {
  it("renders chemistry-specific context and rationale", () => {
    render(
      <RelationshipSection
        presentationId="reagent:typical-reactions"
        items={[{ id: "e2", label: "E2 elimination", description: "The bulky strong base removes a beta proton while the leaving group departs.", href: "/reactions" }]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Typical reactions" })).toBeVisible();
    expect(screen.getByText(/reactions in which this reagent is commonly used/i)).toBeVisible();
    expect(screen.getByRole("link", { name: /E2 elimination/i })).toBeVisible();
  });
});
