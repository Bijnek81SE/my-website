import { generateKnowledgeNodes, generateKnowledgeRelations } from "./knowledge";
import type { KnowledgeConnection, KnowledgeRelationKind } from "./knowledge-types";

export const knowledgeNodes = generateKnowledgeNodes();
export const knowledgeRelations = generateKnowledgeRelations();
const nodesById = new Map(knowledgeNodes.map((node) => [node.id, node]));

export function getKnowledgeNode(id: string) { return nodesById.get(id); }
export function getKnowledgeConnections(id: string, kinds?: readonly KnowledgeRelationKind[]): readonly KnowledgeConnection[] {
  const allowed = kinds ? new Set(kinds) : null;
  return knowledgeRelations
    .filter((relation) => relation.from === id && (!allowed || allowed.has(relation.kind)))
    .map((relation) => ({ relation, node: nodesById.get(relation.to) }))
    .filter((connection): connection is KnowledgeConnection => Boolean(connection.node));
}
export function getKnowledgeNodeIdForLesson(slug: string): string { return `lesson:${slug}`; }
