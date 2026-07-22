export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-10 top-40 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            AI tools for modern businesses
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            The AI platform every modern business needs
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Automate workflows, generate insights, and build intelligent
            applications using one powerful AI platform.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-cyan-400 px-7 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Start Free
            </a>

            <a
              href="#features"
              className="rounded-full border border-slate-600 px-7 py-3 text-center font-semibold transition hover:border-white"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            <span>✓ No credit card</span>
            <span>✓ Fast setup</span>
            <span>✓ Secure by design</span>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">AI Workspace</p>
                  <h2 className="text-xl font-semibold">Business Overview</h2>
                </div>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Live
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Tasks automated</p>
                  <p className="mt-2 text-2xl font-bold">1,248</p>
                  <p className="mt-1 text-xs text-emerald-300">+18.2%</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Hours saved</p>
                  <p className="mt-2 text-2xl font-bold">384</p>
                  <p className="mt-1 text-xs text-emerald-300">+12.4%</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Accuracy</p>
                  <p className="mt-2 text-2xl font-bold">98.7%</p>
                  <p className="mt-1 text-xs text-cyan-300">Excellent</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-semibold">Automation activity</p>
                  <p className="text-sm text-slate-400">Last 7 days</p>
                </div>

                <div className="flex h-40 items-end gap-3">
                  {[35, 52, 45, 70, 58, 82, 94].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-lg bg-cyan-400/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Top workflow</p>
                  <p className="mt-2 font-semibold">Customer support AI</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">System status</p>
                  <p className="mt-2 font-semibold text-emerald-300">
                    All systems operational
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}