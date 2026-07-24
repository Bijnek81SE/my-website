import type { Metadata } from "next";
import Link from "next/link";
import LessonHeader from "@/components/Lesson/LessonHeader";
import LessonTableOfContents from "@/components/Lesson/LessonTableOfContents";
import LessonSection from "@/components/Lesson/LessonSection";
import LessonNavigation from "@/components/Lesson/LessonNavigation";

export const metadata: Metadata = {
  title: "What Is Organic Chemistry? | Organic Chemistry Hub",
  description:
    "Learn what organic chemistry is, why carbon is unique, and why organic chemistry matters in medicine, biology, materials, and everyday life.",
};

const tableOfContents = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Learning objectives" },
  { id: "carbon", label: "What makes carbon unique?" },
  { id: "organic-inorganic", label: "Organic vs. inorganic" },
  { id: "classes", label: "Major classes" },
  { id: "importance", label: "Why Organic Chemistry Matters" },
  { id: "misconceptions", label: "Common misconceptions" },
  { id: "summary", label: "Summary" },
  { id: "practice", label: "Practice questions" },
  { id: "references", label: "References" },
];

export default function WhatIsOrganicChemistryPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500"
      >
        <Link href="/learn" className="hover:text-blue-700">
          Learn
        </Link>

        <span aria-hidden="true">/</span>
        <span>Fundamentals</span>

        <span aria-hidden="true">/</span>
        <span className="text-slate-700">What Is Organic Chemistry?</span>
      </nav>

      <LessonHeader
        category="Fundamentals"
        title="What Is Organic Chemistry?"
        description="Organic chemistry is the study of carbon-containing compounds, their structures, properties, reactions, and synthesis."
        readingTime="8 min"
      />

      <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_240px]">
        <article className="min-w-0 text-lg leading-8 text-slate-700">
          <LessonSection id="overview" title="Overview">
            <p>
              Organic chemistry is the branch of chemistry concerned with the
              structure, properties, reactions, and synthesis of
              carbon-containing compounds. Carbon&apos;s ability to form stable
              covalent bonds with itself and many other elements allows an
              extraordinary variety of molecules to exist.
            </p>

            <p className="mt-5">
              Organic compounds include many familiar substances, such as fuels,
              medicines, plastics, dyes, fragrances, carbohydrates, proteins,
              and DNA.
            </p>
          </LessonSection>

          <section
            id="objectives"
            className="mt-12 scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-6"
          >
            <h2 className="text-xl font-bold text-slate-900">
              Learning objectives
            </h2>

            <ul className="mt-4 space-y-3">
              {[
                "Define organic chemistry.",
                "Explain why carbon can form so many different compounds.",
                "Recognize major classes of organic compounds.",
                "Distinguish organic compounds from common inorganic carbon compounds.",
                "Describe why organic chemistry matters in science and everyday life.",
              ].map((objective) => (
                <li key={objective} className="flex gap-3">
                  <span
                    className="font-bold text-blue-700"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </section>

          <LessonSection id="carbon" title="What makes carbon unique?">
            <p>
              Carbon is especially versatile because a neutral carbon atom can
              form four covalent bonds. It can bond strongly to other carbon
              atoms and to elements such as hydrogen, oxygen, nitrogen, sulfur,
              phosphorus, and the halogens.
            </p>

            <ul className="mt-6 list-disc space-y-3 pl-7 marker:text-blue-700">
              <li>Carbon can form single, double, and triple bonds.</li>
              <li>Carbon atoms can form chains, branches, and rings.</li>
              <li>
                Carbon-carbon bonds are strong enough to create stable
                molecules.
              </li>
              <li>
                Different three-dimensional arrangements can produce compounds
                with different properties.
              </li>
            </ul>
          </LessonSection>

          <LessonSection
            id="organic-inorganic"
            title="Organic and inorganic carbon compounds"
          >
            <p>
              Most carbon-containing compounds are studied in organic
              chemistry, but several classes are traditionally treated as
              inorganic. Common examples include carbon monoxide, carbon
              dioxide, carbonates, bicarbonates, and many carbides.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-left text-base">
                <thead className="bg-slate-100 text-slate-900">
                  <tr>
                    <th className="px-5 py-4 font-semibold">
                      Organic examples
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      Traditionally inorganic examples
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-5 py-4">Methane and ethanol</td>
                    <td className="px-5 py-4">
                      Carbon monoxide and carbon dioxide
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Benzene and acetone</td>
                    <td className="px-5 py-4">
                      Carbonates and bicarbonates
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Glucose and amino acids</td>
                    <td className="px-5 py-4">Many metal carbides</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </LessonSection>

          <LessonSection
            id="classes"
            title="Major classes of organic compounds"
          >
            <p>
              Organic compounds are commonly grouped according to their
              functional groups. A functional group is a specific arrangement
              of atoms that strongly influences a molecule&apos;s properties and
              reactions.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Alkanes, alkenes, and alkynes",
                "Aromatic compounds",
                "Alcohols and ethers",
                "Aldehydes and ketones",
                "Carboxylic acids and esters",
                "Amines and amides",
              ].map((group) => (
                <div
                  key={group}
                  className="rounded-xl border border-slate-200 bg-white p-4 font-medium text-slate-900"
                >
                  {group}
                </div>
              ))}
            </div>
          </LessonSection>

          <LessonSection
            id="importance"
            title="Why organic chemistry matters"
          >
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Medicine
                </h3>
                <p className="mt-2">
                  Most pharmaceutical drugs are organic molecules designed to
                  interact with specific biological targets.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Biology
                </h3>
                <p className="mt-2">
                  Proteins, carbohydrates, lipids, DNA, and RNA are all based on
                  organic chemistry.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Materials and industry
                </h3>
                <p className="mt-2">
                  Plastics, synthetic fibres, coatings, adhesives, dyes, fuels,
                  and many advanced materials are organic compounds or
                  polymers.
                </p>
              </div>
            </div>
          </LessonSection>

          <LessonSection id="misconceptions" title="Common misconceptions">
            <div className="space-y-5">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  “Organic” always means natural
                </h3>
                <p className="mt-2">
                  In chemistry, organic compounds may be natural or synthetic.
                  The term does not mean that a substance was produced without
                  human intervention.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Every carbon compound is organic
                </h3>
                <p className="mt-2">
                  Several carbon compounds, including carbon dioxide and
                  carbonates, are conventionally classified as inorganic.
                </p>
              </div>
            </div>
          </LessonSection>

          <LessonSection id="summary" title="Summary">
            <div className="rounded-2xl bg-slate-900 p-6 text-slate-100">
              <p>
                Organic chemistry studies carbon-containing compounds and their
                structures, properties, reactions, and synthesis.
                Carbon&apos;s ability to form four bonds and connect into chains
                and rings produces an enormous range of molecules essential to
                life, medicine, energy, and materials.
              </p>
            </div>
          </LessonSection>

          <LessonSection id="practice" title="Practice questions">
            <ol className="list-decimal space-y-4 pl-7 marker:font-semibold marker:text-blue-700">
              <li>What does organic chemistry study?</li>
              <li>Why can carbon form such a large variety of compounds?</li>
              <li>Name four major classes of organic compounds.</li>
              <li>
                Give three examples of carbon-containing compounds traditionally
                classified as inorganic.
              </li>
              <li>
                Explain one way organic chemistry contributes to medicine or
                biology.
              </li>
            </ol>
          </LessonSection>

          <LessonSection id="references" title="References and further reading">
            <ul className="list-disc space-y-3 pl-7">
              <li>
                Clayden, J., Greeves, N., and Warren, S.{" "}
                <em>Organic Chemistry</em>.
              </li>
              <li>
                McMurry, J. <em>Organic Chemistry</em>.
              </li>
              <li>
                Solomons, T. W. G., Fryhle, C. B., and Snyder, S. A.{" "}
                <em>Organic Chemistry</em>.
              </li>
              <li>IUPAC Compendium of Chemical Terminology—the Gold Book.</li>
            </ul>
          </LessonSection>

          <LessonNavigation
            previous={{
              title: "Curriculum",
              href: "/learn",
            }}
            next={{
              title: "Atomic Structure",
              href: "/learn/fundamentals/atomic-structure",
            }}
          />
        </article>

        <LessonTableOfContents items={tableOfContents} />
      </div>
    </main>
  );
}