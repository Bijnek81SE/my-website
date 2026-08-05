import type { Metadata } from "next";
import { Badge, Container, ModuleCard } from "@/components/ui";
import { getLessonsByModule } from "@/content/lesson-registry";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Organic Chemistry Curriculum',
  description: 'Follow a structured, visual organic chemistry curriculum from foundations to synthesis.',
  path: '/learn',
  keywords: ['organic chemistry curriculum', 'chemistry lessons'],
});

const fundamentalsLessons = getLessonsByModule("Fundamentals");

const modules = [
  {
    number: "01",
    title: "Foundations",
    description:
      "Build the atomic and electronic foundation needed to understand structure and reactivity.",
    lessons: fundamentalsLessons.length,
    duration: "about 80 min",
    href: fundamentalsLessons[0]?.href ?? "/learn",
    status: "available" as const,
    topics: [
      "Atomic structure",
      "Bonding",
      "Hybridisation",
      "Lewis structures",
      "Resonance",
    ],
  },
  {
    number: "02",
    title: "Functional Groups",
    description:
      "Recognise the structural patterns that control physical properties and common reactions.",
    lessons: 10,
    duration: "about 2 hours",
    status: "coming-soon" as const,
    topics: [
      "Hydrocarbons",
      "Alcohols",
      "Carbonyls",
      "Carboxylic acids",
      "Amines",
    ],
  },
  {
    number: "03",
    title: "Acids, Bases & Reactivity",
    description:
      "Connect pKa, equilibrium, nucleophilicity, electrophilicity, and curved-arrow notation.",
    lessons: 9,
    duration: "about 2 hours",
    status: "coming-soon" as const,
    topics: [
      "pKa",
      "Conjugate pairs",
      "Nucleophiles",
      "Electrophiles",
      "Arrow pushing",
    ],
  },
  {
    number: "04",
    title: "Stereochemistry",
    description:
      "Understand three-dimensional structure, chirality, conformations, and stereochemical notation.",
    lessons: 11,
    duration: "about 3 hours",
    status: "coming-soon" as const,
    topics: ["Chirality", "R/S", "E/Z", "Conformations", "Cyclohexane"],
  },
  {
    number: "05",
    title: "Reaction Mechanisms",
    description:
      "Use electron flow to understand substitution, elimination, addition, and rearrangements.",
    lessons: 16,
    duration: "about 4 hours",
    status: "coming-soon" as const,
    topics: ["SN1", "SN2", "E1", "E2", "Electrophilic addition"],
  },
  {
    number: "06",
    title: "Spectroscopy & Synthesis",
    description:
      "Identify structures from spectra and combine reactions into efficient synthetic routes.",
    lessons: 14,
    duration: "about 4 hours",
    status: "coming-soon" as const,
    topics: ["IR", "NMR", "Mass spectrometry", "Retrosynthesis", "Route design"],
  },
];

const plannedLessonCount = modules.reduce(
  (total, module) => total + module.lessons,
  0,
);

export default function LearnPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.18),transparent_28%)]" />
        <Container className="relative py-20 sm:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
            Course curriculum
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            A clear path through organic chemistry.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Start with structure and bonding, then progress through reactivity,
            mechanisms, stereochemistry, spectroscopy, and synthesis.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Badge className="border-slate-700 bg-slate-900/70 text-slate-300">
              {plannedLessonCount} planned lessons
            </Badge>
            <Badge className="border-slate-700 bg-slate-900/70 text-slate-300">
              {modules.length} structured modules
            </Badge>
            <Badge className="border-slate-700 bg-slate-900/70 text-slate-300">
              Visual-first explanations
            </Badge>
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {modules.map((module) => (
            <ModuleCard key={module.number} {...module} />
          ))}
        </div>
      </Container>
    </main>
  );
}
