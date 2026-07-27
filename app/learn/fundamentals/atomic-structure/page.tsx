import type { Metadata } from "next";
import Image from "next/image";
import {
  CommonMistakes,
  LearningObjectives,
  LessonNavigation,
  LessonPage,
  LessonSection,
  PracticeQuestions,
  References,
  RememberBox,
  SummaryBox,
  WorkedExample,
} from "@/components/Lesson";

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
  { id: "worked-example", label: "Worked example" },
  { id: "isotopes", label: "Isotopes" },
  { id: "electrons", label: "Electrons and orbitals" },
  { id: "valence-electrons", label: "Valence electrons" },
  { id: "ions", label: "Ions" },
  { id: "carbon", label: "Carbon atom" },
  { id: "common-mistakes", label: "Common mistakes" },
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

const objectives = [
  "Identify the three main subatomic particles.",
  "Use atomic number and mass number correctly.",
  "Explain what isotopes are.",
  "Describe how electrons occupy shells and orbitals.",
  "Determine the number of valence electrons in a main-group atom.",
  "Explain how atoms form positive and negative ions.",
];

const practiceQuestions = [
  "What are the charge and approximate relative mass of a proton, neutron, and electron?",
  "An atom has atomic number 8 and mass number 18. How many protons, neutrons, and electrons does the neutral atom contain?",
  "How do isotopes of the same element differ?",
  "What is the maximum number of electrons in a p subshell?",
  "How many valence electrons does carbon have?",
  "What happens to an atom's charge when it loses an electron?",
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

        <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/atomic-structure/carbon-atom.svg"
            alt="Simplified carbon atom showing a nucleus with protons and neutrons surrounded by two electron shells containing six electrons"
            width={1200}
            height={760}
            priority
            className="h-auto w-full"
          />
          <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
            A simplified shell model of carbon. The first shell contains two
            electrons, while the second shell contains four valence electrons.
          </figcaption>
        </figure>
      </LessonSection>

      <LearningObjectives items={objectives} />

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

      <LessonSection id="atomic-number" title="Atomic number and mass number">
        <p>
          The <strong>atomic number</strong>, written as <em>Z</em>, is the
          number of protons in the nucleus. It uniquely identifies an element.
          Every carbon atom, for example, contains six protons.
        </p>

        <p className="mt-5">
          The <strong>mass number</strong>, written as <em>A</em>, is the total
          number of protons and neutrons in the nucleus.
        </p>

        <div className="mt-6">
          <RememberBox title="Two relationships to remember">
            <p className="font-semibold text-slate-900">
              Mass number = protons + neutrons
            </p>
            <p className="mt-2">
              For a neutral atom, the number of electrons equals the number of
              protons.
            </p>
          </RememberBox>
        </div>
      </LessonSection>

      <LessonSection id="worked-example" title="Worked example">
        <WorkedExample title="Determine the particles in oxygen-18">
          <p>
            Oxygen has atomic number 8, so every oxygen atom has 8 protons. The
            isotope oxygen-18 has a mass number of 18.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">Protons</p>
              <p className="mt-1 text-xl font-bold text-slate-950">8</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">Neutrons</p>
              <p className="mt-1 text-xl font-bold text-slate-950">18 − 8 = 10</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">Electrons</p>
              <p className="mt-1 text-xl font-bold text-slate-950">8</p>
            </div>
          </div>
          <p>
            A neutral oxygen-18 atom therefore contains 8 protons, 10 neutrons,
            and 8 electrons.
          </p>
        </WorkedExample>
      </LessonSection>

      <LessonSection id="isotopes" title="Isotopes">
        <p>
          Isotopes are atoms of the same element that contain the same number of
          protons but different numbers of neutrons. Because their proton
          numbers are identical, isotopes belong to the same element.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Carbon-12", "6 protons", "6 neutrons"],
            ["Carbon-13", "6 protons", "7 neutrons"],
            ["Carbon-14", "6 protons", "8 neutrons"],
          ].map(([name, protons, neutrons]) => (
            <div
              key={name}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <h3 className="font-semibold text-slate-900">{name}</h3>
              <p className="mt-2 text-base">{protons}</p>
              <p className="text-base">{neutrons}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <RememberBox title="Why isotopes react similarly">
            Isotopes usually have very similar chemical behaviour because they
            have the same electron arrangement. Their masses and nuclear
            stability, however, may differ.
          </RememberBox>
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
                <th className="px-5 py-4 font-semibold">Number of orbitals</th>
                <th className="px-5 py-4 font-semibold">Maximum electrons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                ["s", "1", "2"],
                ["p", "3", "6"],
                ["d", "5", "10"],
                ["f", "7", "14"],
              ].map(([subshell, orbitals, electrons]) => (
                <tr key={subshell}>
                  <td className="px-5 py-4">{subshell}</td>
                  <td className="px-5 py-4">{orbitals}</td>
                  <td className="px-5 py-4">{electrons}</td>
                </tr>
              ))}
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

        <div className="mt-6">
          <RememberBox title="Calculating ion charge">
            <p className="font-semibold text-slate-900">
              Ion charge = number of protons − number of electrons
            </p>
          </RememberBox>
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

      <LessonSection id="common-mistakes" title="Common mistakes">
        <CommonMistakes
          items={[
            {
              title: "Confusing atomic number with mass number",
              explanation:
                "Atomic number counts protons only. Mass number counts protons and neutrons together.",
            },
            {
              title: "Treating electron shells as fixed circular paths",
              explanation:
                "Shell diagrams are useful models, but electrons are described more accurately by orbitals and probability distributions.",
            },
            {
              title: "Changing the element when electrons are gained or lost",
              explanation:
                "Changing electrons creates an ion. The element changes only if the number of protons changes.",
            },
          ]}
        />
      </LessonSection>

      <LessonSection id="summary" title="Summary">
        <SummaryBox>
          <p>
            Atomic identity is determined by the number of protons. Neutrons
            affect isotope mass and nuclear stability, while electrons control
            bonding and chemical behaviour. Valence electrons are especially
            important in organic chemistry because they determine how atoms
            connect to one another.
          </p>
        </SummaryBox>
      </LessonSection>

      <LessonSection id="practice" title="Practice questions">
        <PracticeQuestions questions={practiceQuestions} />
      </LessonSection>

      <LessonSection id="references" title="References and further reading">
        <References
          items={[
            <span key="clayden">
              Clayden, J., Greeves, N., and Warren, S. <em>Organic Chemistry</em>.
            </span>,
            <span key="mcmurry">
              McMurry, J. <em>Organic Chemistry</em>.
            </span>,
            <span key="atkins">
              Atkins, P., and Jones, L. <em>Chemical Principles</em>.
            </span>,
            "IUPAC Compendium of Chemical Terminology—the Gold Book.",
          ]}
        />
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
