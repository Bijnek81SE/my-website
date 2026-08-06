import Link from "next/link";
import Hero from "@/components/home/Hero";
import {
  Badge,
  ButtonLink,
  Card,
  Grid,
  Heading,
  Section,
} from "@/components/ui";

const learningPath = [
  {
    number: "01",
    title: "Foundations",
    description:
      "Atoms, bonding, hybridisation, Lewis structures, formal charge, and resonance.",
  },
  {
    number: "02",
    title: "Reactivity",
    description:
      "Acids, bases, nucleophiles, electrophiles, and curved-arrow reasoning.",
  },
  {
    number: "03",
    title: "Mechanisms",
    description:
      "Substitution, elimination, addition, carbonyl chemistry, and aromatic reactions.",
  },
];

const featuredLessons = [
  ["What Is Organic Chemistry?", "8 min", "/learn/fundamentals/what-is-organic-chemistry"],
  ["Atomic Structure", "10 min", "/learn/fundamentals/atomic-structure"],
  ["Chemical Bonding", "12 min", "/learn/fundamentals/chemical-bonding"],
  ["Hybridization", "12 min", "/learn/fundamentals/hybridization"],
  ["Lewis Structures", "14 min", "/learn/fundamentals/lewis-structures"],
  ["Formal Charge", "10 min", "/learn/fundamentals/formal-charge"],
  ["Resonance", "14 min", "/learn/fundamentals/resonance"],
];

export default function Home() {
  return (
    <main>
      <Hero />

      <Section className="pt-8 sm:pt-10">
        <div className="rounded-3xl border border-emerald-200 bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] p-6 shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <Badge tone="success">New: Organic Chemistry Workspace</Badge>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Keep structure, spectra, reactions, calculations, and notes in one workbench.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Select a molecule once, preserve your study context locally, and move directly into the specialised engines without losing your workflow.
            </p>
          </div>
          <ButtonLink href="/workspace" className="mt-6 shrink-0 lg:mt-0">
            Open workspace →
          </ButtonLink>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="rounded-3xl border border-indigo-200 bg-[linear-gradient(135deg,#eef2ff_0%,#ecfdf5_100%)] p-6 shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <Badge tone="violet">New: Retrosynthesis Planner</Badge>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Start with the target and reason backwards to viable starting materials.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Explore ranked disconnections, compare route reliability, and validate every reverse step with its forward mechanism.
            </p>
          </div>
          <ButtonLink href="/lab/retrosynthesis" className="mt-6 shrink-0 lg:mt-0">
            Open retrosynthesis planner →
          </ButtonLink>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="rounded-3xl border border-violet-200 bg-[linear-gradient(135deg,#f5f3ff_0%,#ecfdf5_100%)] p-6 shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <Badge tone="violet">New: Reaction Prediction &amp; Synthesis</Badge>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Predict the major product, then plan how to make it.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Choose reagents, justify regioselectivity and stereochemistry, and assemble multi-step routes with mechanism-based feedback.
            </p>
          </div>
          <ButtonLink href="/lab/reaction-prediction" className="mt-6 shrink-0 lg:mt-0">
            Open prediction lab →
          </ButtonLink>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="rounded-3xl border border-cyan-200 bg-[linear-gradient(135deg,#ecfeff_0%,#f5f3ff_100%)] p-6 shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <Badge tone="violet">New: Spectroscopy Engine</Badge>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Connect real spectral patterns to molecular structure.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Explore realistic simulated ¹H NMR, ¹³C NMR, IR, and mass spectra with interactive structure-to-signal assignments.
            </p>
          </div>
          <ButtonLink href="/lab/spectroscopy" className="mt-6 shrink-0 lg:mt-0">
            Open spectroscopy lab →
          </ButtonLink>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="rounded-3xl border border-violet-200 bg-[linear-gradient(135deg,#f5f3ff_0%,#ecfdf5_100%)] p-6 shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <Badge tone="violet">New: adaptive study dashboard</Badge>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              See your progress and know exactly what to study next.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Track completed lessons, maintain a study streak, and return to concepts when they are due for review—all saved locally in your browser.
            </p>
          </div>
          <ButtonLink href="/study" className="mt-6 shrink-0 lg:mt-0">
            Open study dashboard →
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Heading
            eyebrow="Learning path"
            title="Learn in the order chemistry makes sense."
            description="Each module builds on the previous one, so you understand why reactions happen instead of memorising disconnected facts."
          />

          <div className="grid gap-4">
            {learningPath.map((item) => (
              <Card
                key={item.number}
                contentClassName="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-1 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted" className="border-y border-slate-200">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Heading eyebrow="Start learning" title="Foundation lessons" />
          <ButtonLink href="/learn" variant="ghost">
            View full curriculum →
          </ButtonLink>
        </div>

        <Grid className="mt-10">
          {featuredLessons.map(([title, time, href], index) => (
            <Link
              key={title}
              href={href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-3">
                <Badge tone="success">Lesson {index + 1}</Badge>
                <span className="text-xs text-slate-500">{time}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-emerald-800">
                {title}
              </h3>
              <p className="mt-5 text-sm font-semibold text-emerald-700">
                Open lesson →
              </p>
            </Link>
          ))}
        </Grid>
      </Section>

      <Section>
        <div className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white sm:px-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
              Built for understanding
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Clear explanations. Accurate visuals. No unnecessary complexity.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Organic Chemistry Hub is designed to help students connect
              structure, electron movement, and reactivity.
            </p>
          </div>
          <ButtonLink href="/learn" className="mt-8 lg:mt-0 lg:ml-10">
            Explore the curriculum
          </ButtonLink>
        </div>
      </Section>
    </main>
  );
}
