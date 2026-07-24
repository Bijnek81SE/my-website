"use client";

import { useEffect, useState } from "react";

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
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          On this page
        </h2>

        <nav className="mt-4" aria-label="Table of contents">
          <ul className="space-y-1 text-sm">
            {items.map((item) => {
              const isActive = activeId === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`block rounded-md border-l-2 px-3 py-2 transition ${
                      isActive
                        ? "border-blue-700 bg-blue-50 font-semibold text-blue-700"
                        : "border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-blue-700"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}