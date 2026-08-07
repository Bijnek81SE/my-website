import type { KnowledgeNodeKind, KnowledgeRelationKind } from "@/content/knowledge-types";
import type {
  ChemistryRelationshipProvenance,
  ChemistryRelationshipSemantic,
} from "@/content/relationships/chemistry-relationship-types";

export type SemanticGraphNodeSource =
  | "lesson-registry"
  | "mechanism-registry"
  | "reaction-registry"
  | "reagent-registry"
  | "molecule-registry"
  | "spectroscopy-registry"
  | "functional-group-registry"
  | "platform-registry";

export type SemanticGraphPlatformSemantic =
  | "practice-with"
  | "reference-with"
  | "requires-resource";

export type SemanticGraphSemantic =
  | ChemistryRelationshipSemantic
  | SemanticGraphPlatformSemantic;

export type SemanticGraphEdgeProvenance =
  | ChemistryRelationshipProvenance
  | "platform-integration"
  | "functional-group-registry";

export type SemanticGraphNode = {
  id: string;
  kind: KnowledgeNodeKind;
  title: string;
  description: string;
  href?: string;
  keywords: readonly string[];
  source: SemanticGraphNodeSource;
  canonical: boolean;
};

export type SemanticGraphEdge = {
  id: string;
  from: string;
  to: string;
  semantic: SemanticGraphSemantic;
  category: KnowledgeRelationKind;
  provenance: SemanticGraphEdgeProvenance;
  inferred: boolean;
  weight: number;
  label?: string;
  description?: string;
};

export type SemanticGraph = {
  nodes: readonly SemanticGraphNode[];
  edges: readonly SemanticGraphEdge[];
};

export type SemanticGraphDirection = "outgoing" | "incoming" | "both";

export type SemanticGraphConnection = {
  edge: SemanticGraphEdge;
  node: SemanticGraphNode;
  direction: "outgoing" | "incoming";
};

export type SemanticGraphQuery = {
  entityId: string;
  direction?: SemanticGraphDirection;
  semantics?: readonly SemanticGraphSemantic[];
  categories?: readonly KnowledgeRelationKind[];
  targetKinds?: readonly KnowledgeNodeKind[];
  includeInferred?: boolean;
};

export type SemanticGraphPath = {
  nodes: readonly SemanticGraphNode[];
  edges: readonly SemanticGraphEdge[];
  score: number;
};

export type SemanticGraphRecommendation = {
  node: SemanticGraphNode;
  score: number;
  reasons: readonly {
    sourceId: string;
    semantic: SemanticGraphSemantic;
    depth: number;
  }[];
};
