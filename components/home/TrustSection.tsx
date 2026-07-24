export default function TrustSection() {
  return (
    <section className="border-y border-slate-200 bg-emerald-950 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 md:grid-cols-3 lg:px-8">
        {[
          ['Accuracy first', 'AI accelerates drafting, while chemistry expertise guides review, correction, and context.'],
          ['Useful structure', 'Every topic connects to related lessons, reactions, reagents, and practical tools.'],
          ['Built to improve', 'Pages are designed for revision as better examples, references, and visuals are added.'],
        ].map(([title, text]) => (
          <div key={title}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-100/80">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
