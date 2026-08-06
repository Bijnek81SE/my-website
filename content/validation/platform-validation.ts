import { validateKnowledgeGraph } from "@/content/knowledge";
import { knowledgeNodes, knowledgeRelations } from "@/content/knowledge-graph";
import { lessons, validateLessons } from "@/content/lessons";
import { mechanisms, validateMechanisms } from "@/content/mechanisms";
import { molecules, validateMolecules } from "@/content/molecules";
import { platformFeatures, validatePlatformFeatures } from "@/content/platform";
import { reactions, validateReactions } from "@/content/reactions";
import { reagents, validateReagents } from "@/content/reagents";
import { spectroscopyDatasets, validateSpectroscopyDatasets } from "@/content/spectroscopy";
import { validateWorkspaceTools, workspaceTools } from "@/content/workspace";

export type PlatformValidationReport = { valid: boolean; issues: readonly { domain: string; code: string; message: string }[] };
export function validateCanonicalPlatform(): PlatformValidationReport {
  const groups = [
    ["platform", validatePlatformFeatures(platformFeatures)],
    ["molecules", validateMolecules(molecules)],
    ["reactions", validateReactions(reactions)],
    ["mechanisms", validateMechanisms(mechanisms)],
    ["reagents", validateReagents(reagents)],
    ["spectroscopy", validateSpectroscopyDatasets(spectroscopyDatasets)],
    ["lessons", validateLessons(lessons)],
    ["workspace", validateWorkspaceTools(workspaceTools)],
    ["knowledge", validateKnowledgeGraph(knowledgeNodes, knowledgeRelations)],
  ] as const;
  const issues = groups.flatMap(([domain, domainIssues]) => domainIssues.map((issue) => ({ domain, code: issue.code, message: issue.message })));
  const moleculeIds = new Set<string>(molecules.map((entry) => entry.id));
  const reactionIds = new Set<string>(reactions.map((entry) => entry.id));
  const mechanismIds = new Set<string>(mechanisms.map((entry) => entry.id));
  const reagentIds = new Set<string>(reagents.map((entry) => entry.id));
  const spectroscopyIds = new Set<string>(spectroscopyDatasets.map((entry) => entry.id));
  for (const lesson of lessons) {
    for (const id of lesson.moleculeIds) if (!moleculeIds.has(id)) issues.push({ domain: "lessons", code: "missing-molecule", message: `Lesson ${lesson.id} references missing molecule ${id}.` });
    for (const id of lesson.reactionIds) if (!reactionIds.has(id)) issues.push({ domain: "lessons", code: "missing-reaction", message: `Lesson ${lesson.id} references missing reaction ${id}.` });
    for (const id of lesson.mechanismIds) if (!mechanismIds.has(id)) issues.push({ domain: "lessons", code: "missing-mechanism", message: `Lesson ${lesson.id} references missing mechanism ${id}.` });
    for (const id of lesson.reagentIds) if (!reagentIds.has(id)) issues.push({ domain: "lessons", code: "missing-reagent", message: `Lesson ${lesson.id} references missing reagent ${id}.` });
    for (const id of lesson.spectroscopyDatasetIds) if (!spectroscopyIds.has(id)) issues.push({ domain: "lessons", code: "missing-spectroscopy", message: `Lesson ${lesson.id} references missing spectroscopy dataset ${id}.` });
  }
  return { valid: issues.length === 0, issues };
}
