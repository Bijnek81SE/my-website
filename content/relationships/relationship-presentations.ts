import type { RelationshipPresentation } from "./relationship-types";

function definePresentation<const T extends RelationshipPresentation>(presentation: T): T {
  return presentation;
}

export const relationshipPresentations = [
  definePresentation({ id: "reagent:typical-reactions", source: "reagent", role: "typical-reactions", heading: "Typical reactions", description: "Reactions in which this reagent is commonly used and why it is selected.", tone: "emerald" }),
  definePresentation({ id: "reagent:typical-substrates", source: "reagent", role: "typical-substrates", heading: "Typical substrates", description: "Representative molecules or substrate classes that commonly react with this reagent.", tone: "cyan" }),
  definePresentation({ id: "reagent:mechanism-labs", source: "reagent", role: "mechanism-labs", heading: "Interactive mechanism labs", description: "Mechanisms that explain how this reagent produces its characteristic transformations.", tone: "violet" }),
  definePresentation({ id: "reagent:recommended-lessons", source: "reagent", role: "recommended-lessons", heading: "Recommended foundations", description: "Lessons that make the reagent's reactivity and selectivity easier to understand.", tone: "blue" }),

  definePresentation({ id: "molecule:common-reagents", source: "molecule", role: "common-reagents", heading: "Relevant reagents", description: "Reagents commonly used to transform, prepare, or study this molecule.", tone: "emerald" }),
  definePresentation({ id: "molecule:common-reactions", source: "molecule", role: "common-reactions", heading: "Common reactions", description: "Transformations in which this molecule acts as a substrate, product, or strategic intermediate.", tone: "amber" }),
  definePresentation({ id: "molecule:practice-tools", source: "molecule", role: "practice-tools", heading: "Practice with this chemistry", description: "Interactive labs where this structure or functional group is directly relevant.", tone: "blue" }),
  definePresentation({ id: "molecule:recommended-lessons", source: "molecule", role: "recommended-lessons", heading: "Learning pathway", description: "Concepts that explain the bonding, structure, and reactivity of this molecule.", tone: "violet" }),

  definePresentation({ id: "reaction:competing-pathways", source: "reaction", role: "competing-pathways", heading: "Competing pathways", description: "Alternative outcomes that may compete under similar substrate or condition choices.", tone: "amber" }),
  definePresentation({ id: "reaction:alternative-pathways", source: "reaction", role: "alternative-pathways", heading: "Alternative pathways to compare", description: "Closely connected reactions that solve similar synthetic problems through different mechanisms or selectivity.", tone: "violet" }),
  definePresentation({ id: "reaction:prerequisites", source: "reaction", role: "prerequisites", heading: "Study before attempting", description: "Foundational ideas needed to reason confidently about this reaction.", tone: "blue" }),
  definePresentation({ id: "reaction:reaction-mechanism", source: "reaction", role: "reaction-mechanism", heading: "Reaction mechanism", description: "The electron-flow pathway responsible for this transformation.", tone: "emerald" }),

  definePresentation({ id: "mechanism:typical-reactions", source: "mechanism", role: "typical-reactions", heading: "Occurs in reactions", description: "Canonical reactions that proceed through this electron-flow pattern.", tone: "emerald" }),
  definePresentation({ id: "mechanism:common-reagents", source: "mechanism", role: "common-reagents", heading: "Reagents that enable this pathway", description: "Reagents and conditions that favour or participate in this mechanism.", tone: "amber" }),
  definePresentation({ id: "mechanism:prerequisites", source: "mechanism", role: "prerequisites", heading: "Study before attempting", description: "Concepts to review before working through the mechanism interactively.", tone: "blue" }),

  definePresentation({ id: "functional-group:common-reactions", source: "functional-group", role: "common-reactions", heading: "Characteristic reactions", description: "Transformations commonly associated with this functional group.", tone: "emerald" }),
  definePresentation({ id: "functional-group:practice-tools", source: "functional-group", role: "practice-tools", heading: "Practice identifying and reacting it", description: "Interactive labs that reinforce recognition and reactivity.", tone: "blue" }),

  definePresentation({ id: "spectroscopy:assigned-molecule", source: "spectroscopy", role: "assigned-molecule", heading: "Assigned structure environment", description: "The atom or structural environment responsible for the selected signal.", tone: "cyan" }),
  definePresentation({ id: "spectroscopy:diagnostic-signals", source: "spectroscopy", role: "diagnostic-signals", heading: "Diagnostic evidence", description: "Signals, bands, and fragments that support the structural assignment.", tone: "emerald" }),
  definePresentation({ id: "spectroscopy:interpretation-skills", source: "spectroscopy", role: "interpretation-skills", heading: "Interpretation skills", description: "Learning resources that help turn spectral evidence into a structural conclusion.", tone: "violet" }),

  definePresentation({ id: "lesson:continue-learning", source: "lesson", role: "continue-learning", heading: "Continue learning", description: "Concepts that naturally extend this lesson and deepen the same reasoning skills.", tone: "violet" }),
  definePresentation({ id: "lesson:chemistry-in-action", source: "lesson", role: "chemistry-in-action", heading: "Chemistry in action", description: "Reactions, mechanisms, references, and tools where this lesson becomes useful.", tone: "emerald" }),
] as const satisfies readonly RelationshipPresentation[];

const byId = new Map(relationshipPresentations.map((presentation) => [presentation.id, presentation]));

export type RelationshipPresentationId = (typeof relationshipPresentations)[number]["id"];

export function getRelationshipPresentation(id: string): RelationshipPresentation | undefined {
  return byId.get(id as RelationshipPresentationId);
}

export function requireRelationshipPresentation(id: RelationshipPresentationId): RelationshipPresentation {
  const presentation = getRelationshipPresentation(id);
  if (!presentation) throw new Error(`Unknown relationship presentation: ${id}`);
  return presentation;
}
