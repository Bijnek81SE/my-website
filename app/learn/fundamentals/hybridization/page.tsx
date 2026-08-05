import type { Metadata } from "next";
import Image from "next/image";
import { LessonPage, LessonSection } from "@/components/Lesson";
import { getLessonBySlug } from "@/content/lesson-registry";
import { createPageMetadata } from "@/lib/seo";

const lesson = getLessonBySlug("hybridization");

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
  { id: "why-hybridization", label: "Why hybridization is useful" },
  { id: "steric-number", label: "Steric number" },
  { id: "sp3", label: "sp³ hybridization" },
  { id: "sp2", label: "sp² hybridization" },
  { id: "sp", label: "sp hybridization" },
  { id: "comparison", label: "Comparison" },
  { id: "identifying", label: "How to identify hybridization" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "summary", label: "Summary" },
  { id: "practice", label: "Practice questions" },
  { id: "references", label: "References" },
];

const comparison = [
  {
    hybridization: "sp³",
    orbitals: "1 s + 3 p",
    electronGroups: "4",
    geometry: "Tetrahedral",
    idealAngle: "109.5°",
    unhybridizedP: "0",
    example: "CH₄",
  },
  {
    hybridization: "sp²",
    orbitals: "1 s + 2 p",
    electronGroups: "3",
    geometry: "Trigonal planar",
    idealAngle: "120°",
    unhybridizedP: "1",
    example: "C₂H₄",
  },
  {
    hybridization: "sp",
    orbitals: "1 s + 1 p",
    electronGroups: "2",
    geometry: "Linear",
    idealAngle: "180°",
    unhybridizedP: "2",
    example: "C₂H₂",
  },
];

