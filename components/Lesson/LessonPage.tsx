import type { ReactNode } from "react";
import Link from "next/link";
import LessonHeader from "./LessonHeader";
import LessonTableOfContents from "./LessonTableOfContents";

type TableOfContentsItem = {
  id: string;
  label: string;
};

type LessonPageProps = {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  tableOfContents: TableOfContentsItem[];
  children: ReactNode;
};

export default function LessonPage({
  title,
  description,
  category,
  readingTime,
  tableOfContents,
  children,
}: LessonPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500"
      >
        <Link href="/learn" className="hover:text-blue-700">
          Learn
        </Link>

        <span aria-hidden="true">/</span>
        <span>{category}</span>

        <span aria-hidden="true">/</span>
        <span className="text-slate-700">{title}</span>
      </nav>

      <LessonHeader
        category={category}
        title={title}
        description={description}
        readingTime={readingTime}
      />

      <div className="mt-12 grid gap-12 xl:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0 text-lg leading-8 text-slate-700">
          {children}
        </article>

        <LessonTableOfContents items={tableOfContents} />
      </div>
    </main>
  );
}