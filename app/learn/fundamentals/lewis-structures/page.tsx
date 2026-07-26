import type { Metadata } from "next";
import Image from "next/image";
import LessonPage from "@/components/Lesson/LessonPage";
import LessonSection from "@/components/Lesson/LessonSection";
import LessonNavigation from "@/components/Lesson/LessonNavigation";

export const metadata: Metadata = {
  title: "Lewis Structures | Organic Chemistry Hub",
  description:
    "Learn how to draw Lewis structures, count valence electrons, complete octets, assign lone pairs, recognise exceptions, and check structures with formal charge.",
};

const tableOfContents = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Learning objectives" },
  { id: "symbols", label: "Lewis symbols" },
  { id: "method", label: "Drawing method" },
  { id: "examples", label: "Worked examples" },
  { id: "multiple-bonds", label: "Multiple bonds" },
  { id: "formal-charge", label: "Formal charge check" },
  { id: "exceptions", label: "Octet-rule exceptions" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "summary", label: "Summary" },
  { id: "practice", label: "Practice questions" },
  { id: "references", label: "References" },
];

const methodSteps = [
  {
    number: "1",
    title: "Count valence electrons",
    text: "Add the valence electrons from every atom. Add electrons for a negative charge and subtract them for a positive charge.",
  },
  {
    number: "2",
    title: "Choose the skeleton",
    text: "Place the least electronegative atom in the centre, with hydrogen and the halogens usually on the outside.",
  },
  {
    number: "3",
    title: "Connect atoms",
    text: "Draw single bonds between connected atoms. Each bond uses two electrons.",
  },
  {
    number: "4",
    title: "Complete terminal octets",
    text: "Give terminal atoms enough lone-pair electrons to reach an octet. Hydrogen needs only two electrons.",
  },
  {
    number: "5",
    title: "Complete the central atom",
    text: "Place any remaining electrons on the central atom. If it lacks an octet, form multiple bonds where appropriate.",
  },
  {
    number: "6",
    title: "Check the structure",
    text: "Confirm the total electron count, octets, overall charge, and formal charges.",
  },
];