export default function HybridizationPage() {
  return (
    <LessonPage lesson={lesson} tableOfContents={tableOfContents}>
      <LessonSection id="overview" title="Overview">
        <p>
          Hybridization is a bonding model that combines atomic orbitals on the
          same atom to form new, directional orbitals. These hybrid orbitals help
          explain the shapes and bond angles observed in organic molecules.
        </p>

        <p className="mt-5">
          The three most important types for carbon are sp³, sp², and sp. Each
          corresponds to a different number of electron groups and a different
          geometry.
        </p>

        <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/hybridization/hybridization-overview.svg"
            alt="Comparison of sp3, sp2, and sp hybridization with tetrahedral, trigonal planar, and linear geometries"
            width={1200}
            height={760}
            priority
            className="h-auto w-full"
          />
          <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
            Carbon geometry changes as the number of electron groups changes
            from four to three to two.
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
            "Explain why hybridization is used as a bonding model.",
            "Determine steric number from sigma bonds and lone pairs.",
            "Recognize sp3, sp2, and sp hybridized atoms.",
            "Connect hybridization with geometry and ideal bond angle.",
            "Identify the unhybridized p orbitals used in pi bonding.",
            "Predict hybridization in common organic structures.",
          ].map((objective) => (
            <li key={objective} className="flex gap-3">
              <span className="font-bold text-blue-700" aria-hidden="true">✓</span>
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </section>

      <LessonSection id="why-hybridization" title="Why hybridization is useful">
        <p>
          A carbon atom has one 2s orbital and three 2p orbitals in its valence
          shell. In a molecule, these orbitals can be described as mixing to
          create hybrid orbitals that point directly toward bonding partners.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900">The key idea</h3>
          <p className="mt-2">
            Hybridization does not create extra orbitals. The number of hybrid
            orbitals produced equals the number of atomic orbitals mixed.
          </p>
        </div>

        <p className="mt-6">
          The model is especially useful because it connects orbital arrangement
          to molecular shape, sigma bonding, and the presence of unhybridized p
          orbitals available for pi bonds.
        </p>
      </LessonSection>

      <LessonSection id="steric-number" title="Steric number">
        <p>
          Steric number is the number of electron groups around an atom. Count
          each sigma bond and each lone pair as one electron group.
        </p>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-semibold text-slate-900">
            Steric number = number of sigma bonds + number of lone pairs
          </p>
        </div>

        <ul className="mt-6 list-disc space-y-3 pl-7 marker:text-blue-700">
          <li>A single bond counts as one electron group.</li>
          <li>A double bond also counts as one electron group.</li>
          <li>A triple bond also counts as one electron group.</li>
          <li>Each lone pair counts as one electron group.</li>
        </ul>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-base">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Steric number</th>
                <th className="px-5 py-4 font-semibold">Hybridization</th>
                <th className="px-5 py-4 font-semibold">Electron geometry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr><td className="px-5 py-4">4</td><td className="px-5 py-4">sp³</td><td className="px-5 py-4">Tetrahedral</td></tr>
              <tr><td className="px-5 py-4">3</td><td className="px-5 py-4">sp²</td><td className="px-5 py-4">Trigonal planar</td></tr>
              <tr><td className="px-5 py-4">2</td><td className="px-5 py-4">sp</td><td className="px-5 py-4">Linear</td></tr>
            </tbody>
          </table>
        </div>
      </LessonSection>

      <LessonSection id="sp3" title="sp³ hybridization">
        <p>
          In sp³ hybridization, one s orbital and three p orbitals combine to
          form four equivalent sp³ hybrid orbitals. They point toward the
          corners of a tetrahedron.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Electron groups", "4"],
            ["Ideal angle", "109.5°"],
            ["Geometry", "Tetrahedral"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 text-center">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <p className="mt-6">
          Methane is the standard example. Carbon forms four sigma bonds using
          four sp³ hybrid orbitals. No unhybridized p orbital remains on carbon.
        </p>
      </LessonSection>

      <LessonSection id="sp2" title="sp² hybridization">
        <p>
          In sp² hybridization, one s orbital and two p orbitals combine to form
          three sp² hybrid orbitals in one plane. One unhybridized p orbital
          remains perpendicular to that plane.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Electron groups", "3"],
            ["Ideal angle", "120°"],
            ["Geometry", "Trigonal planar"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 text-center">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <p className="mt-6">
          In ethene, each carbon is sp² hybridized. The sp² orbitals form sigma
          bonds, while the remaining p orbitals overlap sideways to form the pi
          bond of the carbon-carbon double bond.
        </p>
      </LessonSection>

      <LessonSection id="sp" title="sp hybridization">
        <p>
          In sp hybridization, one s orbital and one p orbital combine to form
          two sp hybrid orbitals pointing in opposite directions. Two
          unhybridized p orbitals remain.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Electron groups", "2"],
            ["Ideal angle", "180°"],
            ["Geometry", "Linear"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 text-center">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <p className="mt-6">
          In ethyne, each carbon is sp hybridized. One sp orbital forms the
          carbon-carbon sigma bond, while the two unhybridized p orbitals form
          two mutually perpendicular pi bonds.
        </p>

        <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/hybridization/orbitals-and-pi-bonds.svg"
            alt="Diagram showing unhybridized p orbitals in sp2 and sp hybridized carbon atoms forming pi bonds"
            width={1200}
            height={720}
            className="h-auto w-full"
          />
          <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
            Unhybridized p orbitals remain available for pi bonding in sp² and
            sp hybridized atoms.
          </figcaption>
        </figure>
      </LessonSection>

      <LessonSection id="comparison" title="Comparison of carbon hybridization">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-base">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Type</th>
                <th className="px-5 py-4 font-semibold">Orbitals mixed</th>
                <th className="px-5 py-4 font-semibold">Groups</th>
                <th className="px-5 py-4 font-semibold">Geometry</th>
                <th className="px-5 py-4 font-semibold">Angle</th>
                <th className="px-5 py-4 font-semibold">p orbitals left</th>
                <th className="px-5 py-4 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {comparison.map((row) => (
                <tr key={row.hybridization}>
                  <td className="px-5 py-4 font-semibold text-blue-700">{row.hybridization}</td>
                  <td className="px-5 py-4">{row.orbitals}</td>
                  <td className="px-5 py-4">{row.electronGroups}</td>
                  <td className="px-5 py-4">{row.geometry}</td>
                  <td className="px-5 py-4">{row.idealAngle}</td>
                  <td className="px-5 py-4">{row.unhybridizedP}</td>
                  <td className="px-5 py-4">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LessonSection>

      <LessonSection id="identifying" title="How to identify hybridization">
        <ol className="list-decimal space-y-4 pl-7 marker:font-semibold marker:text-blue-700">
          <li>Choose the atom you want to analyse.</li>
          <li>Count its sigma bonds.</li>
          <li>Count its lone pairs.</li>
          <li>Add them to obtain the steric number.</li>
          <li>Use 4 → sp³, 3 → sp², or 2 → sp.</li>
        </ol>

        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="font-semibold text-slate-900">Fast shortcut for carbon</h3>
          <p className="mt-2">
            A carbon with only single bonds is usually sp³. A carbon in a double
            bond is usually sp². A carbon in a triple bond is usually sp.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="common-mistakes" title="Common mistakes">
        <div className="space-y-5">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-slate-900">Counting bond lines instead of electron groups</h3>
            <p className="mt-2">
              A double or triple bond counts as one electron group because all
              bonding occurs toward the same neighbouring atom.
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-slate-900">Ignoring lone pairs</h3>
            <p className="mt-2">
              Lone pairs affect steric number and electron geometry even though
              they do not appear as bonded atoms.
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-slate-900">Confusing geometry with hybridization</h3>
            <p className="mt-2">
              Hybridization describes orbitals. Geometry describes the spatial
              arrangement of electron groups or atoms.
            </p>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="summary" title="Summary">
        <div className="rounded-2xl bg-slate-900 p-6 text-slate-100">
          <p>
            Hybridization connects electron-group arrangement with orbital
            direction and molecular geometry. Four electron groups correspond
            to sp³, three to sp², and two to sp. Unhybridized p orbitals remain
            in sp² and sp atoms and form pi bonds in double and triple bonds.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="practice" title="Practice questions">
        <ol className="list-decimal space-y-4 pl-7 marker:font-semibold marker:text-blue-700">
          <li>What is the steric number of the carbon atom in methane?</li>
          <li>State the geometry and ideal bond angle of an sp² carbon.</li>
          <li>How many unhybridized p orbitals remain on an sp carbon?</li>
          <li>Determine the hybridization of each carbon in ethene.</li>
          <li>Why does a double bond count as only one electron group?</li>
          <li>Determine the hybridization of the nitrogen atom in NH₃.</li>
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
