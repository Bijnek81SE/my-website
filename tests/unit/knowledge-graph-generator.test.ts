import { describe, expect, it } from "vitest";
import { generateKnowledgeNodes, generateKnowledgeRelations, validateKnowledgeGraph } from "@/content/knowledge";

describe("generated knowledge graph", () => {
  it("builds valid nodes and relationships from canonical registries", () => {
    const nodes = generateKnowledgeNodes(); const relations = generateKnowledgeRelations();
    expect(validateKnowledgeGraph(nodes, relations)).toEqual([]);
    expect(nodes.some((node) => node.id === "spectroscopy:ethanol")).toBe(true);
    expect(relations.some((relation) => relation.from === "reagent:potassium-tert-butoxide" && relation.to === "reaction:e2")).toBe(true);
  });
});
