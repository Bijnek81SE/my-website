import {
  getSemanticGraphConnections,
  getSemanticGraphNode,
  semanticGraph,
} from "./knowledge";
import type { KnowledgeConnection, KnowledgeRelationKind } from "./knowledge-types";

export const knowledgeNodes = semanticGraph.nodes.map((node) => ({
  id: node.id,
  kind: node.kind,
  title: node.title,
  description: node.description,
  href: node.href,
  keywords: node.keywords,
}));

export const knowledgeRelations = semanticGraph.edges
  .filter((edge) => !edge.inferred)
  .map((edge) => ({
    from: edge.from,
    to: edge.to,
    kind: edge.category,
    label: edge.label,
  }));

export function getKnowledgeNode(id: string) {
  const node = getSemanticGraphNode(id);
  return node
    ? {
        id: node.id,
        kind: node.kind,
        title: node.title,
        description: node.description,
        href: node.href,
        keywords: node.keywords,
      }
    : undefined;
}

export function getKnowledgeConnections(
  id: string,
  kinds?: readonly KnowledgeRelationKind[],
): readonly KnowledgeConnection[] {
  return getSemanticGraphConnections({
    entityId: id,
    direction: "outgoing",
    categories: kinds,
    includeInferred: false,
  }).map(({ edge, node }) => ({
    relation: {
      from: edge.from,
      to: edge.to,
      kind: edge.category,
      label: edge.label,
    },
    node: {
      id: node.id,
      kind: node.kind,
      title: node.title,
      description: node.description,
      href: node.href,
      keywords: node.keywords,
    },
  }));
}

export function getKnowledgeNodeIdForLesson(slug: string): string {
  return `lesson:${slug}`;
}
