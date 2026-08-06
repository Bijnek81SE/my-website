import { describe, expect, it } from "vitest";
import {
  findReagentByNameOrAlias,
  getReagent,
  getReagentCategories,
  getReagentsByCapability,
  selectReagents,
} from "@/content/reagents";

 describe("canonical reagent registry", () => {
  it("resolves stable ids, slugs, names, and aliases", () => {
    expect(getReagent("bromine")?.formula).toBe("Br₂");
    expect(findReagentByNameOrAlias("peroxide effect")?.id).toBe("hbr-peroxide");
    expect(findReagentByNameOrAlias("H2/Pd")?.id).toBe("hydrogen-palladium");
  });

  it("selects reagents by chemistry relationships and capabilities", () => {
    expect(selectReagents({ reactionId: "halogenation" }).map((entry) => entry.id)).toEqual(["bromine"]);
    expect(selectReagents({ moleculeId: "propene" }).map((entry) => entry.id)).toEqual(
      expect.arrayContaining(["bromine", "borane-peroxide", "sulfuric-acid", "hydrogen-palladium", "hbr-peroxide"]),
    );
    expect(getReagentsByCapability("workspace").length).toBeGreaterThan(0);
    expect(getReagentCategories()).toContain("Reducing agent");
  });

  it("supports indexed text search without UI-owned reagent lists", () => {
    expect(selectReagents({ query: "anti markovnikov" }).map((entry) => entry.id)).toEqual(
      expect.arrayContaining(["borane-peroxide", "hbr-peroxide"]),
    );
  });
});
