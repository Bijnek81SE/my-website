import type { Metadata } from "next";
import LessonPage from "@/components/Lesson/LessonPage";
import LessonSection from "@/components/Lesson/LessonSection";
import LessonNavigation from "@/components/Lesson/LessonNavigation";
import { LearningObjectives, PracticeQuestions, SummaryBox } from "@/components/Lesson";
import { Callout, Card } from "@/components/ui";
import { CurvedArrowGuide, ResonanceCarboxylateInteractive } from "@/components/chemistry";

export const metadata: Metadata = {
  title: "Resonance | Organic Chemistry Hub",
  description:
    "Learn how to draw resonance contributors, move electrons with curved arrows, compare contributor stability, and understand resonance hybrids.",
};

const tableOfContents = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Learning objectives" },
  { id: "meaning", label: "What resonance means" },
  { id: "rules", label: "Rules for resonance" },
  { id: "arrows", label: "Curved arrows" },
  { id: "contributors", label: "Major and minor contributors" },
  { id: "examples", label: "Worked examples" },
  { id: "hybrid", label: "Resonance hybrid" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "summary", label: "Summary" },
  { id: "practice", label: "Practice questions" },
  { id: "references", label: "References" },
];

export default function ResonancePage() {
  return (
    <LessonPage
      category="Fundamentals"
      title="Resonance"
      description="Learn how electron delocalisation is represented with resonance contributors and curved-arrow notation."
      readingTime="12 min"
      tableOfContents={tableOfContents}
    >
      <LessonSection id="overview" title="Overview">
        <p>
          Some molecules and ions cannot be described accurately by a single
          Lewis structure. In these cases, two or more valid structures can be
          drawn that differ only in the placement of electrons. These are called
          <strong> resonance contributors</strong>.
        </p>

        <div className="mt-8">
          <ResonanceCarboxylateInteractive />
        </div>
      </LessonSection>

      <LearningObjectives
        items={[
          "Explain what resonance contributors represent.",
          "Use curved arrows to move electron pairs correctly.",
          "Recognise which atoms may change formal charge.",
          "Compare major and minor resonance contributors.",
          "Describe the resonance hybrid and electron delocalisation.",
        ]}
      />

      <LessonSection id="meaning" title="What resonance means">
        <p>
          Resonance does not mean that a molecule rapidly switches between
          different structures. The molecule has one real electronic structure,
          called the <strong>resonance hybrid</strong>. The contributors are
          bookkeeping models that help us represent delocalised electrons.
        </p>

        <div className="mt-6">
          <Callout title="Key idea" tone="success">
            <p>
              Atoms remain in the same positions. Only electrons move when one
              resonance contributor is converted into another.
            </p>
          </Callout>
        </div>
      </LessonSection>

      <LessonSection id="rules" title="Rules for drawing resonance contributors">
        <ol className="list-decimal space-y-4 pl-7 marker:font-semibold marker:text-blue-700">
          <li>Keep the same atom connectivity in every contributor.</li>
          <li>Move only π electrons or lone-pair electrons.</li>
          <li>Do not move atoms or σ bonds.</li>
          <li>Preserve the overall charge of the species.</li>
          <li>Use valid Lewis structures with appropriate valence shells.</li>
          <li>Separate contributors with a double-headed resonance arrow.</li>
        </ol>
      </LessonSection>

      <LessonSection id="arrows" title="Curved-arrow notation">
        <p>
          A curved arrow shows the movement of an electron pair. The arrow must
          begin at the electrons being moved and end where those electrons will
          be placed.
        </p>

        <div className="mt-8">
          <CurvedArrowGuide />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card title="Lone pair to bond">
            <p>Start the arrow at a lone pair and point it toward an adjacent bond.</p>
          </Card>
          <Card title="Bond to atom">
            <p>
              Start the arrow at a π bond and point it toward the atom that will
              receive the electron pair.
            </p>
          </Card>
        </div>
      </LessonSection>

      <LessonSection id="contributors" title="Major and minor contributors">
        <p>
          Resonance contributors do not always contribute equally to the hybrid.
          More stable contributors make a larger contribution.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full border-collapse text-left text-base">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="px-5 py-4 font-semibold">More important</th>
                <th className="px-5 py-4 font-semibold">Less important</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4">Complete octets</td>
                <td className="px-5 py-4">Incomplete octets</td>
              </tr>
              <tr>
                <td className="px-5 py-4">Fewer formal charges</td>
                <td className="px-5 py-4">More charge separation</td>
              </tr>
              <tr>
                <td className="px-5 py-4">Negative charge on electronegative atoms</td>
                <td className="px-5 py-4">Negative charge on less electronegative atoms</td>
              </tr>
              <tr>
                <td className="px-5 py-4">Equivalent contributors contribute equally</td>
                <td className="px-5 py-4">Non-equivalent contributors may contribute unequally</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LessonSection>

      <LessonSection id="examples" title="Worked examples">
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-semibold text-slate-900">Carboxylate ion</h3>
            <p className="mt-3">
              A carboxylate ion has two equivalent contributors. In each one, one
              oxygen is double-bonded and the other bears the negative charge.
              Because the contributors are equivalent, the two carbon–oxygen
              bonds are identical in the resonance hybrid.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-semibold text-slate-900">Allylic cation</h3>
            <p className="mt-3">
              In an allylic cation, the π bond can shift toward the positively
              charged carbon. The positive charge is therefore delocalised over
              two carbon atoms.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-semibold text-slate-900">Amide group</h3>
            <p className="mt-3">
              The nitrogen lone pair can donate into the neighbouring carbonyl
              group. This gives the carbon–nitrogen bond partial double-bond
              character and helps explain the planarity of amides.
            </p>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="hybrid" title="The resonance hybrid">
        <p>
          The resonance hybrid combines features of all significant contributors.
          Delocalised bonds are often drawn with dashed lines, and distributed
          charge may be shown with partial-charge symbols.
        </p>

        <div className="mt-6">
          <Callout title="Consequences of delocalisation" tone="violet">
            <ul className="list-disc space-y-2 pl-6">
              <li>Bond lengths may become intermediate between single and double bonds.</li>
              <li>Charge may be spread over several atoms.</li>
              <li>The molecule or ion is often more stable than any one contributor suggests.</li>
            </ul>
          </Callout>
        </div>
      </LessonSection>

      <LessonSection id="mistakes" title="Common mistakes">
        <div className="space-y-5">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-slate-900">Moving atoms</h3>
            <p className="mt-2">
              Resonance contributors must have the same atom connectivity. Moving
              a hydrogen or changing the molecular skeleton creates a different
              species, not a resonance contributor.
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-slate-900">Moving σ bonds</h3>
            <p className="mt-2">
              Resonance arrows move lone pairs and π electrons. Breaking a σ bond
              usually represents a reaction step instead.
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-slate-900">Starting arrows at charges</h3>
            <p className="mt-2">
              A curved arrow starts at electrons, not at a positive or negative
              charge symbol.
            </p>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="summary" title="Summary">
        <SummaryBox>
          <p>
            Resonance contributors are alternative Lewis structures with the same
            atom connectivity but different electron placement. Curved arrows show
            electron-pair movement, and the real molecule is a resonance hybrid in
            which electrons and charge may be delocalised.
          </p>
        </SummaryBox>
      </LessonSection>

      <LessonSection id="practice" title="Practice questions">
        <PracticeQuestions
          questions={[
            "What must remain unchanged between resonance contributors?",
            "Where must the tail of a curved arrow begin?",
            "Why are the two contributors of a carboxylate ion equivalent?",
            "List three features of a major resonance contributor.",
            "Explain why resonance does not describe rapid structural switching.",
            "What effect can resonance have on bond length and molecular stability?",
          ]}
        />
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
          title: "Formal Charge",
          href: "/learn/fundamentals/formal-charge",
        }}
        next={{
          title: "Functional Groups",
          href: "/learn/fundamentals/functional-groups",
        }}
      />
    </LessonPage>
  );
}
