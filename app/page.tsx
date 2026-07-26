import Link from "next/link";
import Hero from "@/components/home/Hero";
import ButtonLink from "@/components/ui/ButtonLink";

const learningPath = [
  ["01", "Foundations", "Atoms, bonding, hybridisation, Lewis structures, formal charge, and resonance."],
  ["02", "Reactivity", "Acids, bases, nucleophiles, electrophiles, and curved-arrow reasoning."],
  ["03", "Mechanisms", "Substitution, elimination, addition, carbonyl chemistry, and aromatic reactions."],
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
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Learning path</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Learn in the order chemistry makes sense.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Each module builds on the previous one, so you understand why reactions happen instead of memorising disconnected facts.
            </p>
          </div>

          <div className="grid gap-4">
            {learningPath.map(([number, title, description]) => (
              <article key={number} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[auto_1fr] sm:items-start">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800">{number}</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-1 leading-7 text-slate-600">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Start learning</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Foundation lessons</h2>
            </div>
            <ButtonLink href="/learn" variant="ghost">View full curriculum →</ButtonLink>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredLessons.map(([title, time, href], index) => (
              <Link key={title} href={href} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Lesson {index + 1}</span>
                  <span className="text-xs text-slate-400">{time}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-emerald-800">{title}</h3>
                <p className="mt-5 text-sm font-semibold text-emerald-700">Open lesson →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white sm:px-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">Built for understanding</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">Clear explanations. Accurate visuals. No unnecessary complexity.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">Organic Chemistry Hub is designed to help students connect structure, electron movement, and reactivity.</p>
          </div>
          <ButtonLink href="/learn" className="mt-8 lg:mt-0 lg:ml-10">Explore the curriculum</ButtonLink>
        </div>
      </section>
    </>
  );
}
