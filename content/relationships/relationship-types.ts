export type RelationshipSourceKind =
  | "reagent"
  | "molecule"
  | "reaction"
  | "mechanism"
  | "functional-group"
  | "spectroscopy"
  | "lesson"
  | "knowledge";

export type RelationshipRole =
  | "typical-reactions"
  | "typical-substrates"
  | "mechanism-labs"
  | "recommended-lessons"
  | "common-reagents"
  | "common-reactions"
  | "practice-tools"
  | "competing-pathways"
  | "alternative-pathways"
  | "reaction-mechanism"
  | "prerequisites"
  | "assigned-molecule"
  | "diagnostic-signals"
  | "interpretation-skills"
  | "continue-learning"
  | "chemistry-in-action";

export type RelationshipTone = "emerald" | "violet" | "blue" | "amber" | "cyan" | "slate";

export type RelationshipPresentation = {
  id: `${RelationshipSourceKind}:${RelationshipRole}`;
  source: RelationshipSourceKind;
  role: RelationshipRole;
  heading: string;
  description: string;
  tone: RelationshipTone;
};

export type RelationshipItem = {
  id: string;
  label: string;
  description: string;
  href?: string;
  badge?: string;
};
