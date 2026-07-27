type LearningObjectivesProps = {
  items: string[];
};

export default function LearningObjectives({ items }: LearningObjectivesProps) {
  return (
    <section id="objectives" className="mt-12 scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Lesson goals</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Learning objectives</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-xl bg-white/70 p-3 text-base leading-7 text-slate-700">
            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white" aria-hidden="true">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
