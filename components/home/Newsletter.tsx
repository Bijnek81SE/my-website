import Link from 'next/link';

export default function Newsletter() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Build with us</p>
          <div className="mt-3 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">The first lesson is next.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                The site structure is now ready. We will begin filling it with reviewed lessons,
                reaction references, reagent guides, and calculators in their proper places.
              </p>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View learning roadmap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
