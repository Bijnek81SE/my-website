import { describe, expect, it } from "vitest";
import {
  findSemanticGraphPaths,
  getSemanticGraphContext,
  recommendNextLessonIds,
  semanticGraph,
  validateSemanticGraph,
} from "@/content/knowledge";

describe("semantic knowledge graph 2.0", () => {
  it("unifies canonical chemistry and platform nodes into one valid graph", () => {
    expect(validateSemanticGraph(semanticGraph)).toEqual([]);

    expect(
      semanticGraph.nodes.some(
        (node) =>
          node.id === "molecule:propene" &&
          node.canonical,
      ),
    ).toBe(true);

    expect(
      semanticGraph.nodes.some(
        (node) =>
          node.id === "lab:curved-arrow-designer" &&
          !node.canonical,
      ),
    ).toBe(true);
  });

  it("drives molecule context across reagents, reactions, lessons, and labs", () => {
    const context = getSemanticGraphContext(
      "molecule:propene",
      {
        direction: "both",
        maxDepth: 2,
      },
    );

    const ids = new Set(
      context.map((node) => node.id),
    );

    expect(
      ids.has("reagent:bromine"),
    ).toBe(true);

    expect(
      ids.has("reaction:hydrohalogenation"),
    ).toBe(true);

    expect(
      ids.has("lesson:hybridization"),
    ).toBe(true);

    expect(
      ids.has("mechanism:hydrohalogenation"),
    ).toBe(true);
  });

  it("explains cross-domain paths and ranks graph-based lesson progression", () => {
    const paths = findSemanticGraphPaths(
      "reagent:potassium-tert-butoxide",
      "mechanism:e2",
      3,
    );

    expect(
      paths.some((path) => {
        const ids = path.nodes.map(
          (node) => node.id,
        );

        return (
          ids.includes(
            "reagent:potassium-tert-butoxide",
          ) &&
          ids.includes("reaction:e2") &&
          ids.includes("mechanism:e2")
        );
      }),
    ).toBe(true);

    expect(
      recommendNextLessonIds(
        ["lesson:chemical-bonding"],
        [
          "lesson:what-is-organic-chemistry",
          "lesson:atomic-structure",
          "lesson:chemical-bonding",
        ],
        1,
      ),
    ).toEqual([
      "lesson:hybridization",
    ]);
  });
});