import { describe, expect, it } from "vitest";
import { functionalGroups, getFunctionalGroup, getReagent, reagents } from "@/content/references";
describe("chemistry reference registries", () => { it("uses unique slugs", () => { const slugs=[...functionalGroups,...reagents].map((entry)=>`${entry.kind}:${entry.slug}`); expect(new Set(slugs).size).toBe(slugs.length); }); it("retrieves published entries", () => { expect(getFunctionalGroup("alkene")?.formula).toBe("C=C"); expect(getReagent("bromine")?.formula).toBe("Br₂"); }); });
