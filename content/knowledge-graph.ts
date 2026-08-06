import { lessons } from "./lesson-registry";
import { reactions } from "./reactions";
import { functionalGroups, reagents } from "./references";
import type {
  KnowledgeConnection,
  KnowledgeNode,
  KnowledgeRelation,
  KnowledgeRelationKind,
} from "./knowledge-types";

const lessonNodes: KnowledgeNode[] = lessons.map((lesson) => ({
  id: `lesson:${lesson.slug}`,
  kind: "lesson",
  title: lesson.title,
  description: lesson.description,
  href: lesson.href,
  keywords: [lesson.module, lesson.slug.replaceAll("-", " ")],
}));

const mechanismNodes: KnowledgeNode[] = [
  ["sn1", "SN1 substitution", "Stepwise substitution through a carbocation intermediate.", "/lab/sn1-mechanism"],
  ["sn2", "SN2 substitution", "Concerted backside attack with leaving-group departure.", "/lab/sn2-mechanism"],
  ["e1", "E1 elimination", "Stepwise elimination through a carbocation intermediate.", "/lab/e1-mechanism"],
  ["e2", "E2 elimination", "Concerted elimination driven by a strong base.", "/lab/e2-mechanism"],
  ["electrophilic-addition", "Electrophilic addition", "Addition to an alkene through an electrophilic first step.", "/lab/electrophilic-addition"],
  ["hydrohalogenation", "Hydrohalogenation", "Addition of HX across an alkene.", "/lab/hydrohalogenation"],
  ["hydration", "Acid-catalysed hydration", "Addition of water across an alkene under acidic conditions.", "/lab/hydration"],
  ["halogenation", "Halogenation", "Addition of halogen across a carbon-carbon double bond.", "/lab/halogenation"],
  ["hydrogenation", "Catalytic hydrogenation", "Reduction of an alkene with hydrogen and a metal catalyst.", "/lab/hydrogenation"],
  ["hydroboration-oxidation", "Hydroboration–oxidation", "Anti-Markovnikov hydration through hydroboration and oxidation.", "/lab/hydroboration-oxidation"],
  ["oxymercuration-demercuration", "Oxymercuration–demercuration", "Markovnikov hydration without carbocation rearrangement.", "/lab/oxymercuration-demercuration"],
  ["radical-hbr", "Radical HBr addition", "Peroxide-promoted anti-Markovnikov addition of HBr.", "/lab/radical-hbr-addition"],
].map(([id, title, description, href]) => ({
  id: `mechanism:${id}`,
  kind: "mechanism" as const,
  title,
  description,
  href,
}));

const reactionNodes: KnowledgeNode[] = reactions.map((reaction) => ({
  id: `reaction:${reaction.id}`,
  kind: "reaction",
  title: reaction.title,
  description: reaction.description,
  href: "/reactions",
  keywords: [...reaction.keywords, reaction.family, reaction.mechanismClass],
}));


const referenceEntryNodes: KnowledgeNode[] = [
  ...functionalGroups.map((entry) => ({
    id: `functional-group:${entry.slug}`,
    kind: "functional-group" as const,
    title: entry.name,
    description: entry.summary,
    href: `/functional-groups/${entry.slug}`,
    keywords: entry.keywords,
  })),
  ...reagents.map((entry) => ({
    id: `reagent:${entry.slug}`,
    kind: "reagent" as const,
    title: entry.name,
    description: entry.summary,
    href: `/reagents/${entry.slug}`,
    keywords: entry.keywords,
  })),
];

