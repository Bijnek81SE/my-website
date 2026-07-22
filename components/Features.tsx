export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-3"
    >
      <article className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-5 text-3xl">⚡</div>
        <h2 className="text-xl font-semibold">Fast Automation</h2>
        <p className="mt-3 leading-7 text-slate-400">
          Automate repetitive work and help your team focus on higher-value
          tasks.
        </p>
      </article>

      <article className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-5 text-3xl">📊</div>
        <h2 className="text-xl font-semibold">Smart Analytics</h2>
        <p className="mt-3 leading-7 text-slate-400">
          Turn complex data into clear insights for faster and better
          decisions.
        </p>
      </article>

      <article className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-5 text-3xl">🔒</div>
        <h2 className="text-xl font-semibold">Secure by Design</h2>
        <p className="mt-3 leading-7 text-slate-400">
          Build with privacy, reliability, and security at the center of your
          product.
        </p>
      </article>
    </section>
  );
}