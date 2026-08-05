import { describe, expect, it } from "vitest";
import {
  getKnowledgeConnections,
  getKnowledgeNode,
  knowledgeNodes,
} from "@/content/knowledge-graph";

describe("organic chemistry knowledge graph", () => {
  it("indexes every Fundamentals lesson", () => {
    expect(knowledgeNodes.filter((node) => node.kind === "lesson")).toHaveLength(7);
    expect(getKnowledgeNode("lesson:resonance")?.href).toBe(
      "/learn/fundamentals/resonance",
    );
  });

  it("connects lessons to prerequisites and study-next nodes", () => {
    const prerequisites = getKnowledgeConnections("lesson:resonance", ["prerequisite"]);
    expect(prerequisites.some(({ node }) => node.id === "lesson:formal-charge")).toBe(true);
  });

  it("connects mechanisms to lessons, practice, and references", () => {
    const connections = getKnowledgeConnections("mechanism:sn2");
    expect(connections.map(({ node }) => node.id)).toEqual(
      expect.arrayContaining([
        "lesson:chemical-bonding",
        "lesson:resonance",
        "lab:curved-arrow-designer",
        "reference:reagents",
      ]),
    );
  });
});
