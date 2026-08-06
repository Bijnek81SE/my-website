import Image from "next/image";
import { LessonPage, LessonSection } from "@/components/Lesson";
import { getLessonBySlug } from "@/content/lessons";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

const lesson = getLessonBySlug("formal-charge");

export const metadata: Metadata = createPageMetadata({
  title: lesson.title,
  description: lesson.description,
  path: lesson.href,
  type: "article",
  keywords: [lesson.module, "organic chemistry lesson"],
});

const tableOfContents = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Learning objectives" },
  { id: "formula", label: "Formal-charge formula" },
  { id: "method", label: "Three-step method" },
  { id: "examples", label: "Worked examples" },
  { id: "best-structure", label: "Choosing the best structure" },
  { id: "common-patterns", label: "Common patterns" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "summary", label: "Summary" },
  { id: "practice", label: "Practice questions" },
  { id: "references", label: "References" },
];

export default function FormalChargePage() {
  return (
    <LessonPage lesson={lesson} tableOfContents={tableOfContents}>
      <LessonSection id="overview" title="Overview">
        <p>
          Formal charge is a bookkeeping tool used to compare possible Lewis
          structures. It does not represent the complete physical charge on an
          atom. Instead, it assigns bonding electrons equally between bonded
          atoms and asks how many electrons each atom appears to own.
        </p>

        <p className="mt-5">
          Formal charge is especially useful when a molecule or ion can be drawn
          in more than one way, when resonance contributors are compared, or
          when the location of a positive or negative charge must be identified.
        </p>

        <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Image
            src="/images/formal-charge/formal-charge-overview.svg"
            alt="Visual explanation of how valence, nonbonding, and bonding electrons determine formal charge"
            width={1200}
            height={720}
            className="h-auto w-full"
            priority
          />
          <figcaption className="border-t border-slate-200 px-6 py-4 text-sm text-slate-600">
            Formal charge compares an atom&apos;s normal valence-electron count
            with the electrons assigned to it in a Lewis structure.
          </figcaption>
        </figure>
      </LessonSection>

      <section
        id="objectives"
        className="mt-12 scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-6"
      >
        <h2 className="text-xl font-bold text-slate-900">Learning objectives</h2>
        <ul className="mt-4 space-y-3">
          {[
            "Calculate the formal charge on an atom in a Lewis structure.",
            "Distinguish formal charge from oxidation state and partial charge.",
            "Check that individual formal charges add to the overall charge.",
            "Use formal charge to compare alternative Lewis structures.",
            "Recognise common neutral and charged bonding patterns for C, N, O, and halogens.",
          ].map((objective) => (
            <li key={objective} className="flex gap-3">
              <span className="font-bold text-blue-700" aria-hidden="true">✓</span>
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </section>

      <LessonSection id="formula" title="The formal-charge formula">
        <p>
          For one atom, formal charge is calculated from its valence electrons,
          nonbonding electrons, and bonding electrons.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-center text-lg font-semibold text-white sm:text-2xl">
          Formal charge = valence electrons − nonbonding electrons − ½(bonding electrons)
        </div>

        <p className="mt-6">
          A useful shortcut is to count bonds rather than bonding electrons.
          Because each bond contains two electrons, half of the bonding
          electrons is equal to the number of bond lines attached to the atom.
        </p>

        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="font-semibold text-slate-900">Shortcut</p>
          <p className="mt-2">
            Formal charge = valence electrons − lone-pair electrons − number of bonds
          </p>
        </div>
      </LessonSection>

      <LessonSection id="method" title="A reliable three-step method">
        <ol className="space-y-5">
          {[
            ["Find the valence-electron count", "Use the element's periodic-table group for a neutral atom."],
            ["Count assigned electrons", "Count every nonbonding electron and one electron from each bond line."],
            ["Subtract and check", "Subtract assigned electrons from valence electrons, then confirm that all formal charges add to the species' overall charge."],
          ].map(([title, description], index) => (
            <li key={title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-1">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </LessonSection>

      <LessonSection id="examples" title="Worked examples">
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Image
            src="/images/formal-charge/worked-examples.svg"
            alt="Worked formal-charge examples for oxygen in water, nitrogen in ammonium, oxygen in hydroxide, and carbon in a carbocation"
            width={1200}
            height={760}
            className="h-auto w-full"
          />
          <figcaption className="border-t border-slate-200 px-6 py-4 text-sm text-slate-600">
            Count lone-pair electrons and bond lines directly from the Lewis structure.
          </figcaption>
        </figure>

        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="text-lg font-semibold text-slate-900">Oxygen in water, H₂O</h3>
            <p className="mt-2">Oxygen has 6 valence electrons, 4 lone-pair electrons, and 2 bonds.</p>
            <p className="mt-3 font-semibold text-blue-800">FC = 6 − 4 − 2 = 0</p>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="text-lg font-semibold text-slate-900">Nitrogen in ammonium, NH₄⁺</h3>
            <p className="mt-2">Nitrogen has 5 valence electrons, no lone-pair electrons, and 4 bonds.</p>
            <p className="mt-3 font-semibold text-blue-800">FC = 5 − 0 − 4 = +1</p>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="text-lg font-semibold text-slate-900">Oxygen in hydroxide, OH⁻</h3>
            <p className="mt-2">Oxygen has 6 valence electrons, 6 lone-pair electrons, and 1 bond.</p>
            <p className="mt-3 font-semibold text-blue-800">FC = 6 − 6 − 1 = −1</p>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="best-structure" title="Choosing the best Lewis structure">
        <p>
          Formal charge helps rank alternative Lewis structures. The most useful
          structure usually follows several guidelines at the same time.
        </p>

        <ul className="mt-6 list-disc space-y-3 pl-7 marker:text-blue-700">
          <li>Prefer structures with the smallest magnitudes of formal charge.</li>
          <li>Prefer minimal separation of opposite charges.</li>
          <li>Place negative formal charge on the more electronegative atom when possible.</li>
          <li>Respect normal valence and octet rules whenever they apply.</li>
          <li>Ensure that the sum of all formal charges equals the overall charge.</li>
        </ul>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-slate-900">Important limitation</h3>
          <p className="mt-2">
            Formal-charge rules are guidelines, not a substitute for resonance,
            electronegativity, orbital overlap, or experimental evidence.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="common-patterns" title="Common formal-charge patterns">
        <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-base">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Atom</th>
                <th className="px-5 py-4 font-semibold">Neutral pattern</th>
                <th className="px-5 py-4 font-semibold">Common charged pattern</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-medium">Carbon</td>
                <td className="px-5 py-4">4 bonds, 0 lone pairs</td>
                <td className="px-5 py-4">3 bonds: often +1; 3 bonds + lone pair: often −1</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium">Nitrogen</td>
                <td className="px-5 py-4">3 bonds, 1 lone pair</td>
                <td className="px-5 py-4">4 bonds: often +1; 2 bonds + 2 lone pairs: often −1</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium">Oxygen</td>
                <td className="px-5 py-4">2 bonds, 2 lone pairs</td>
                <td className="px-5 py-4">3 bonds: often +1; 1 bond + 3 lone pairs: often −1</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium">Halogen</td>
                <td className="px-5 py-4">1 bond, 3 lone pairs</td>
                <td className="px-5 py-4">0 bonds + 4 lone pairs: −1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LessonSection>

      <LessonSection id="mistakes" title="Common mistakes">
        <div className="space-y-5">
          {[
            ["Counting lone pairs instead of lone-pair electrons", "One lone pair contains two electrons. Use the number of electrons in the formula."],
            ["Counting a double bond as one bond", "The shortcut counts bond lines. A double bond contributes two, and a triple bond contributes three."],
            ["Forgetting the overall-charge check", "The sum of all formal charges must equal the charge written for the molecule or ion."],
            ["Confusing formal charge with partial charge", "Formal charge is integer bookkeeping. Partial charge reflects unequal electron density and is usually written with δ."],
          ].map(([title, description]) => (
            <div key={title} className="rounded-xl border border-rose-200 bg-rose-50 p-5">
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2">{description}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="summary" title="Summary">
        <div className="rounded-2xl bg-slate-900 p-6 text-slate-100">
          <p>
            Formal charge assigns electrons by splitting every bond equally.
            Calculate it from valence electrons, lone-pair electrons, and bond
            lines. Use the results to check overall charge, recognise common
            bonding patterns, and compare alternative Lewis structures.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="practice" title="Practice questions">
        <ol className="list-decimal space-y-4 pl-7 marker:font-semibold marker:text-blue-700">
          <li>Calculate the formal charge on oxygen in H₃O⁺.</li>
          <li>Calculate the formal charge on nitrogen in NH₂⁻.</li>
          <li>What is the formal charge on carbon in CH₃⁺?</li>
          <li>Why must all formal charges add to the overall molecular or ionic charge?</li>
          <li>Which is usually preferred: a structure with charges of +2 and −2, or one with +1 and −1?</li>
          <li>Why is negative formal charge usually more stable on oxygen than on carbon?</li>
        </ol>
      </LessonSection>

      <LessonSection id="references" title="References and further reading">
        <ul className="list-disc space-y-3 pl-7">
          <li>Clayden, J., Greeves, N., and Warren, S. <em>Organic Chemistry</em>.</li>
          <li>McMurry, J. <em>Organic Chemistry</em>.</li>
          <li>Solomons, T. W. G., Fryhle, C. B., and Snyder, S. A. <em>Organic Chemistry</em>.</li>
          <li>IUPAC Compendium of Chemical Terminology—the Gold Book.</li>
        </ul>
      </LessonSection>
    </LessonPage>
  );
}
