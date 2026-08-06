export type KnowledgeNodeKind =
  | "lesson"
  | "mechanism"
  | "lab"
  | "calculator"
  | "functional-group"
  | "reaction"
  | "reagent"
  | "reference"
  | "molecule"
  | "spectroscopy"
  | "site";

export type KnowledgeRelationKind =
  | "prerequisite"
  | "related"
  | "study-next"
  | "practice"
  | "uses"
  | "transforms"
  | "reference"
  | "molecule"
  | "spectroscopy"
  | "site";

export type KnowledgeNode = {
  id: string;
  kind: KnowledgeNodeKind;
  title: string;
  description: string;
  href?: string;
  keywords?: readonly string[];
};

export type KnowledgeRelation = {
  from: string;
  to: string;
  kind: KnowledgeRelationKind;
  label?: string;
};

export type KnowledgeConnection = {
  relation: KnowledgeRelation;
  node: KnowledgeNode;
};
