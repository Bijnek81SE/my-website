import { lessons } from "@/content/lesson-registry";
import { functionalGroups, reagents } from "@/content/references";

export type SearchCategory =
  | "Lesson"
  | "Mechanism"
  | "Lab"
  | "Calculator"
  | "Reference"
  | "Site";

export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  keywords: readonly string[];
};

const lessonEntries: readonly SearchEntry[] = lessons.map((lesson) => ({
  id: `lesson-${lesson.slug}`,
  title: lesson.title,
  description: lesson.description,
  href: lesson.href,
  category: "Lesson",
  keywords: [lesson.module, lesson.slug.replaceAll("-", " ")],
}));


const referenceEntries: readonly SearchEntry[] = [
  ...functionalGroups.map((entry) => ({
    id: `functional-group-${entry.slug}`,
    title: entry.name,
    description: entry.summary,
    href: `/functional-groups/${entry.slug}`,
    category: "Reference" as const,
    keywords: [entry.formula, entry.category, ...entry.keywords],
  })),
  ...reagents.map((entry) => ({
    id: `reagent-${entry.slug}`,
    title: entry.name,
    description: entry.summary,
    href: `/reagents/${entry.slug}`,
    category: "Reference" as const,
    keywords: [entry.formula, entry.category, ...entry.keywords],
  })),
];

const staticEntries: readonly SearchEntry[] = [
  {
    id: "retrosynthesis-planner",
    title: "Retrosynthesis planner",
    description: "Work backwards from target molecules, compare ranked disconnections, and validate routes with forward mechanisms.",
    href: "/lab/retrosynthesis",
    category: "Lab",
    keywords: ["retrosynthesis", "disconnection", "route planning", "precursors", "starting materials", "synthesis"],
  },
  {
    id: "reaction-prediction-lab",
    title: "Reaction prediction and synthesis lab",
    description: "Predict major products, explain selectivity, and build multi-step synthesis routes.",
    href: "/lab/reaction-prediction",
    category: "Lab",
    keywords: ["reaction prediction", "synthesis", "major product", "regioselectivity", "stereochemistry", "reagents"],
  },
  {
    id: "spectroscopy-lab",
    title: "Interactive spectroscopy lab",
    description: "Link molecular structure to realistic simulated 1H NMR, 13C NMR, IR, and mass spectra.",
    href: "/lab/spectroscopy",
    category: "Lab",
    keywords: ["spectroscopy", "NMR", "IR", "mass spectrometry", "peak assignment", "chemical shift"],
  },
  {
    id: "reaction-explorer",
    title: "Interactive reaction explorer",
    description: "Filter and compare substitution, elimination, and alkene addition reactions.",
    href: "/reactions",
    category: "Reference",
    keywords: ["reaction comparison", "SN1", "SN2", "E1", "E2", "alkene addition", "selectivity"],
  },
  {
    id: "study-dashboard",
    title: "Study dashboard",
    description: "Track progress, review due concepts, and continue your personalised study plan.",
    href: "/study",
    category: "Site",
    keywords: ["progress", "streak", "review", "spaced repetition", "continue studying"],
  },
  {
    id: "learn",
    title: "Learn organic chemistry",
    description: "Structured lessons covering the foundations of organic chemistry.",
    href: "/learn",
    category: "Site",
    keywords: ["curriculum", "fundamentals", "lessons"],
  },
  {
    id: "lab",
    title: "Interactive chemistry lab",
    description: "Mechanism players, molecular explorers, builders, and trainers.",
    href: "/lab",
    category: "Lab",
    keywords: ["interactive", "practice", "tools"],
  },
  {
    id: "sn1",
    title: "SN1 mechanism",
    description: "Explore the stepwise unimolecular nucleophilic substitution mechanism.",
    href: "/lab/sn1-mechanism",
    category: "Mechanism",
    keywords: ["substitution", "carbocation", "leaving group"],
  },
  {
    id: "sn2",
    title: "SN2 mechanism",
    description: "Follow backside attack and concerted leaving-group departure.",
    href: "/lab/sn2-mechanism",
    category: "Mechanism",
    keywords: ["substitution", "backside attack", "inversion"],
  },
  {
    id: "e1",
    title: "E1 mechanism",
    description: "Study unimolecular elimination through a carbocation intermediate.",
    href: "/lab/e1-mechanism",
    category: "Mechanism",
    keywords: ["elimination", "carbocation", "alkene"],
  },
  {
    id: "e2",
    title: "E2 mechanism",
    description: "Study concerted bimolecular elimination and anti-periplanar geometry.",
    href: "/lab/e2-mechanism",
    category: "Mechanism",
    keywords: ["elimination", "anti periplanar", "alkene"],
  },
  {
    id: "electrophilic-addition",
    title: "Electrophilic addition",
    description: "Explore electron flow during addition reactions of alkenes.",
    href: "/lab/electrophilic-addition",
    category: "Mechanism",
    keywords: ["alkene", "pi bond", "addition"],
  },
  {
    id: "hybridization-lab",
    title: "Hybridization explorer",
    description: "Connect hybridization, orbital geometry, and sigma and pi bonding.",
    href: "/lab/hybridization",
    category: "Lab",
    keywords: ["sp", "sp2", "sp3", "geometry"],
  },
  {
    id: "molecular-geometry",
    title: "Molecular geometry explorer",
    description: "Explore molecular shapes and electron-domain geometry.",
    href: "/lab/molecular-geometry",
    category: "Lab",
    keywords: ["vsepr", "shape", "bond angle"],
  },
  {
    id: "molecular-polarity",
    title: "Molecular polarity explorer",
    description: "Relate bond dipoles and molecular geometry to overall polarity.",
    href: "/lab/molecular-polarity",
    category: "Lab",
    keywords: ["dipole", "polar", "nonpolar"],
  },
  {
    id: "functional-groups-lab",
    title: "Functional groups explorer",
    description: "Identify and compare common organic functional groups.",
    href: "/lab/functional-groups",
    category: "Lab",
    keywords: ["alcohol", "ketone", "aldehyde", "amine"],
  },
  {
    id: "molecular-weight-calculator",
    title: "Molecular weight calculator",
    description: "Calculate molar mass and elemental composition from a molecular formula.",
    href: "/calculators/molecular-weight",
    category: "Calculator",
    keywords: ["molar mass", "molecular formula", "atomic weight", "composition"],
  },
  {
    id: "molarity-calculator",
    title: "Molarity and solution preparation",
    description: "Solve concentration, amount, solute mass, or solution volume.",
    href: "/calculators/molarity",
    category: "Calculator",
    keywords: ["molarity", "concentration", "solution", "moles", "mass"],
  },
  {
    id: "dilution-calculator",
    title: "Dilution calculator",
    description: "Plan stock-solution dilutions with C1V1 = C2V2.",
    href: "/calculators/dilution",
    category: "Calculator",
    keywords: ["dilution", "stock solution", "C1V1", "C2V2"],
  },
  {
    id: "stoichiometry-calculator",
    title: "Stoichiometry calculator",
    description: "Convert reactant amount to expected product amount using mole ratios.",
    href: "/calculators/stoichiometry",
    category: "Calculator",
    keywords: ["stoichiometry", "mole ratio", "reaction scale", "balanced equation"],
  },
  {
    id: "limiting-reagent-calculator",
    title: "Limiting reagent calculator",
    description: "Identify the limiting reactant and theoretical product yield.",
    href: "/calculators/limiting-reagent",
    category: "Calculator",
    keywords: ["limiting reagent", "excess reagent", "theoretical yield"],
  },
  {
    id: "percent-yield-calculator",
    title: "Percent yield calculator",
    description: "Compare actual and theoretical product yields.",
    href: "/calculators/percent-yield",
    category: "Calculator",
    keywords: ["percent yield", "actual yield", "theoretical yield"],
  },
  {
    id: "lewis-builder",
    title: "Lewis structure builder",
    description: "Build and check Lewis structures interactively.",
    href: "/calculators/lewis-structure-builder",
    category: "Calculator",
    keywords: ["electrons", "formal charge", "octet"],
  },
  {
    id: "calculators",
    title: "Chemistry calculators",
    description: "Practical calculators and structure-building tools.",
    href: "/calculators",
    category: "Calculator",
    keywords: ["tools", "builder"],
  },
  {
    id: "functional-groups",
    title: "Functional groups reference",
    description: "Reference material for common organic functional groups.",
    href: "/functional-groups",
    category: "Reference",
    keywords: ["classification", "structure", "nomenclature"],
  },
  {
    id: "named-reactions",
    title: "Named reactions",
    description: "Reference collection for important named organic reactions.",
    href: "/named-reactions",
    category: "Reference",
    keywords: ["reaction", "mechanism", "synthesis"],
  },
  {
    id: "reagents",
    title: "Reagents",
    description: "Reference guides for common organic chemistry reagents.",
    href: "/reagents",
    category: "Reference",
    keywords: ["oxidation", "reduction", "conditions"],
  },
  {
    id: "resources",
    title: "Resources",
    description: "Study resources, references, and supporting material.",
    href: "/resources",
    category: "Reference",
    keywords: ["study", "books", "links"],
  },
  {
    id: "about",
    title: "About Organic Chemistry Hub",
    description: "Learn about the project, its goals, and its approach.",
    href: "/about",
    category: "Site",
    keywords: ["project", "mission"],
  },
  {
    id: "editorial-policy",
    title: "Editorial policy",
    description: "How educational content is researched, reviewed, and maintained.",
    href: "/editorial-policy",
    category: "Site",
    keywords: ["quality", "sources", "accuracy"],
  },
];

