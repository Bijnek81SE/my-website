export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-bold text-slate-900">
        Organic Chemistry Hub
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-slate-600">
        Learn organic chemistry through structured lessons, named reactions,
        reagent guides, calculators, and practical resources.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h2 className="font-semibold">Learn</h2>
          <p className="mt-2 text-sm text-slate-600">
            Step-by-step lessons.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="font-semibold">Named Reactions</h2>
          <p className="mt-2 text-sm text-slate-600">
            Comprehensive reaction database.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="font-semibold">Reagents</h2>
          <p className="mt-2 text-sm text-slate-600">
            Practical reagent reference.
          </p>
        </div>
      </div>
    </div>
  );
}