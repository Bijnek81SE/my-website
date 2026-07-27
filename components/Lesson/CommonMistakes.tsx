type Mistake = {
  title: string;
  explanation: string;
};

type CommonMistakesProps = {
  items: Mistake[];
};

export default function CommonMistakes({ items }: CommonMistakesProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <div className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-200 font-bold text-amber-900"
            >
              ×
            </span>
            <div>
              <h3 className="font-bold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-base leading-7 text-slate-700">
                {item.explanation}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
