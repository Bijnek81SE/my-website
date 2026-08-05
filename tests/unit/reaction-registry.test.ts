import { describe, expect, it } from "vitest";
import { getReaction, reactions } from "@/content/reactions";

describe("reaction registry", () => {
  it("contains unique mechanism-backed reactions", () => {
    expect(reactions.length).toBe(12);
    expect(new Set(reactions.map((reaction) => reaction.id)).size).toBe(reactions.length);
    expect(reactions.every((reaction) => reaction.mechanismHref.startsWith("/lab/"))).toBe(true);
  });

  it("captures the main SN1 and SN2 distinction", () => {
    expect(getReaction("sn1")?.mechanismClass).toBe("Carbocation");
    expect(getReaction("sn1")?.steps).toBe("Stepwise");
    expect(getReaction("sn2")?.mechanismClass).toBe("Concerted");
    expect(getReaction("sn2")?.selectivity.stereochemistry).toMatch(/inversion/i);
  });

  it("distinguishes Markovnikov and anti-Markovnikov hydration", () => {
    expect(getReaction("hydration")?.selectivity.regioselectivity).toBe("Markovnikov");
    expect(getReaction("hydroboration-oxidation")?.selectivity.regioselectivity).toBe("Anti-Markovnikov");
  });
});
