import type { Metadata } from "next";
import ModuleCard from "@/components/ui/ModuleCard";

export const metadata: Metadata = {
  title: "Organic Chemistry Curriculum",
  description: "Follow a structured, visual organic chemistry curriculum from foundations to synthesis.",
};

const modules = [
  {
    number: "01",
    title: "Foundations",
    description: "Build the atomic and electronic foundation needed to understand structure and reactivity.",
    lessons: 7,
    duration: "about 80 min",
    href: "/learn/fundamentals/what-is-organic-chemistry",
    status: "available" as const,
    topics: ["Atomic structure", "Bonding", "Hybridisation", "Lewis structures", "Resonance"],
  },
  {
    number: "02",
    title: "Functional Groups",
    description: "Recognise the structural patterns that control physical properties and common reactions.",
    lessons: 10,
    duration: "about 2 hours",
    status: "coming-soon" as const,
    topics: ["Hydrocarbons", "Alcohols", "Carbonyls", "Carboxylic acids", "Amines"],
  },
  {
    number: "03",
    title: "Acids, Bases & Reactivity",
    description: "Connect pKa, equilibrium, nucleophilicity, electrophilicity, and curved-arrow notation.",
    lessons: 9,
    duration: "about 2 hours",
    status: "coming-soon" as const,
    topics: ["pKa", "Conjugate pairs", "Nucleophiles", "Electrophiles", "Arrow pushing"],
  },
  {
    number: "04",
    title: "Stereochemistry",
    description: "Understand three-dimensional structure, chirality, conformations, and stereochemical notation.",
    lessons: 11,
    duration: "about 3 hours",
    status: "coming-soon" as const,
    topics: ["Chirality", "R/S", "E/Z", "Conformations", "Cyclohexane"],
  },
  {
    number: "05",
    title: "Reaction Mechanisms",
    description: "Use electron flow to understand substitution, elimination, addition, and rearrangements.",
    lessons: 16,
    duration: "about 4 hours",
    status: "coming-soon" as const,
    topics: ["SN1", "SN2", "E1", "E2", "Electrophilic addition"],
  },
  {
    number: "06",
    title: "Spectroscopy & Synthesis",
    description: "Identify structures from spectra and combine reactions into efficient synthetic routes.",
    lessons: 14,
    duration: "about 4 hours",
    status: "coming-soon" as const,
    topics: ["IR", "NMR", "Mass spectrometry", "Retrosynthesis", "Route design"],
  },
];

export default function LearnPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.18),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">Course curriculum</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">A clear path through organic chemistry.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Start with structure and bonding, then progress through reactivity, mechanisms, stereochemistry, spectroscopy, and synthesis.</p>
          <div className="mt-9 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">67 planned lessons</span>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">6 structured modules</span>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">Visual-first explanations</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {modules.map((module) => <ModuleCard key={module.number} {...module} />)}
        </div>
      </section>
    </main>
  );
}
