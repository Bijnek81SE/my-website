import { lessons } from "@/content/lessons";
import { mechanisms } from "@/content/mechanisms";
import { molecules } from "@/content/molecules";
import { platformFeatures } from "@/content/platform";
import { reactions } from "@/content/reactions";
import { reagents } from "@/content/reagents";
import { functionalGroups } from "@/content/references";
import { spectroscopyDatasets } from "@/content/spectroscopy";
import type { KnowledgeNode, KnowledgeNodeKind, KnowledgeRelation } from "@/content/knowledge-types";
import { chemistryRelationships } from "@/content/relationships";


function platformNodeId(feature: (typeof platformFeatures)[number]): string {
  if (feature.kind === "mechanism") return `mechanism:${feature.id}`;
  if (feature.id === "organic-chemistry-workspace") return "workspace:organic-chemistry";
  if (feature.id === "retrosynthesis-planner") return "lab:retrosynthesis";
  if (feature.kind === "lab") return `lab:${feature.id.replace(/-lab$/, "")}`;
  if (feature.kind === "calculator") return `calculator:${feature.id.replace(/-calculator$/, "")}`;
  if (feature.kind === "reference") return `reference:${feature.id}`;
  return `site:${feature.id}`;
}

function platformKind(kind: (typeof platformFeatures)[number]["kind"]): KnowledgeNodeKind {
  if (kind === "mechanism") return "mechanism";
  if (kind === "lab") return "lab";
  if (kind === "calculator") return "calculator";
  if (kind === "reference") return "reference";
  return "site";
}

export function generateKnowledgeNodes(): readonly KnowledgeNode[] {
  const canonicalNodes: KnowledgeNode[] = [
    ...lessons.map((lesson) => ({ id: `lesson:${lesson.id}`, kind: "lesson" as const, title: lesson.title, description: lesson.description, href: lesson.href, keywords: lesson.keywords })),
    ...mechanisms.map((mechanism) => ({ id: `mechanism:${mechanism.id}`, kind: "mechanism" as const, title: mechanism.title, description: mechanism.description, href: mechanism.href, keywords: mechanism.keywords })),
    ...reactions.map((reaction) => ({ id: `reaction:${reaction.id}`, kind: "reaction" as const, title: reaction.title, description: reaction.description, href: "/reactions", keywords: reaction.keywords })),
    ...reagents.map((reagent) => ({ id: `reagent:${reagent.id}`, kind: "reagent" as const, title: reagent.name, description: reagent.summary, href: `/reagents/${reagent.slug}`, keywords: reagent.keywords })),
    ...molecules.map((molecule) => ({ id: `molecule:${molecule.id}`, kind: "molecule" as const, title: molecule.name, description: molecule.workspace?.summary ?? molecule.condensedFormula, keywords: molecule.aliases })),
    ...spectroscopyDatasets.map((dataset) => ({ id: `spectroscopy:${dataset.id}`, kind: "spectroscopy" as const, title: `${dataset.name} spectroscopy`, description: dataset.summary, href: `/lab/spectroscopy?compound=${dataset.id}`, keywords: [dataset.name, dataset.formula, "NMR", "IR", "mass spectrometry"] })),
    ...functionalGroups.map((entry) => ({ id: `functional-group:${entry.slug}`, kind: "functional-group" as const, title: entry.name, description: entry.summary, href: `/functional-groups/${entry.slug}`, keywords: entry.keywords })),
    ...platformFeatures.filter((feature) => feature.kind !== "mechanism").map((feature) => ({ id: platformNodeId(feature), kind: platformKind(feature.kind), title: feature.title, description: feature.description, href: feature.href, keywords: feature.search?.keywords ?? feature.tags })),
  ];

  const seen = new Set<string>();
  return canonicalNodes.filter((node) => {
    if (seen.has(node.id)) return false;
    seen.add(node.id);
    return true;
  });
}

function relationshipKind(
  semantic: import("@/content/relationships").ChemistryRelationshipSemantic,
): import("@/content/knowledge-types").KnowledgeRelationKind {
  if (semantic === "requires-prerequisite") return "prerequisite";
  if (semantic === "prerequisite-of") return "study-next";
  if (semantic === "study-next") return "study-next";
  if (semantic === "teaches" || semantic === "taught-by" || semantic === "related-lesson") return "related";
  if (semantic === "uses-reagent" || semantic === "enables-reaction" || semantic === "uses-substrate") return "uses";
  if (semantic === "uses-mechanism" || semantic === "mechanism-for" || semantic === "has-spectrum") return "practice";
  if (semantic === "substrate-for" || semantic === "transforms-functional-group" || semantic === "transformed-by") return "transforms";
  if (semantic === "spectrum-of" || semantic === "has-functional-group" || semantic === "functional-group-of") return "reference";
  return "related";
}

export function generateKnowledgeRelations(): readonly KnowledgeRelation[] {
  const relations: KnowledgeRelation[] = [];
  const add = (relation: KnowledgeRelation) => relations.push(relation);

  // Canonical chemistry relationships are generated once by the relationship
  // engine and then adapted for graph presentation. Only direct facts are
  // emitted here; inverse discovery remains available through the engine.
  for (const relationship of chemistryRelationships) {
    if (relationship.inferred) continue;
    add({
      from: relationship.from,
      to: relationship.to,
      kind: relationshipKind(relationship.semantic),
      label: relationship.label,
    });
  }

  // Platform-only practice and prerequisite connections do not belong to a
  // chemistry entity registry, so they remain graph integrations.
  for (const mechanism of mechanisms) {
    add({ from: `mechanism:${mechanism.id}`, to: "lab:curved-arrow-designer", kind: "practice" });
    add({ from: `mechanism:${mechanism.id}`, to: "reference:reagents", kind: "reference" });
    for (const nodeId of mechanism.prerequisiteNodeIds) {
      add({ from: `mechanism:${mechanism.id}`, to: nodeId, kind: "prerequisite" });
    }
  }

  for (const reaction of reactions) {
    for (const nodeId of reaction.prerequisiteNodeIds) {
      add({ from: `reaction:${reaction.id}`, to: nodeId, kind: "prerequisite" });
    }
  }

  for (const entry of functionalGroups) {
    for (const lab of entry.relatedLabs) {
      const feature = platformFeatures.find((item) => item.href === lab.href);
      if (feature) add({ from: `functional-group:${entry.slug}`, to: platformNodeId(feature), kind: "practice" });
    }
  }

  const seen = new Set<string>();
  return relations.filter((relation) => {
    const key = `${relation.from}|${relation.to}|${relation.kind}|${relation.label ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
