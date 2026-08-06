import { describe, expect, it } from "vitest";
import { reactions, validateReactions, type ReactionDefinition } from "@/content/reactions";

describe("reaction registry validation", () => {
  it("accepts the canonical reaction catalog", () => {
    expect(validateReactions(reactions)).toEqual([]);
  });

  it("rejects broken relationships and duplicate aliases", () => {
    const first = reactions[0];
    const invalid: ReactionDefinition = {
      ...first, id: "invalid-reaction", title: "SN2", shortTitle: "Invalid", aliases: [], featureId: "missing-feature", mechanismHref: "/lab/missing", reagentIds: ["missing-reagent"], relatedReactionIds: ["missing-reaction"], prerequisiteNodeIds: ["lesson:missing"],
    };
    const codes = validateReactions([...reactions, invalid]).map((issue) => issue.code);
    expect(codes).toEqual(expect.arrayContaining(["duplicate-alias", "missing-feature", "missing-reagent", "missing-related-reaction", "missing-prerequisite"]));
  });
});
