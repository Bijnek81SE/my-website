import { describe, expect, it } from "vitest";
import { createMolecularGraph } from "@/components/chemistry/graph/MolecularGraph";
import { findSimpleRings, isRingBond } from "@/components/chemistry/graph/RingEngine";
import { invalidMolecule, triangleMolecule } from "../fixtures/molecules";

describe("MolecularGraph", () => {
  it("builds neighbours and shortest paths", () => {
    const graph = createMolecularGraph(triangleMolecule);
    expect(graph.getAtomDegree("a")).toBe(2);
    expect(graph.findShortestPath("a", "c")?.atomIds).toEqual(["a", "c"]);
  });

  it("detects rings", () => {
    const graph = createMolecularGraph(triangleMolecule);
    expect(findSimpleRings(graph)).toHaveLength(1);
    expect(isRingBond(graph, "ab")).toBe(true);
  });

  it("reports invalid references and duplicate atom ids", () => {
    const report = createMolecularGraph(invalidMolecule).validate();
    expect(report.valid).toBe(false);
    expect(report.issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["duplicate-atom-id", "missing-to-atom"]),
    );
  });
});
