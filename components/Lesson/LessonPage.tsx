import type { ReactNode } from "react";
import Link from "next/link";
import type { LessonRecord } from "@/content/lesson-registry";
import { getLessonPosition } from "@/content/lesson-registry";
import { getKnowledgeNodeIdForLesson } from "@/content/knowledge-graph";
import { Prerequisites, RelatedConcepts, StudyNext } from "@/components/knowledge";
import LessonHeader from "./LessonHeader";
import LessonNavigation from "./LessonNavigation";
import LessonProgress from "./LessonProgress";
import LessonTableOfContents from "./LessonTableOfContents";

export type LessonTableOfContentsItem = {
  id: string;
  label: string;
};

type LessonPageProps = {
  lesson: LessonRecord;
  tableOfContents: readonly LessonTableOfContentsItem[];
  children: ReactNode;
};

export default function LessonPage({
  lesson,
  tableOfContents,
  children,
}: LessonPageProps) {
  const progress = getLessonPosition(lesson.slug);
  const knowledgeNodeId = getKnowledgeNodeIdForLesson(lesson.slug);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500"
      >
        <Link
          href="/learn"
          className="rounded-sm hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Learn
        </Link>
        <span aria-hidden="true">/</span>
        <span>{lesson.module}</span>
        <span aria-hidden="true">/</span>
        <span className="text-slate-700" aria-current="page">
          {lesson.title}
        </span>
      </nav>

      <LessonHeader
        category={lesson.module}
        title={lesson.title}
        description={lesson.description}
        readingTime={lesson.readingTime}
      />
      <LessonProgress {...progress} />

      <div className="mt-12 grid gap-12 xl:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0 text-lg leading-8 text-slate-700">
          <Prerequisites nodeId={knowledgeNodeId} />
          <div className="mt-10">{children}</div>
          <div className="mt-12 space-y-6">
            <RelatedConcepts nodeId={knowledgeNodeId} />
            <StudyNext nodeId={knowledgeNodeId} />
          </div>
          <LessonNavigation previous={lesson.previous} next={lesson.next} />
        </article>

        <LessonTableOfContents items={tableOfContents} />
      </div>
    </main>
  );
}
