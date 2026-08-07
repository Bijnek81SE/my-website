import { lessons } from "@/content/lessons/lesson-registry";
import { mechanisms } from "@/content/mechanisms/mechanism-registry";
import { molecules } from "@/content/molecules/molecule-registry";
import { platformFeatures } from "@/content/platform/feature-catalog";
import { reactions } from "@/content/reactions/reaction-registry";
import { reagents } from "@/content/reagents/reagent-registry";
import { functionalGroups } from "@/content/references/functional-group-registry";
import { chemistryRelationships } from "@/content/relationships/chemistry-relationship-engine";
import { spectroscopyDatasets } from "@/content/spectroscopy/spectroscopy-registry";
import type { KnowledgeNodeKind, KnowledgeRelationKind } from "@/content/knowledge-types";
import type {
  ChemistryRelationshipSemantic,
  ChemistryRelationshipProvenance,
} from "@/content/relationships/chemistry-relationship-types";
import type {
  SemanticGraph,
  SemanticGraphEdge,
  SemanticGraphNode,
  SemanticGraphPlatformSemantic,
  SemanticGraphSemantic,
} from "./semantic-graph-types";

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

function categoryForSemantic(semantic: SemanticGraphSemantic): KnowledgeRelationKind {
  if (semantic === "requires-prerequisite" || semantic === "requires-resource") return "prerequisite";
  if (semantic === "prerequisite-of" || semantic === "study-next") return "study-next";
  if (semantic === "teaches" || semantic === "taught-by" || semantic === "related-lesson") return "related";
  if (semantic === "uses-reagent" || semantic === "enables-reaction" || semantic === "uses-substrate") return "uses";
  if (semantic === "uses-mechanism" || semantic === "mechanism-for" || semantic === "practice-with") return "practice";
  if (semantic === "substrate-for" || semantic === "transforms-functional-group" || semantic === "transformed-by") return "transforms";
  if (semantic === "spectrum-of" || semantic === "has-functional-group" || semantic === "functional-group-of" || semantic === "reference-with") return "reference";
  return "related";
}

function weightForSemantic(semantic: SemanticGraphSemantic, inferred: boolean): number {
  const base = (() => {
    if (semantic === "requires-prerequisite" || semantic === "prerequisite-of") return 1.4;
    if (semantic === "study-next") return 1.5;
    if (semantic === "teaches" || semantic === "taught-by") return 1.25;
    if (semantic === "uses-mechanism" || semantic === "mechanism-for") return 1.2;
    if (semantic === "uses-reagent" || semantic === "enables-reaction") return 1.15;
    if (semantic === "has-spectrum" || semantic === "spectrum-of") return 1.15;
    if (semantic === "has-functional-group" || semantic === "functional-group-of") return 1.1;
    if (semantic === "practice-with") return 1.05;
    if (semantic === "requires-resource") return 1.0;
    if (semantic === "reference-with") return 0.95;
    return 1;
  })();

  return inferred ? base * 0.9 : base;
}

function chemistryEdgeId(
  from: string,
  semantic: ChemistryRelationshipSemantic,
  to: string,
  provenance: ChemistryRelationshipProvenance,
): string {
  return `chemistry:${provenance}:${from}|${semantic}|${to}`;
}

function platformEdgeId(
  from: string,
  semantic: SemanticGraphPlatformSemantic,
  to: string,
): string {
  return `platform:${from}|${semantic}|${to}`;
}

