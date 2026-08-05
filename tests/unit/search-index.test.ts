import { describe, expect, it } from "vitest";
import { searchContent, searchEntries } from "@/components/search";

describe("search index", () => {
  it("includes registry-backed Fundamentals lessons", () => {
    expect(searchEntries.some((entry) => entry.href === "/learn/fundamentals/resonance")).toBe(true);
  });

  it("ranks an exact title match first", () => {
    expect(searchContent("resonance")[0]?.title).toBe("Resonance");
  });

  it("finds chemistry synonyms and keywords", () => {
    expect(searchContent("backside attack")[0]?.href).toBe("/lab/sn2-mechanism");
  });
});
