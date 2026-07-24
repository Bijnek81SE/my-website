const companies = [
  "Northstar",
  "Vertex",
  "Nova Labs",
  "Cloudframe",
  "Brightline",
];

export default function TrustedBy() {
  return (
    <section className="border-y border-slate-800/70 bg-slate-900/30 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm uppercase tracking-[0.3em] text-slate-500">
          Trusted by innovative teams
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 text-center text-lg font-semibold text-slate-400 sm:grid-cols-3 lg:grid-cols-5">
          {companies.map((company) => (
            <div
              key={company}
              className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-5"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}