const sharedNodes: KnowledgeNode[] = [
  {
    id: "lab:spectroscopy",
    kind: "lab",
    title: "Interactive spectroscopy lab",
    description: "Connect molecular structures with realistic simulated NMR, IR, and mass spectra.",
    href: "/lab/spectroscopy",
    keywords: ["NMR", "IR", "mass spectrometry", "peak assignment"],
  },
  {
    id: "lab:functional-groups",
    kind: "lab",
    title: "Functional-group explorer",
    description: "Practise identifying common organic functional groups.",
    href: "/lab/functional-groups",
  },
  {
    id: "lab:curved-arrow-designer",
    kind: "lab",
    title: "Curved-arrow designer",
    description: "Practise drawing electron-flow arrows between sources and targets.",
    href: "/lab/curved-arrow-designer",
  },
  {
    id: "calculator:molecular-weight",
    kind: "calculator",
    title: "Molecular weight calculator",
    description: "Calculate molar mass and elemental composition from a formula.",
    href: "/calculators/molecular-weight",
  },
  {
    id: "calculator:molarity",
    kind: "calculator",
    title: "Molarity calculator",
    description: "Solve solution concentration, amount, mass, or volume.",
    href: "/calculators/molarity",
  },
  {
    id: "calculator:dilution",
    kind: "calculator",
    title: "Dilution calculator",
    description: "Plan stock and final solution dilutions.",
    href: "/calculators/dilution",
  },
  {
    id: "calculator:stoichiometry",
    kind: "calculator",
    title: "Stoichiometry calculator",
    description: "Scale reactions with balanced-equation mole ratios.",
    href: "/calculators/stoichiometry",
  },
  {
    id: "calculator:limiting-reagent",
    kind: "calculator",
    title: "Limiting reagent calculator",
    description: "Identify limiting and excess reactants and theoretical yield.",
    href: "/calculators/limiting-reagent",
  },
  {
    id: "calculator:percent-yield",
    kind: "calculator",
    title: "Percent yield calculator",
    description: "Compare actual and theoretical product yields.",
    href: "/calculators/percent-yield",
  },
  {
    id: "calculator:lewis-builder",
    kind: "calculator",
    title: "Lewis structure builder",
    description: "Build and inspect Lewis structures interactively.",
    href: "/calculators/lewis-structure-builder",
  },
  {
    id: "reference:functional-groups",
    kind: "reference",
    title: "Functional groups",
    description: "Reference functional-group structures and characteristic reactivity.",
    href: "/functional-groups",
  },
  {
    id: "reference:reagents",
    kind: "reference",
    title: "Reagents",
    description: "Connect reagent classes with selectivity and synthetic purpose.",
    href: "/reagents",
  },
  {
    id: "reference:named-reactions",
    kind: "reference",
    title: "Named reactions",
    description: "Explore transformations by mechanism and synthetic purpose.",
    href: "/named-reactions",
  },
];

export const knowledgeNodes: readonly KnowledgeNode[] = [
  ...lessonNodes,
  ...mechanismNodes,
  ...reactionNodes,
  ...referenceEntryNodes,
  ...sharedNodes,
];

const lessonSequenceRelations: KnowledgeRelation[] = lessons.flatMap((lesson, index) => {
  const relations: KnowledgeRelation[] = [];
  if (index > 0) {
    relations.push({
      from: `lesson:${lesson.slug}`,
      to: `lesson:${lessons[index - 1].slug}`,
      kind: "prerequisite",
    });
  }
  if (index < lessons.length - 1) {
    relations.push({
      from: `lesson:${lesson.slug}`,
      to: `lesson:${lessons[index + 1].slug}`,
      kind: "study-next",
    });
  }
  return relations;
});

