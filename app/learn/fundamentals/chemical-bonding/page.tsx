import type { Metadata } from "next";
import Image from "next/image";
import LessonPage from "@/components/Lesson/LessonPage";
import LessonSection from "@/components/Lesson/LessonSection";
import LessonNavigation from "@/components/Lesson/LessonNavigation";

export const metadata: Metadata = {
  title: "Chemical Bonding | Organic Chemistry Hub",
  description:
    "Learn why atoms bond, how covalent and ionic bonds form, and how electronegativity, bond polarity, sigma bonds, and pi bonds shape organic molecules.",
};

const tableOfContents = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Learning objectives" },
  { id: "why-atoms-bond", label: "Why atoms bond" },
  { id: "ionic-bonding", label: "Ionic bonding" },
  { id: "covalent-bonding", label: "Covalent bonding" },
  { id: "bond-order", label: "Single, double, and triple bonds" },
  { id: "electronegativity", label: "Electronegativity and polarity" },
  { id: "sigma-pi", label: "Sigma and pi bonds" },
  { id: "bond-properties", label: "Bond length and strength" },
  { id: "organic-chemistry", label: "Bonding in organic chemistry" },
  { id: "summary", label: "Summary" },
  { id: "practice", label: "Practice questions" },
  { id: "references", label: "References" },
];

const bondComparison = [
  {
    type: "Ionic",
    electronBehaviour: "Electrons are transferred",
    typicalPartners: "A metal and a non-metal",
    example: "NaCl",
  },
  {
    type: "Non-polar covalent",
    electronBehaviour: "Electrons are shared approximately equally",
    typicalPartners: "Atoms with similar electronegativities",
    example: "H₂ or C–C",
  },
  {
    type: "Polar covalent",
    electronBehaviour: "Electrons are shared unequally",
    typicalPartners: "Atoms with different electronegativities",
    example: "O–H or C–O",
  },
];

