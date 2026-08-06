export type ChemistryEntityKind =
  | "lesson"
  | "mechanism"
  | "reaction"
  | "reagent"
  | "molecule"
  | "spectroscopy"
  | "functional-group";

export type ChemistryEntityId = `${ChemistryEntityKind}:${string}`;

export type ChemistryRelationshipSemantic =
  | "requires-prerequisite"
  | "prerequisite-of"
  | "study-next"
  | "teaches"
  | "taught-by"
  | "uses-reagent"
  | "enables-reaction"
  | "uses-mechanism"
  | "mechanism-for"
  | "uses-substrate"
  | "substrate-for"
  | "transforms-functional-group"
  | "transformed-by"
  | "has-functional-group"
  | "functional-group-of"
  | "has-spectrum"
  | "spectrum-of"
  | "related-reaction"
  | "competes-with"
  | "related-lesson";

export type ChemistryRelationshipProvenance =
  | "lesson-registry"
  | "mechanism-registry"
  | "reaction-registry"
  | "reagent-registry"
  | "molecule-registry"
  | "spectroscopy-registry"
  | "inferred-inverse";

export type ChemistryRelationship = {
  id: string;
  from: ChemistryEntityId;
  to: ChemistryEntityId;
  semantic: ChemistryRelationshipSemantic;
  provenance: ChemistryRelationshipProvenance;
  inferred: boolean;
  label?: string;
  description?: string;
};

export type ChemistryRelationshipDirection = "outgoing" | "incoming" | "both";

export type ChemistryRelationshipQuery = {
  entityId?: ChemistryEntityId;
  direction?: ChemistryRelationshipDirection;
  semantics?: readonly ChemistryRelationshipSemantic[];
  targetKinds?: readonly ChemistryEntityKind[];
  includeInferred?: boolean;
};
