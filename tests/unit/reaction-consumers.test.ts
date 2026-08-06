import { describe, expect, it } from "vitest";
import { getReaction } from "@/content/reactions";
import { retrosynthesisRules } from "@/content/retrosynthesis";
import { predictionChallenges, transformationRules } from "@/content/synthesis";

describe("canonical reaction consumers", () => {
  it("keeps prediction challenges connected to canonical reactions", () => {
    expect(predictionChallenges.every((challenge) => Boolean(getReaction(challenge.reactionId)))).toBe(true);
  });

  it("keeps forward and reverse synthesis rules connected to canonical reactions", () => {
    expect(transformationRules.every((rule) => Boolean(getReaction(rule.reactionId)))).toBe(true);
    expect(retrosynthesisRules.every((rule) => Boolean(getReaction(rule.reactionId)))).toBe(true);
  });
});
