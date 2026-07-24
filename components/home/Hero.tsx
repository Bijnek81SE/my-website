import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.08),transparent_32%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div>
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            Learn · Reactions · Reagents · Tools
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Learn organic chemistry clearly.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            A structured knowledge hub for students, researchers, and professional
            chemists—built around accurate explanations, practical context, and
            connected learning paths.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Start learning
            </Link>
            <Link
              href="/named-reactions"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Browse named reactions
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            <span>✓ Chemist-reviewed workflow</span>
            <span>✓ Clear learning sequence</span>
            <span>✓ Practical reference tools</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 shadow-2xl shadow-slate-300/40">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div>
                <p className="text-sm text-emerald-400">Learning roadmap</p>
                <h2 className="mt-1 text-xl font-semibold">From foundations to synthesis</h2>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Growing weekly
              </span>
            </div>
            <ol className="mt-6 space-y-4">
              {[
                ['01', 'Bonding and structure'],
                ['02', 'Acids, bases, and reactivity'],
                ['03', 'Mechanisms and stereochemistry'],
                ['04', 'Functional-group chemistry'],
                ['05', 'Spectroscopy and synthesis'],
              ].map(([number, label]) => (
                <li key={number} className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-bold text-emerald-300">
                    {number}
                  </span>
                  <span className="font-medium text-slate-200">{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