export default function LewisStructuresPage() {
  return (
    <LessonPage
      category="Fundamentals"
      title="Lewis Structures"
      description="Turn valence-electron counts into clear two-dimensional maps of bonds, lone pairs, and charge."
      readingTime="14 min"
      tableOfContents={tableOfContents}
    >
      <LessonSection id="overview" title="Overview">
        <p>
          A Lewis structure represents valence electrons as dots and covalent
          bonds as lines. It does not show the full three-dimensional shape of a
          molecule, but it gives us the electron bookkeeping needed to discuss
          bonding, lone pairs, formal charge, resonance, and reactivity.
        </p>

        <p className="mt-5">
          A correct Lewis structure accounts for every valence electron and
          usually gives second-row atoms an octet. Hydrogen is the main exception:
          it is complete with two electrons.
        </p>

        <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/lewis-structures/lewis-method.svg"
            alt="Six-step process for drawing a Lewis structure, from counting valence electrons to checking formal charge"
            width={1200}
            height={760}
            priority
            className="h-auto w-full"
          />
          <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
            A reliable Lewis-structure workflow: count, connect, distribute,
            adjust, and verify.
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
            "Draw Lewis symbols for main-group atoms.",
            "Calculate the total number of valence electrons in a molecule or ion.",
            "Choose a reasonable atomic skeleton.",
            "Complete octets using bonds and lone pairs.",
            "Introduce double or triple bonds when required.",
            "Use formal charge to evaluate a proposed structure.",
            "Recognise common exceptions to the octet rule.",
          ].map((objective) => (
            <li key={objective} className="flex gap-3">
              <span className="font-bold text-blue-700" aria-hidden="true">✓</span>
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </section>

      <LessonSection id="symbols" title="Lewis symbols">
        <p>
          A Lewis symbol places dots around an element symbol to represent its
          valence electrons. For main-group elements, the group number helps us
          determine the valence-electron count.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["H", "1", "Usually forms 1 bond"],
            ["C", "4", "Usually forms 4 bonds"],
            ["N", "5", "Often 3 bonds + 1 lone pair"],
            ["O", "6", "Often 2 bonds + 2 lone pairs"],
            ["F, Cl, Br, I", "7", "Often 1 bond + 3 lone pairs"],
            ["P", "5", "Can exceed an octet"],
            ["S", "6", "Can exceed an octet"],
            ["B", "3", "Often has an incomplete octet"],
          ].map(([element, electrons, pattern]) => (
            <div key={element} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-2xl font-bold text-slate-900">{element}</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  {electrons} e⁻
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pattern}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="method" title="A six-step drawing method">
        <div className="grid gap-5">
          {methodSteps.map((step) => (
            <article
              key={step.number}
              className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 font-bold text-white">
                {step.number}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-slate-900">Electron-count reminder</h3>
          <p className="mt-2">
            A single line represents two electrons. A double bond represents four
            shared electrons, and a triple bond represents six shared electrons.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="examples" title="Worked examples">
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/images/lewis-structures/worked-examples.svg"
            alt="Worked Lewis structures for water, carbon dioxide, ammonia, and the ammonium ion"
            width={1200}
            height={760}
            className="h-auto w-full"
          />
          <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
            The total electron count controls how many bonds and lone pairs must
            appear in the final structure.
          </figcaption>
        </figure>

        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Water, H₂O</h3>
            <p className="mt-2">
              Water has eight valence electrons: six from oxygen and one from
              each hydrogen. Two O–H bonds use four electrons, leaving four
              electrons as two lone pairs on oxygen.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-900">Carbon dioxide, CO₂</h3>
            <p className="mt-2">
              Carbon dioxide has sixteen valence electrons. A structure with only
              single bonds leaves carbon without an octet, so one lone pair from
              each oxygen is converted into a bonding pair, producing O=C=O.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-900">Ammonium, NH₄⁺</h3>
            <p className="mt-2">
              Count one fewer electron because of the positive charge. Nitrogen
              forms four N–H bonds and has no lone pair. Place brackets around
              the structure and write the overall positive charge outside.
            </p>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="multiple-bonds" title="When to form multiple bonds">
        <p>
          After terminal atoms receive their octets, the central atom may still
          have fewer than eight electrons. If no electrons remain, a lone pair on
          a neighbouring atom can be converted into an additional bonding pair.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-semibold text-slate-900">Double bond</h3>
            <p className="mt-2">
              Two shared electron pairs. A double bond contains one sigma bond
              and one pi bond.
            </p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
            <h3 className="font-semibold text-slate-900">Triple bond</h3>
            <p className="mt-2">
              Three shared electron pairs. A triple bond contains one sigma bond
              and two pi bonds.
            </p>
          </div>
        </div>

        <p className="mt-6">
          Second-row atoms cannot exceed an octet. Carbon, nitrogen, oxygen, and
          fluorine therefore must not be drawn with more than eight electrons
          around them.
        </p>
      </LessonSection>

      <LessonSection id="formal-charge" title="Checking formal charge">
        <p>
          Formal charge is a bookkeeping tool used to compare possible Lewis
          structures. It assumes that bonding electrons are shared equally.
        </p>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-semibold text-slate-900">
            Formal charge = valence electrons − nonbonding electrons − number of bonds
          </p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-base">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Atom pattern</th>
                <th className="px-5 py-4 font-semibold">Typical formal charge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr><td className="px-5 py-4">Carbon with four bonds</td><td className="px-5 py-4">0</td></tr>
              <tr><td className="px-5 py-4">Nitrogen with three bonds and one lone pair</td><td className="px-5 py-4">0</td></tr>
              <tr><td className="px-5 py-4">Nitrogen with four bonds and no lone pair</td><td className="px-5 py-4">+1</td></tr>
              <tr><td className="px-5 py-4">Oxygen with two bonds and two lone pairs</td><td className="px-5 py-4">0</td></tr>
              <tr><td className="px-5 py-4">Oxygen with one bond and three lone pairs</td><td className="px-5 py-4">−1</td></tr>
            </tbody>
          </table>
        </div>

        <ul className="mt-6 list-disc space-y-3 pl-7 marker:text-blue-700">
          <li>The sum of all formal charges must equal the overall charge.</li>
          <li>Structures with smaller formal-charge magnitudes are often preferred.</li>
          <li>Negative formal charge is usually favoured on the more electronegative atom.</li>
        </ul>
      </LessonSection>

      <LessonSection id="exceptions" title="Exceptions to the octet rule">
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Incomplete octets</h3>
            <p className="mt-2">
              Beryllium and boron compounds can be stable with fewer than eight
              electrons around the central atom. BF₃ is a common example.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Odd-electron species</h3>
            <p className="mt-2">
              Radicals contain an unpaired electron, so not every atom can have a
              complete octet. Nitric oxide, NO, is an example.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Expanded valence shells</h3>
            <p className="mt-2">
              Elements in period 3 and below are sometimes represented with more
              than eight electrons in introductory Lewis structures. Second-row
              atoms never expand their octets.
            </p>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="common-mistakes" title="Common mistakes">
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["Forgetting ionic charge", "Add one electron for each negative charge and subtract one for each positive charge."],
            ["Putting hydrogen in the centre", "Hydrogen forms only one bond and is always terminal in ordinary Lewis structures."],
            ["Losing electrons", "Recount every bond and lone-pair electron before accepting the structure."],
            ["Giving carbon five bonds", "A neutral second-row carbon cannot exceed an octet."],
            ["Omitting lone pairs", "Lone pairs affect geometry, polarity, acidity, basicity, and reactivity."],
            ["Ignoring brackets on ions", "Enclose a polyatomic ion in brackets and place its overall charge outside."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection id="summary" title="Summary">
        <div className="rounded-2xl bg-slate-900 p-6 text-slate-100">
          <p>
            Lewis structures account for valence electrons using bonds and lone
            pairs. Start by counting electrons, choose a sensible skeleton,
            complete terminal atoms, then complete the central atom. Use multiple
            bonds when needed and verify the result with electron counts, octets,
            overall charge, and formal charge.
          </p>
        </div>
      </LessonSection>

      <LessonSection id="practice" title="Practice questions">
        <ol className="list-decimal space-y-4 pl-7 marker:font-semibold marker:text-blue-700">
          <li>How many total valence electrons are present in CH₄?</li>
          <li>Draw the Lewis structure of NH₃ and identify its lone pair.</li>
          <li>Why does CO₂ require two double bonds in its preferred Lewis structure?</li>
          <li>Draw the Lewis structure of the hydroxide ion, OH⁻.</li>
          <li>Calculate the formal charge on nitrogen in NH₄⁺.</li>
          <li>Draw the Lewis structure of HCN and identify the triple bond.</li>
          <li>Explain why BF₃ is an exception to the octet rule.</li>
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

      <LessonNavigation
        previous={{
          title: "Hybridization",
          href: "/learn/fundamentals/hybridization",
        }}
        next={{
          title: "Formal Charge",
          href: "/learn/fundamentals/formal-charge",
        }}
      />
    </LessonPage>
  );
}
