import { describe, expect, it } from "vitest";
import { findReactionByNameOrAlias, getReaction, getReactionFamilies, reactions, selectReactions } from "@/content/reactions";

describe("canonical reaction registry", () => {
  it("contains unique mechanism-backed reactions", () => {
    expect(reactions.length).toBeGreaterThanOrEqual(17);
    expect(new Set(reactions.map((reaction) => reaction.id)).size).toBe(reactions.length);
    expect(reactions.every((reaction) => reaction.mechanismHref.startsWith("/lab/"))).toBe(true);
  });

  it("resolves stable ids, titles, short titles, and aliases", () => {
    expect(getReaction("sn1")?.mechanismClass).toBe("Carbocation");
    expect(findReactionByNameOrAlias("SN2")?.id).toBe("sn2");
    expect(findReactionByNameOrAlias("peroxide effect")?.id).toBe("radical-hbr");
  });

  it("supports indexed, reusable explorer selectors", () => {
    expect(getReactionFamilies()).toContain("Alkene addition");
    expect(selectReactions({ query: "anti markovnikov" }).map((reaction) => reaction.id)).toEqual(expect.arrayContaining(["hydroboration-oxidation", "radical-hbr"]));
    expect(selectReactions({ family: "Substitution" }).every((reaction) => reaction.family === "Substitution")).toBe(true);
  });

  it("distinguishes Markovnikov and anti-Markovnikov hydration", () => {
    expect(getReaction("hydration")?.selectivity.regioselectivity).toBe("Markovnikov");
    expect(getReaction("hydroboration-oxidation")?.selectivity.regioselectivity).toBe("Anti-Markovnikov");
  });
});
