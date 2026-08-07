import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { searchEntries } from "@/components/search/SearchIndex";
import { getSemanticGraphContext } from "@/content/knowledge";
import { molecules, validateMolecules } from "@/content/molecules";
import { reactions, validateReactions } from "@/content/reactions";
import { reagents, validateReagents } from "@/content/reagents";
import { mechanisms, validateMechanisms } from "@/content/mechanisms";

const expectedAlkeneIds = [
  "ethene",
  "propene",
  "1-butene",
  "cis-2-butene",
  "trans-2-butene",
  "2-methylpropene",
  "1-pentene",
  "1-hexene",
  "2-methyl-2-butene",
  "cyclopentene",
  "cyclohexene",
  "styrene",
  "alpha-methylstyrene",
] as const;

const oxidationReactionIds = [
  "epoxidation",
  "syn-dihydroxylation",
  "anti-dihydroxylation",
  "ozonolysis",
  "oxidative-cleavage",
] as const;

const oxidationReagentIds = [
  "mcpba",
  "osmium-tetroxide",
  "ozone",
  "zinc",
  "potassium-permanganate",
] as const;

describe("Phase 12.1 canonical alkene ecosystem", () => {
  it("registers a substantial canonical alkene family and keeps all domain validators green", () => {
    const alkeneIds = molecules
      .filter((molecule) => molecule.functionalGroupIds.includes("alkene"))
      .map((molecule) => molecule.id);

    expect(alkeneIds).toEqual(expect.arrayContaining([...expectedAlkeneIds]));
    expect(alkeneIds.length).toBeGreaterThanOrEqual(expectedAlkeneIds.length);
    expect(validateMolecules(molecules)).toEqual([]);
    expect(validateReactions(reactions)).toEqual([]);
    expect(validateReagents(reagents)).toEqual([]);
    expect(validateMechanisms(mechanisms)).toEqual([]);
  });

  it("adds the major undergraduate alkene oxidation pathways as canonical reaction-mechanism pairs", () => {
    for (const id of oxidationReactionIds) {
      const reaction = reactions.find((entry) => entry.id === id);
      const mechanism = mechanisms.find((entry) => entry.id === id);
      expect(reaction).toBeDefined();
      expect(mechanism).toBeDefined();
      expect(reaction?.mechanismId).toBe(id);
      expect(mechanism?.reactionId).toBe(id);
      expect(reaction?.family).toBe("Alkene oxidation");
    }
  });

  it("publishes alkene molecules and oxidation reagents through generated search and sitemap integrations", () => {
    expect(searchEntries.some((entry) => entry.href === "/molecules/cyclohexene")).toBe(true);
    expect(searchEntries.some((entry) => entry.href === "/molecules/styrene")).toBe(true);

    for (const id of oxidationReagentIds) {
      expect(searchEntries.some((entry) => entry.href === `/reagents/${id}`)).toBe(true);
    }

    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/molecules/cyclohexene"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/molecules/styrene"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/reagents/mcpba"))).toBe(true);
  });

  it("lets the semantic graph discover alkene chemistry from a molecule without UI wiring", () => {
    const contextIds = new Set(
      getSemanticGraphContext("molecule:cyclohexene", {
        direction: "both",
        maxDepth: 2,
      }).map((node) => node.id),
    );

    expect(contextIds.has("reaction:epoxidation")).toBe(true);
    expect(contextIds.has("reaction:syn-dihydroxylation")).toBe(true);
    expect(contextIds.has("reaction:ozonolysis")).toBe(true);
    expect(contextIds.has("reagent:mcpba")).toBe(true);
    expect(contextIds.has("mechanism:epoxidation")).toBe(true);
  });
});