export function generateSemanticGraphNodes(): readonly SemanticGraphNode[] {
  const nodes: SemanticGraphNode[] = [
    ...lessons.map((lesson) => ({
      id: `lesson:${lesson.id}`,
      kind: "lesson" as const,
      title: lesson.title,
      description: lesson.description,
      href: lesson.href,
      keywords: lesson.keywords,
      source: "lesson-registry" as const,
      canonical: true,
    })),
    ...mechanisms.map((mechanism) => ({
      id: `mechanism:${mechanism.id}`,
      kind: "mechanism" as const,
      title: mechanism.title,
      description: mechanism.description,
      href: mechanism.href,
      keywords: mechanism.keywords,
      source: "mechanism-registry" as const,
      canonical: true,
    })),
    ...reactions.map((reaction) => ({
      id: `reaction:${reaction.id}`,
      kind: "reaction" as const,
      title: reaction.title,
      description: reaction.description,
      href: "/reactions",
      keywords: reaction.keywords,
      source: "reaction-registry" as const,
      canonical: true,
    })),
    ...reagents.map((reagent) => ({
      id: `reagent:${reagent.id}`,
      kind: "reagent" as const,
      title: reagent.name,
      description: reagent.summary,
      href: `/reagents/${reagent.slug}`,
      keywords: reagent.keywords,
      source: "reagent-registry" as const,
      canonical: true,
    })),
    ...molecules.map((molecule) => ({
      id: `molecule:${molecule.id}`,
      kind: "molecule" as const,
      title: molecule.name,
      description: molecule.workspace?.summary ?? molecule.condensedFormula,
      keywords: molecule.aliases,
      source: "molecule-registry" as const,
      canonical: true,
    })),
    ...spectroscopyDatasets.map((dataset) => ({
      id: `spectroscopy:${dataset.id}`,
      kind: "spectroscopy" as const,
      title: `${dataset.name} spectroscopy`,
      description: dataset.summary,
      href: `/lab/spectroscopy?compound=${dataset.id}`,
      keywords: [dataset.name, dataset.formula, "NMR", "IR", "mass spectrometry"],
      source: "spectroscopy-registry" as const,
      canonical: true,
    })),
    ...functionalGroups.map((entry) => ({
      id: `functional-group:${entry.slug}`,
      kind: "functional-group" as const,
      title: entry.name,
      description: entry.summary,
      href: `/functional-groups/${entry.slug}`,
      keywords: entry.keywords,
      source: "functional-group-registry" as const,
      canonical: true,
    })),
    ...platformFeatures
      .filter((feature) => feature.kind !== "mechanism")
      .map((feature) => ({
        id: platformNodeId(feature),
        kind: platformKind(feature.kind),
        title: feature.title,
        description: feature.description,
        href: feature.href,
        keywords: feature.search?.keywords ?? feature.tags ?? [],
        source: "platform-registry" as const,
        canonical: false,
      })),
  ];

  const byId = new Map<string, SemanticGraphNode>();
  for (const node of nodes) {
    const existing = byId.get(node.id);
    if (!existing || (!existing.canonical && node.canonical)) byId.set(node.id, node);
  }
  return [...byId.values()];
}

export function generateSemanticGraphEdges(): readonly SemanticGraphEdge[] {
  const edges: SemanticGraphEdge[] = [];

  for (const relationship of chemistryRelationships) {
    edges.push({
      id: chemistryEdgeId(
        relationship.from,
        relationship.semantic,
        relationship.to,
        relationship.provenance,
      ),
      from: relationship.from,
      to: relationship.to,
      semantic: relationship.semantic,
      category: categoryForSemantic(relationship.semantic),
      provenance: relationship.provenance,
      inferred: relationship.inferred,
      weight: weightForSemantic(relationship.semantic, relationship.inferred),
      label: relationship.label,
      description: relationship.description,
    });
  }

  const addPlatformEdge = (
    from: string,
    to: string,
    semantic: SemanticGraphPlatformSemantic,
    label?: string,
  ) => {
    edges.push({
      id: platformEdgeId(from, semantic, to),
      from,
      to,
      semantic,
      category: categoryForSemantic(semantic),
      provenance: "platform-integration",
      inferred: false,
      weight: weightForSemantic(semantic, false),
      label,
    });
  };

  for (const molecule of molecules) {
    for (const relation of molecule.labRelations) {
      const feature = platformFeatures.find((item) => item.id === relation.id);
      if (feature) {
        addPlatformEdge(
          `molecule:${molecule.id}`,
          platformNodeId(feature),
          "practice-with",
          "label" in relation && typeof relation.label === "string"
            ? relation.label
            : undefined,
        );
      }
    }
  }

  for (const mechanism of mechanisms) {
    addPlatformEdge(`mechanism:${mechanism.id}`, "lab:curved-arrow-designer", "practice-with");
    addPlatformEdge(`mechanism:${mechanism.id}`, "reference:reagents", "reference-with");
    for (const nodeId of mechanism.prerequisiteNodeIds) {
      addPlatformEdge(`mechanism:${mechanism.id}`, nodeId, "requires-resource");
    }
  }

  for (const reaction of reactions) {
    for (const nodeId of reaction.prerequisiteNodeIds) {
      addPlatformEdge(`reaction:${reaction.id}`, nodeId, "requires-resource");
    }
  }

  for (const entry of functionalGroups) {
    for (const lab of entry.relatedLabs) {
      const feature = platformFeatures.find((item) => item.href === lab.href);
      if (feature) {
        addPlatformEdge(
          `functional-group:${entry.slug}`,
          platformNodeId(feature),
          "practice-with",
          lab.label,
        );
      }
    }
  }

  const byId = new Map<string, SemanticGraphEdge>();
  for (const edge of edges) {
    const existing = byId.get(edge.id);
    if (!existing || (existing.inferred && !edge.inferred)) byId.set(edge.id, edge);
  }
  return [...byId.values()];
}

export function generateSemanticGraph(): SemanticGraph {
  return {
    nodes: generateSemanticGraphNodes(),
    edges: generateSemanticGraphEdges(),
  };
}