export default function ChemicalBondingPage() {
  return (
    <LessonPage
      category="Fundamentals"
      title="Chemical Bonding"
      description="Learn how atoms share or transfer electrons and how bond type, polarity, and bond order influence organic molecules."
      readingTime="12 min"
      tableOfContents={tableOfContents}
    >
      <LessonSection id="overview" title="Overview">
        <p>
          Chemical bonds hold atoms together in molecules and compounds. In
          organic chemistry, most bonds are covalent: atoms share pairs of
          valence electrons to achieve more stable electron arrangements.
        </p>

        <p className="mt-5">
          The way electrons are shared determines whether a bond is non-polar or
          polar, while the number and type of shared electron pairs determine
          bond strength, length, and reactivity.
        </p>

        <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/chemical-bonding/bonding-overview.svg"
            alt="Comparison of ionic bonding, non-polar covalent bonding, and polar covalent bonding"
            width={1200}
            height={760}
            priority
            className="h-auto w-full"
          />
          <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
            Three broad bonding patterns: electron transfer, approximately equal
            sharing, and unequal sharing.
          </figcaption>
        </figure>
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
            "Explain why atoms form chemical bonds.",
            "Distinguish ionic, non-polar covalent, and polar covalent bonding.",
            "Relate bond order to bond length and bond strength.",
            "Use electronegativity to predict bond polarity.",
            "Distinguish sigma bonds from pi bonds.",
            "Recognize the bonding patterns most important in organic chemistry.",
          ].map((objective) => (
            <li key={objective} className="flex gap-3">
              <span className="font-bold text-blue-700" aria-hidden="true">
                ✓
              </span>
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </section>

      <LessonSection id="why-atoms-bond" title="Why atoms bond">
        <p>
          Atoms form bonds when the bonded arrangement has a lower overall
          energy than the separated atoms. Valence electrons are rearranged so
          that attractive interactions outweigh repulsive interactions.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900">A useful guideline</h3>
          <p className="mt-2">
            Many main-group atoms tend toward a filled valence shell. Hydrogen
            commonly seeks two valence electrons, while carbon, nitrogen,
            oxygen, and the halogens often follow the octet rule.
          </p>
        </div>

        <p className="mt-6">
          The octet rule is a model rather than an absolute law. It is especially
          useful for the common organic elements, but important exceptions exist.
        </p>
      </LessonSection>

      <LessonSection id="ionic-bonding" title="Ionic bonding">
        <p>
          Ionic bonding is commonly described as the electrostatic attraction
          between oppositely charged ions. It often begins with electron transfer
          from an atom that loses electrons easily to one that attracts electrons
          strongly.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-slate-900">Cation</h3>
            <p className="mt-2">
              A positively charged ion formed when an atom loses one or more
              electrons.
            </p>
          </div>

          <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
            <h3 className="font-semibold text-slate-900">Anion</h3>
            <p className="mt-2">
              A negatively charged ion formed when an atom gains one or more
              electrons.
            </p>
          </div>
        </div>

        <p className="mt-6">
          Organic molecules are usually covalent, but ionic interactions remain
          important in salts, reaction intermediates, acid-base chemistry, and
          biological systems.
        </p>
      </LessonSection>

      <LessonSection id="covalent-bonding" title="Covalent bonding">
        <p>
          A covalent bond forms when two atoms share a pair of electrons. The
          shared electrons are attracted to both nuclei and occupy a region of
          space between the bonded atoms.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-base">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Bond type</th>
                <th className="px-5 py-4 font-semibold">Electron behaviour</th>
                <th className="px-5 py-4 font-semibold">Typical partners</th>
                <th className="px-5 py-4 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {bondComparison.map((bond) => (
                <tr key={bond.type}>
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {bond.type}
                  </td>
                  <td className="px-5 py-4">{bond.electronBehaviour}</td>
                  <td className="px-5 py-4">{bond.typicalPartners}</td>
                  <td className="px-5 py-4">{bond.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LessonSection>

      <LessonSection
        id="bond-order"
        title="Single, double, and triple bonds"
      >
        <p>
          Bond order describes the number of shared electron pairs between two
          atoms. A single bond has bond order 1, a double bond has bond order 2,
          and a triple bond has bond order 3.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              name: "Single bond",
              notation: "C–C",
              sharedPairs: "1 shared pair",
              composition: "1 sigma bond",
            },
            {
              name: "Double bond",
              notation: "C=C",
              sharedPairs: "2 shared pairs",
              composition: "1 sigma + 1 pi",
            },
            {
              name: "Triple bond",
              notation: "C≡C",
              sharedPairs: "3 shared pairs",
              composition: "1 sigma + 2 pi",
            },
          ].map((bond) => (
            <div
              key={bond.name}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <h3 className="font-semibold text-slate-900">{bond.name}</h3>
              <p className="mt-3 text-2xl font-semibold text-blue-700">
                {bond.notation}
              </p>
              <p className="mt-3 text-base">{bond.sharedPairs}</p>
              <p className="text-base text-slate-600">{bond.composition}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection
        id="electronegativity"
        title="Electronegativity and bond polarity"
      >
        <p>
          Electronegativity is an atom&apos;s ability to attract shared electrons
          in a bond. When two bonded atoms have different electronegativities,
          the electron density is pulled toward the more electronegative atom.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-slate-900">Partial charges</h3>
          <p className="mt-2">
            The more electronegative atom develops a partial negative charge,
            written δ−, while the less electronegative atom develops a partial
            positive charge, written δ+.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-center text-2xl font-semibold text-slate-900">
              C–C
            </p>
            <p className="mt-3 text-center text-sm text-slate-600">
              Non-polar bond: identical atoms attract the electrons equally.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-center text-2xl font-semibold text-slate-900">
              C<sup>δ+</sup>–O<sup>δ−</sup>
            </p>
            <p className="mt-3 text-center text-sm text-slate-600">
              Polar bond: oxygen attracts the shared electrons more strongly.
            </p>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="sigma-pi" title="Sigma and pi bonds">
        <p>
          Covalent bonds can be classified by how atomic orbitals overlap. A
          sigma bond forms by head-on overlap along the internuclear axis. A pi
          bond forms by sideways overlap of parallel p orbitals above and below
          that axis.
        </p>

        <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/chemical-bonding/sigma-pi-bonds.svg"
            alt="Diagram comparing head-on orbital overlap in a sigma bond with sideways p orbital overlap in a pi bond"
            width={1200}
            height={720}
            className="h-auto w-full"
          />
          <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
            Sigma overlap lies along the internuclear axis. Pi overlap creates
            electron density above and below the axis.
          </figcaption>
        </figure>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h3 className="font-semibold text-slate-900">Rotation matters</h3>
          <p className="mt-2">
            Rotation around a single sigma bond is usually possible. Rotation
            around a double bond would disrupt the parallel p-orbital overlap,
            so double bonds restrict rotation.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="bond-properties" title="Bond length and bond strength">
        <p>
          Bond order strongly affects bond length and bond strength. For bonds
          between the same two elements, increasing bond order usually makes the
          bond shorter and stronger.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-base">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Carbon-carbon bond</th>
                <th className="px-5 py-4 font-semibold">Relative length</th>
                <th className="px-5 py-4 font-semibold">Relative strength</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-medium text-slate-900">C–C</td>
                <td className="px-5 py-4">Longest</td>
                <td className="px-5 py-4">Weakest of the three</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-slate-900">C=C</td>
                <td className="px-5 py-4">Intermediate</td>
                <td className="px-5 py-4">Intermediate</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-slate-900">C≡C</td>
                <td className="px-5 py-4">Shortest</td>
                <td className="px-5 py-4">Strongest of the three</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6">
          A double bond is stronger than a single bond, but it is not exactly
          twice as strong because a pi bond is generally weaker than a sigma
          bond.
        </p>
      </LessonSection>

      <LessonSection
        id="organic-chemistry"
        title="Bonding patterns in organic chemistry"
      >
        <p>
          Common neutral atoms in organic molecules tend to form predictable
          numbers of bonds. These patterns are essential when drawing and
          checking molecular structures.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["Hydrogen", "Usually 1 bond"],
            ["Carbon", "Usually 4 bonds"],
            ["Nitrogen", "Usually 3 bonds and 1 lone pair"],
            ["Oxygen", "Usually 2 bonds and 2 lone pairs"],
            ["Halogens", "Usually 1 bond and 3 lone pairs"],
            ["Sulfur", "Several common bonding patterns"],
          ].map(([element, pattern]) => (
            <div
              key={element}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <p className="font-medium text-slate-900">{element}</p>
              <p className="mt-1 text-sm text-slate-600">{pattern}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="summary" title="Summary">
        <div className="rounded-2xl bg-slate-900 p-6 text-slate-100">
          <p>
            Chemical bonds form because bonded arrangements can be lower in
            energy than separated atoms. Organic molecules rely mainly on
            covalent bonds. Electronegativity controls bond polarity, bond order
            influences length and strength, and double or triple bonds combine
            one sigma bond with one or more pi bonds.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="practice" title="Practice questions">
        <ol className="list-decimal space-y-4 pl-7 marker:font-semibold marker:text-blue-700">
          <li>Why do atoms form chemical bonds?</li>
          <li>
            What is the difference between ionic bonding and covalent bonding?
          </li>
          <li>
            Predict whether a C–C bond or a C–O bond is more polar and explain
            why.
          </li>
          <li>
            How many sigma and pi bonds are present in a carbon-carbon double
            bond?
          </li>
          <li>
            Arrange C–C, C=C, and C≡C in order of increasing bond strength.
          </li>
          <li>Why is rotation restricted around a carbon-carbon double bond?</li>
        </ol>
      </LessonSection>

      <LessonSection id="references" title="References and further reading">
        <ul className="list-disc space-y-3 pl-7">
          <li>
            Clayden, J., Greeves, N., and Warren, S. <em>Organic Chemistry</em>.
          </li>
          <li>
            McMurry, J. <em>Organic Chemistry</em>.
          </li>
          <li>
            Atkins, P., and Jones, L. <em>Chemical Principles</em>.
          </li>
          <li>IUPAC Compendium of Chemical Terminology—the Gold Book.</li>
        </ul>
      </LessonSection>

      <LessonNavigation
        previous={{
          title: "Atomic Structure",
          href: "/learn/fundamentals/atomic-structure",
        }}
        next={{
          title: "Hybridization",
          href: "/learn/fundamentals/hybridization",
        }}
      />
    </LessonPage>
  );
}
