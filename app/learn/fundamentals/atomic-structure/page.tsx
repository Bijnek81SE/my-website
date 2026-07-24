import type { Metadata } from "next";
import LessonPage from "@/components/Lesson/LessonPage";
import LessonSection from "@/components/Lesson/LessonSection";
import LessonNavigation from "@/components/Lesson/LessonNavigation";

export const metadata: Metadata = {
  title: "Atomic Structure | Organic Chemistry Hub",
  description:
    "Learn how protons, neutrons, electrons, isotopes, ions, orbitals, and valence electrons determine atomic identity and chemical behaviour.",
};

const tableOfContents = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Learning objectives" },
  { id: "subatomic-particles", label: "Subatomic particles" },
  { id: "atomic-number", label: "Atomic and mass numbers" },
  { id: "isotopes", label: "Isotopes" },
  { id: "electrons", label: "Electrons and orbitals" },
  { id: "valence-electrons", label: "Valence electrons" },
  { id: "ions", label: "Ions" },
  { id: "carbon", label: "Carbon atom" },
  { id: "summary", label: "Summary" },
  { id: "practice", label: "Practice questions" },
  { id: "references", label: "References" },
];

const particles = [
  {
    particle: "Proton",
    symbol: "p⁺",
    charge: "+1",
    relativeMass: "1",
    location: "Nucleus",
  },
  {
    particle: "Neutron",
    symbol: "n⁰",
    charge: "0",
    relativeMass: "1",
    location: "Nucleus",
  },
  {
    particle: "Electron",
    symbol: "e⁻",
    charge: "−1",
    relativeMass: "About 1/1836",
    location: "Orbitals around the nucleus",
  },
];

