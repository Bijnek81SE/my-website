type TableOfContentsItem = {
  id: string;
  label: string;
};

type LessonTableOfContentsProps = {
  items: TableOfContentsItem[];
};

export default function LessonTableOfContents({
  items,
}: LessonTableOfContentsProps) {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          On this page
        </h2>

        <nav className="mt-4" aria-label="Table of contents">
          <ul className="space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-slate-600 transition hover:text-blue-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}