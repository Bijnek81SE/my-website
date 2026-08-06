import { describe, expect, it } from "vitest";
import { mechanisms, validateMechanisms } from "@/content/mechanisms";

describe("mechanism validation", () => {
  it("accepts the canonical registry", () => {
    expect(validateMechanisms(mechanisms)).toEqual([]);
  });

  it("rejects duplicate ids and broken reaction links", () => {
    const invalid = [
      mechanisms[0],
      { ...mechanisms[1], id: mechanisms[0].id, reactionId: "missing-reaction" },
    ];
    const codes = validateMechanisms(invalid).map((issue) => issue.code);
    expect(codes).toContain("duplicate-id");
    expect(codes).toContain("missing-reaction");
  });
});