export const searchEntries: readonly SearchEntry[] = [
  {
    id: "organic-chemistry-workspace",
    title: "Organic Chemistry Workspace",
    description: "Keep a molecule synchronized across spectra, reaction planning, calculations, references, and notes.",
    href: "/workspace",
    category: "Site",
    keywords: ["workspace", "workbench", "molecule", "spectroscopy", "synthesis", "calculations", "notes"],
  },
  ...lessonEntries,
  ...referenceEntries,
  ...staticEntries,
];

function normalize(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreEntry(entry: SearchEntry, tokens: readonly string[], query: string): number {
  const title = normalize(entry.title);
  const description = normalize(entry.description);
  const keywords = normalize(entry.keywords.join(" "));
  const category = normalize(entry.category);
  let score = 0;

  if (title === query) score += 120;
  if (title.startsWith(query)) score += 70;
  if (title.includes(query)) score += 45;

  for (const token of tokens) {
    if (title.split(" ").includes(token)) score += 30;
    else if (title.includes(token)) score += 18;
    if (keywords.includes(token)) score += 10;
    if (description.includes(token)) score += 5;
    if (category.includes(token)) score += 3;
  }

  return score;
}

export function searchContent(query: string, limit = 8): readonly SearchEntry[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) return [];

  const tokens = normalizedQuery.split(" ").filter(Boolean);

  return searchEntries
    .map((entry) => ({ entry, score: scoreEntry(entry, tokens, normalizedQuery) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.entry.title.localeCompare(right.entry.title))
    .slice(0, limit)
    .map(({ entry }) => entry);
}
