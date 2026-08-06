import type { RelationshipPresentation } from "./relationship-types";

export type RelationshipPresentationIssue = { code: string; presentationId: string; message: string };

export function validateRelationshipPresentations(presentations: readonly RelationshipPresentation[]): RelationshipPresentationIssue[] {
  const issues: RelationshipPresentationIssue[] = [];
  const ids = new Set<string>();
  const pairs = new Set<string>();

  for (const presentation of presentations) {
    if (ids.has(presentation.id)) issues.push({ code: "duplicate-id", presentationId: presentation.id, message: `Duplicate presentation ID ${presentation.id}.` });
    ids.add(presentation.id);
    const expectedId = `${presentation.source}:${presentation.role}`;
    if (presentation.id !== expectedId) issues.push({ code: "id-mismatch", presentationId: presentation.id, message: `Expected ${expectedId} from source and role.` });
    if (pairs.has(expectedId)) issues.push({ code: "duplicate-source-role", presentationId: presentation.id, message: `Duplicate source/role pair ${expectedId}.` });
    pairs.add(expectedId);
    if (!presentation.heading.trim()) issues.push({ code: "missing-heading", presentationId: presentation.id, message: "Presentation heading is required." });
    if (!presentation.description.trim()) issues.push({ code: "missing-description", presentationId: presentation.id, message: "Presentation description is required." });
  }

  return issues;
}