export default function AtomicStructurePage() {
  return (
    <LessonPage
      category="Fundamentals"
      title="Atomic Structure"
      description="Understand how protons, neutrons, and electrons determine atomic identity, charge, and chemical behaviour."
      readingTime="10 min"
      tableOfContents={tableOfContents}
    >
      <LessonSection id="overview" title="Overview">
        <p>
          Every organic molecule is built from atoms. To understand bonding,
          polarity, reactivity, and molecular shape, we first need to understand
          the structure of an atom.
        </p>

        <p className="mt-5">
          An atom contains a small, dense nucleus surrounded by electrons. The
          nucleus contains protons and neutrons, while electrons occupy regions
          of space called orbitals.
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
            "Identify the three main subatomic particles.",
            "Use atomic number and mass number correctly.",
            "Explain what isotopes are.",
            "Describe how electrons occupy shells and orbitals.",
            "Determine the number of valence electrons in a main-group atom.",
            "Explain how atoms form positive and negative ions.",
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

      <LessonSection id="subatomic-particles" title="Subatomic particles">
        <p>
          The chemical behaviour of an atom depends mainly on its electrons,
          but protons determine which element the atom is. Neutrons affect the
          atom&apos;s mass and nuclear stability.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-base">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Particle</th>
                <th className="px-5 py-4 font-semibold">Symbol</th>
                <th className="px-5 py-4 font-semibold">Charge</th>
                <th className="px-5 py-4 font-semibold">Relative mass</th>
                <th className="px-5 py-4 font-semibold">Location</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {particles.map((particle) => (
                <tr key={particle.particle}>
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {particle.particle}
                  </td>
                  <td className="px-5 py-4">{particle.symbol}</td>
                  <td className="px-5 py-4">{particle.charge}</td>
                  <td className="px-5 py-4">{particle.relativeMass}</td>
                  <td className="px-5 py-4">{particle.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LessonSection>

      <LessonSection
        id="atomic-number"
        title="Atomic number and mass number"
      >
        <p>
          The <strong>atomic number</strong>, written as <em>Z</em>, is the
          number of protons in the nucleus. It uniquely identifies an element.
          Every carbon atom, for example, contains six protons.
        </p>

        <p className="mt-5">
          The <strong>mass number</strong>, written as <em>A</em>, is the total
          number of protons and neutrons in the nucleus.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="font-semibold text-slate-900">
            Mass number = number of protons + number of neutrons
          </p>
          <p className="mt-2">
            Therefore, the number of neutrons is equal to the mass number minus
            the atomic number.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="isotopes" title="Isotopes">
        <p>
          Isotopes are atoms of the same element that contain the same number of
          protons but different numbers of neutrons. Because their proton
          numbers are identical, isotopes belong to the same element.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              name: "Carbon-12",
              protons: "6 protons",
              neutrons: "6 neutrons",
            },
            {
              name: "Carbon-13",
              protons: "6 protons",
              neutrons: "7 neutrons",
            },
            {
              name: "Carbon-14",
              protons: "6 protons",
              neutrons: "8 neutrons",
            },
          ].map((isotope) => (
            <div
              key={isotope.name}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <h3 className="font-semibold text-slate-900">{isotope.name}</h3>
              <p className="mt-2 text-base">{isotope.protons}</p>
              <p className="text-base">{isotope.neutrons}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-slate-900">
            Isotopes and chemical behaviour
          </h3>
          <p className="mt-2">
            Isotopes usually have very similar chemical behaviour because they
            have the same electron arrangement. Their masses and nuclear
            stability, however, may differ.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="electrons" title="Electrons, shells, and orbitals">
        <p>
          Electrons do not move around the nucleus in simple circular paths.
          Instead, they occupy orbitals—regions of space in which an electron is
          likely to be found.
        </p>

        <p className="mt-5">
          Orbitals are grouped into energy levels, often called shells. The
          lowest-energy orbitals fill first.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-base">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Subshell</th>
                <th className="px-5 py-4 font-semibold">
                  Number of orbitals
                </th>
                <th className="px-5 py-4 font-semibold">
                  Maximum electrons
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4">s</td>
                <td className="px-5 py-4">1</td>
                <td className="px-5 py-4">2</td>
              </tr>
              <tr>
                <td className="px-5 py-4">p</td>
                <td className="px-5 py-4">3</td>
                <td className="px-5 py-4">6</td>
              </tr>
              <tr>
                <td className="px-5 py-4">d</td>
                <td className="px-5 py-4">5</td>
                <td className="px-5 py-4">10</td>
              </tr>
              <tr>
                <td className="px-5 py-4">f</td>
                <td className="px-5 py-4">7</td>
                <td className="px-5 py-4">14</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6">
          Organic chemistry focuses mainly on the <strong>s</strong> and{" "}
          <strong>p</strong> orbitals of carbon, hydrogen, oxygen, nitrogen, and
          the halogens.
        </p>
      </LessonSection>

      <LessonSection id="valence-electrons" title="Valence electrons">
        <p>
          Valence electrons are the electrons in the outermost occupied shell.
          They are the electrons most directly involved in chemical bonding and
          reactions.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["Hydrogen", "1 valence electron"],
            ["Carbon", "4 valence electrons"],
            ["Nitrogen", "5 valence electrons"],
            ["Oxygen", "6 valence electrons"],
            ["Fluorine", "7 valence electrons"],
            ["Neon", "8 valence electrons"],
          ].map(([element, count]) => (
            <div
              key={element}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
            >
              <span className="font-medium text-slate-900">{element}</span>
              <span className="text-base text-slate-600">{count}</span>
            </div>
          ))}
        </div>

        <p className="mt-6">
          The number of valence electrons helps predict how many bonds an atom
          tends to form and whether it is likely to gain, lose, or share
          electrons.
        </p>
      </LessonSection>

      <LessonSection id="ions" title="Ions">
        <p>
          A neutral atom contains equal numbers of protons and electrons. When
          an atom gains or loses electrons, it becomes an ion.
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

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="font-semibold text-slate-900">
            Ion charge = number of protons − number of electrons
          </p>
        </div>
      </LessonSection>

      <LessonSection id="carbon" title="The carbon atom">
        <p>
          Carbon has atomic number 6, so every neutral carbon atom contains six
          protons and six electrons. Its ground-state electron configuration is
          commonly written as:
        </p>

        <div className="mt-6 rounded-xl bg-slate-900 p-6 text-center text-2xl font-semibold tracking-wide text-white">
          1s² 2s² 2p²
        </div>

        <p className="mt-6">
          Carbon has four valence electrons. This is the key reason it can form
          four covalent bonds and create chains, branches, rings, and complex
          three-dimensional structures.
        </p>
      </LessonSection>

      <LessonSection id="summary" title="Summary">
        <div className="rounded-2xl bg-slate-900 p-6 text-slate-100">
          <p>
            Atomic identity is determined by the number of protons. Neutrons
            affect isotope mass and nuclear stability, while electrons control
            bonding and chemical behaviour. Valence electrons are especially
            important in organic chemistry because they determine how atoms
            connect to one another.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="practice" title="Practice questions">
        <ol className="list-decimal space-y-4 pl-7 marker:font-semibold marker:text-blue-700">
          <li>
            What are the charge and approximate relative mass of a proton,
            neutron, and electron?
          </li>
          <li>
            An atom has atomic number 8 and mass number 18. How many protons,
            neutrons, and electrons does the neutral atom contain?
          </li>
          <li>How do isotopes of the same element differ?</li>
          <li>What is the maximum number of electrons in a p subshell?</li>
          <li>How many valence electrons does carbon have?</li>
          <li>
            What happens to an atom&apos;s charge when it loses an electron?
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
            Atkins, P., and Jones, L. <em>Chemical Principles</em>.
          </li>
          <li>IUPAC Compendium of Chemical Terminology—the Gold Book.</li>
        </ul>
      </LessonSection>

      <LessonNavigation
        previous={{
          title: "What Is Organic Chemistry?",
          href: "/learn/fundamentals/what-is-organic-chemistry",
        }}
        next={{
          title: "Chemical Bonding",
          href: "/learn/fundamentals/chemical-bonding",
        }}
      />
    </LessonPage>
  );
}