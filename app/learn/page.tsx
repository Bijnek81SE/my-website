import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn Organic Chemistry | Organic Chemistry Hub",
  description:
    "Follow a structured organic chemistry curriculum covering fundamentals, stereochemistry, mechanisms, spectroscopy, laboratory methods, and synthesis.",
};

const modules = [
  {
    title: "Fundamentals",
    description:
      "Begin with atoms, bonding, hybridization, resonance, acids and bases, and functional groups.",
    href: "/learn/fundamentals/what-is-organic-chemistry",
    status: "In progress",
  },
  {
    title: "Stereochemistry",
    description:
      "Study chirality, enantiomers, diastereomers, conformations, and stereochemical nomenclature.",
    href: "#",
    status: "Coming soon",
  },
  {
    title: "Reaction Mechanisms",
    description:
      "Learn curved-arrow notation, reactive intermediates, substitution, elimination, and addition reactions.",
    href: "#",
    status: "Coming soon",
  },
  {
    title: "Spectroscopy",
    description:
      "Interpret IR, NMR, and mass spectra to identify organic structures.",
    href: "#",
    status: "Coming soon",
  },
  {
    title: "Laboratory Methods",
    description:
      "Explore extraction, recrystallization, distillation, chromatography, and safe laboratory practice.",
    href: "#",
    status: "Coming soon",
  },
  {
    title: "Organic Synthesis",
    description:
      "Develop retrosynthetic thinking, reagent selection, protecting-group strategies, and route design.",
    href: "#",
    status: "Coming soon",
  },
];

export default function LearnPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Structured curriculum
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Learn organic chemistry step by step
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Build a strong foundation before progressing to reaction
            mechanisms, spectroscopy, laboratory methods, and multistep
            synthesis.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const available = module.href !== "#";

            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    {module.title}
                  </h2>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      available
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {module.status}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-slate-600">
                  {module.description}
                </p>

                <p className="mt-6 text-sm font-semibold text-blue-700">
                  {available ? "Start module →" : "Content in development"}
                </p>
              </>
            );

            return available ? (
              <Link
                key={module.title}
                href={module.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                {content}
              </Link>
            ) : (
              <article
                key={module.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 opacity-80"
              >
                {content}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}