export const knowledgeRelations: readonly KnowledgeRelation[] = [
  ...lessonSequenceRelations,
  { from: "lesson:atomic-structure", to: "calculator:molecular-weight", kind: "practice" },
  { from: "lesson:chemical-bonding", to: "calculator:molarity", kind: "practice" },
  { from: "lesson:chemical-bonding", to: "calculator:dilution", kind: "practice" },
  { from: "reaction:sn2", to: "calculator:stoichiometry", kind: "practice" },
  { from: "reaction:sn1", to: "calculator:limiting-reagent", kind: "practice" },
  { from: "reaction:hydrogenation", to: "calculator:percent-yield", kind: "practice" },
  { from: "lesson:lewis-structures", to: "calculator:lewis-builder", kind: "practice" },
  { from: "lesson:formal-charge", to: "calculator:lewis-builder", kind: "practice" },
  { from: "lesson:resonance", to: "lab:curved-arrow-designer", kind: "practice" },
  { from: "lesson:chemical-bonding", to: "lab:spectroscopy", kind: "study-next" },
  { from: "lesson:hybridization", to: "lab:spectroscopy", kind: "practice" },
  { from: "reference:functional-groups", to: "lab:spectroscopy", kind: "practice" },
  { from: "lesson:chemical-bonding", to: "lesson:hybridization", kind: "related" },
  { from: "lesson:hybridization", to: "lesson:resonance", kind: "related" },
  { from: "reference:functional-groups", to: "lab:functional-groups", kind: "practice" },
  { from: "reference:functional-groups", to: "lesson:chemical-bonding", kind: "prerequisite" },
  { from: "reference:reagents", to: "reference:named-reactions", kind: "related" },
  { from: "reference:named-reactions", to: "reference:reagents", kind: "related" },
  ...mechanismNodes.flatMap((node) => [
    { from: node.id, to: "lesson:chemical-bonding", kind: "prerequisite" as const },
    { from: node.id, to: "lesson:resonance", kind: "prerequisite" as const },
    { from: node.id, to: "lab:curved-arrow-designer", kind: "practice" as const },
    { from: node.id, to: "reference:reagents", kind: "reference" as const },
  ]),
  { from: "mechanism:sn1", to: "mechanism:e1", kind: "related" },
  { from: "mechanism:sn2", to: "mechanism:e2", kind: "related" },
  { from: "mechanism:hydrohalogenation", to: "mechanism:hydration", kind: "related" },
  { from: "mechanism:hydration", to: "mechanism:oxymercuration-demercuration", kind: "related" },
  { from: "mechanism:hydroboration-oxidation", to: "mechanism:radical-hbr", kind: "related" },
  { from: "mechanism:hydrogenation", to: "reference:reagents", kind: "uses", label: "H₂ and metal catalyst" },

  ...functionalGroups.flatMap((entry) => [
    { from: `functional-group:${entry.slug}`, to: "reference:functional-groups", kind: "reference" as const },
    ...entry.relatedLabs.map((item) => ({ from: `functional-group:${entry.slug}`, to: item.href.includes("functional-groups") ? "lab:functional-groups" : "lab:curved-arrow-designer", kind: "practice" as const })),
  ]),
  ...reagents.map((entry) => ({ from: `reagent:${entry.slug}`, to: "reference:reagents", kind: "reference" as const })),
  ...reactions.flatMap((reaction) => [
    { from: `reaction:${reaction.id}`, to: `mechanism:${reaction.id}`, kind: "practice" as const },
    { from: `reaction:${reaction.id}`, to: "reference:reagents", kind: "reference" as const },
    ...reaction.prerequisiteNodeIds.map((to) => ({ from: `reaction:${reaction.id}`, to, kind: "prerequisite" as const })),
    ...reaction.relatedReactionIds.map((id) => ({ from: `reaction:${reaction.id}`, to: `reaction:${id}`, kind: "related" as const })),
  ]),
];

const nodesById = new Map(knowledgeNodes.map((node) => [node.id, node]));

export function getKnowledgeNode(id: string): KnowledgeNode | undefined {
  return nodesById.get(id);
}

export function getKnowledgeConnections(
  id: string,
  kinds?: readonly KnowledgeRelationKind[],
): readonly KnowledgeConnection[] {
  const allowed = kinds ? new Set(kinds) : null;
  return knowledgeRelations
    .filter((relation) => relation.from === id && (!allowed || allowed.has(relation.kind)))
    .map((relation) => ({ relation, node: nodesById.get(relation.to) }))
    .filter((connection): connection is KnowledgeConnection => Boolean(connection.node));
}

export function getKnowledgeNodeIdForLesson(slug: string): string {
  return `lesson:${slug}`;
}
