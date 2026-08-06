import { describe, expect, it } from "vitest";
import { reagents, validateReagents, type ReagentDefinition } from "@/content/reagents";

 describe("canonical reagent validation", () => {
  it("accepts the published reagent registry", () => {
    expect(validateReagents(reagents)).toEqual([]);
  });

  it("rejects duplicate and broken reagent records", () => {
    const first = reagents[0];
    const invalid: ReagentDefinition = {
      ...first,
      id: "invalid-reagent",
      slug: first.slug,
      name: first.name,
      aliases: [reagents[1].name],
      reactionIds: ["missing-reaction"],
      mechanismIds: ["missing-mechanism"],
      moleculeIds: ["missing-molecule"],
      lessonIds: ["missing-lesson"],
      keywords: [],
    };

    const codes = validateReagents([...reagents, invalid]).map((issue) => issue.code);
    expect(codes).toEqual(expect.arrayContaining([
      "duplicate-slug",
      "duplicate-alias",
      "missing-reaction",
      "missing-mechanism",
      "missing-molecule",
      "missing-lesson",
      "empty-keywords",
    ]));
  });
});
