export default function Hero() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
      <p className="mb-4 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
        AI tools for modern businesses
      </p>

      <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
        Build smarter products with
        <span className="text-cyan-400"> artificial intelligence</span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        LabdocAI helps teams automate workflows, analyze data, and create
        intelligent digital experiences.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button className="rounded-full bg-cyan-400 px-7 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
          Start Building
        </button>

        <a
          href="#features"
          className="rounded-full border border-slate-600 px-7 py-3 font-semibold hover:border-white"
        >
          View Features
        </a>
      </div>
    </section>
  );
}