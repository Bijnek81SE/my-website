import ButtonLink from "@/components/ui/ButtonLink";
import ChemistryHeroVisual from "@/components/home/ChemistryHeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#f8fffb_0%,#ffffff_70%)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_20%,rgba(16,185,129,0.15),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(37,99,235,0.10),transparent_26%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-32">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            A visual course for organic chemistry
          </p>

          <h1 className="mt-7 max-w-4xl text-5xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
            See the structure. Understand the chemistry.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Build lasting intuition with structured lessons, accurate diagrams,
            worked examples, and a clear path from atomic structure to organic
            synthesis.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/learn">Start the free course</ButtonLink>
            <ButtonLink href="/learn/fundamentals/what-is-organic-chemistry" variant="secondary">
              Open the first lesson
            </ButtonLink>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-slate-200 pt-7">
            {["7 foundation lessons", "Visual explanations", "Chemist-led content"].map((item, index) => (
              <div key={item}>
                <dt className="text-2xl font-bold text-slate-950">{index === 0 ? "7" : index === 1 ? "SVG" : "✓"}</dt>
                <dd className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">{item}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ChemistryHeroVisual />
      </div>
    </section>
  );
}
