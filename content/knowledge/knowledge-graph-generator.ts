import { lessons } from "@/content/lessons";
import { mechanisms } from "@/content/mechanisms";
import { molecules } from "@/content/molecules";
import { platformFeatures } from "@/content/platform";
import { reactions } from "@/content/reactions";
import { reagents } from "@/content/reagents";
import { functionalGroups } from "@/content/references";
import { spectroscopyDatasets } from "@/content/spectroscopy";
import type { KnowledgeNode, KnowledgeNodeKind, KnowledgeRelation } from "@/content/knowledge-types";


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

export function generateKnowledgeRelations(): readonly KnowledgeRelation[] {
  const relations: KnowledgeRelation[] = [];
  const add = (relation: KnowledgeRelation) => relations.push(relation);

  for (const lesson of lessons) {
    for (const id of lesson.prerequisiteLessonIds) add({ from: `lesson:${lesson.id}`, to: `lesson:${id}`, kind: "prerequisite" });
    for (const id of lesson.moleculeIds) add({ from: `lesson:${lesson.id}`, to: `molecule:${id}`, kind: "related" });
    for (const id of lesson.reactionIds) add({ from: `lesson:${lesson.id}`, to: `reaction:${id}`, kind: "related" });
    for (const id of lesson.mechanismIds) add({ from: `lesson:${lesson.id}`, to: `mechanism:${id}`, kind: "practice" });
    for (const id of lesson.reagentIds) add({ from: `lesson:${lesson.id}`, to: `reagent:${id}`, kind: "uses" });
    for (const id of lesson.spectroscopyDatasetIds) add({ from: `lesson:${lesson.id}`, to: `spectroscopy:${id}`, kind: "practice" });
    if (lesson.next) {
      const next = lessons.find((candidate) => candidate.href === lesson.next?.href);
      if (next) add({ from: `lesson:${lesson.id}`, to: `lesson:${next.id}`, kind: "study-next" });
    }
  }

  for (const mechanism of mechanisms) {
    add({ from: `mechanism:${mechanism.id}`, to: `reaction:${mechanism.reactionId}`, kind: "related" });
    add({ from: `mechanism:${mechanism.id}`, to: "lab:curved-arrow-designer", kind: "practice" });
    add({ from: `mechanism:${mechanism.id}`, to: "reference:reagents", kind: "reference" });
    for (const nodeId of mechanism.prerequisiteNodeIds) add({ from: `mechanism:${mechanism.id}`, to: nodeId, kind: "prerequisite" });
  }

  for (const reaction of reactions) {
    add({ from: `reaction:${reaction.id}`, to: `mechanism:${reaction.mechanismId}`, kind: "practice" });
    for (const id of reaction.reagentIds) add({ from: `reaction:${reaction.id}`, to: `reagent:${id}`, kind: "uses" });
    for (const id of reaction.relatedReactionIds) add({ from: `reaction:${reaction.id}`, to: `reaction:${id}`, kind: "related" });
    for (const id of reaction.competingReactionIds) add({ from: `reaction:${reaction.id}`, to: `reaction:${id}`, kind: "related", label: "Competing pathway" });
    for (const nodeId of reaction.prerequisiteNodeIds) add({ from: `reaction:${reaction.id}`, to: nodeId, kind: "prerequisite" });
  }

  for (const reagent of reagents) {
    for (const id of reagent.reactionIds) add({ from: `reagent:${reagent.id}`, to: `reaction:${id}`, kind: "uses" });
    for (const id of reagent.mechanismIds) add({ from: `reagent:${reagent.id}`, to: `mechanism:${id}`, kind: "practice" });
    for (const id of reagent.moleculeIds) add({ from: `reagent:${reagent.id}`, to: `molecule:${id}`, kind: "uses", label: "Typical substrate" });
    for (const id of reagent.lessonIds) add({ from: `reagent:${reagent.id}`, to: `lesson:${id}`, kind: "prerequisite" });
  }

  for (const molecule of molecules) {
    for (const relation of molecule.reagentRelations) add({ from: `molecule:${molecule.id}`, to: `reagent:${relation.id}`, kind: "uses", label: "label" in relation && typeof relation.label === "string" ? relation.label : undefined });
    for (const relation of molecule.reactionRelations) add({ from: `molecule:${molecule.id}`, to: `reaction:${relation.id}`, kind: "transforms", label: "label" in relation && typeof relation.label === "string" ? relation.label : undefined });
    for (const relation of molecule.lessonRelations) add({ from: `molecule:${molecule.id}`, to: `lesson:${relation.id}`, kind: "prerequisite", label: "label" in relation && typeof relation.label === "string" ? relation.label : undefined });
    if (molecule.capabilities.spectroscopy) add({ from: `molecule:${molecule.id}`, to: `spectroscopy:${molecule.id}`, kind: "practice" });
  }

  for (const dataset of spectroscopyDatasets) {
    add({ from: `spectroscopy:${dataset.id}`, to: `molecule:${dataset.moleculeId}`, kind: "reference", label: "Assigned molecule" });
    for (const id of dataset.relatedLessonIds) add({ from: `spectroscopy:${dataset.id}`, to: `lesson:${id}`, kind: "prerequisite" });
    for (const id of dataset.relatedFunctionalGroupIds) add({ from: `spectroscopy:${dataset.id}`, to: `functional-group:${id}`, kind: "related" });
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
