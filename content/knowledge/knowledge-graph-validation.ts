import type { KnowledgeNode, KnowledgeRelation } from "@/content/knowledge-types";
export type KnowledgeGraphIssue = { code: string; message: string };
export function validateKnowledgeGraph(nodes: readonly KnowledgeNode[], relations: readonly KnowledgeRelation[]): readonly KnowledgeGraphIssue[] {
  const issues: KnowledgeGraphIssue[] = []; const ids = new Set<string>();
  for (const node of nodes) {
    if (ids.has(node.id)) issues.push({ code: "duplicate-node", message: `Duplicate knowledge node: ${node.id}` });
    ids.add(node.id);
  }
  for (const relation of relations) {
    if (!ids.has(relation.from)) issues.push({ code: "missing-source", message: `Missing knowledge source: ${relation.from}` });
    if (!ids.has(relation.to)) issues.push({ code: "missing-target", message: `Missing knowledge target: ${relation.to}` });
    if (relation.from === relation.to) issues.push({ code: "self-relation", message: `Self relationship is not allowed: ${relation.from}` });
  }
  return issues;
}
