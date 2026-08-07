import type {
  KnowledgeNode,
  KnowledgeRelation,
} from "@/content/knowledge-types";
import { generateSemanticGraph } from "./semantic-graph-generator";

export function generateKnowledgeNodes(): readonly KnowledgeNode[] {
  return generateSemanticGraph().nodes.map((node) => ({
    id: node.id,
    kind: node.kind,
    title: node.title,
    description: node.description,
    href: node.href,
    keywords: node.keywords,
  }));
}

export function generateKnowledgeRelations(): readonly KnowledgeRelation[] {
  return generateSemanticGraph().edges
    .filter((edge) => !edge.inferred)
    .map((edge) => ({
      from: edge.from,
      to: edge.to,
      kind: edge.category,
      label: edge.label,
    }));
}