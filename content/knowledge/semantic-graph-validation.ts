import type { SemanticGraph } from "./semantic-graph-types";

export type SemanticGraphIssue = {
  code: string;
  message: string;
};

export function validateSemanticGraph(graph: SemanticGraph): readonly SemanticGraphIssue[] {
  const issues: SemanticGraphIssue[] = [];
  const nodeIds = new Set<string>();
  const edgeIds = new Set<string>();

  for (const node of graph.nodes) {
    if (nodeIds.has(node.id)) {
      issues.push({ code: "duplicate-node", message: `Duplicate semantic graph node: ${node.id}` });
    }
    nodeIds.add(node.id);
    if (!node.title.trim()) {
      issues.push({ code: "missing-title", message: `Semantic graph node ${node.id} has no title.` });
    }
  }

  for (const edge of graph.edges) {
    if (edgeIds.has(edge.id)) {
      issues.push({ code: "duplicate-edge", message: `Duplicate semantic graph edge: ${edge.id}` });
    }
    edgeIds.add(edge.id);
    if (!nodeIds.has(edge.from)) {
      issues.push({ code: "missing-source", message: `Semantic graph edge ${edge.id} references missing source ${edge.from}.` });
    }
    if (!nodeIds.has(edge.to)) {
      issues.push({ code: "missing-target", message: `Semantic graph edge ${edge.id} references missing target ${edge.to}.` });
    }
    if (edge.from === edge.to) {
      issues.push({ code: "self-edge", message: `Semantic graph edge ${edge.id} points to itself.` });
    }
    if (!Number.isFinite(edge.weight) || edge.weight <= 0) {
      issues.push({ code: "invalid-weight", message: `Semantic graph edge ${edge.id} has invalid weight ${edge.weight}.` });
    }
  }

  return issues;
}
