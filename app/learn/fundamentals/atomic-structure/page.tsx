import type { Metadata } from "next";
import AtomicStructureContent, {
  tableOfContents,
} from "@/content/fundamentals/atomic-structure.mdx";
import { getLessonBySlug } from "@/content/lesson-registry";
import { LessonNavigation, LessonPage } from "@/components/Lesson";

const lesson = getLessonBySlug("atomic-structure");

export const metadata: Metadata = {
  title: `${lesson.title} | Organic Chemistry Hub`,
  description: lesson.description,
};

export default function AtomicStructurePage() {
  return (
    <LessonPage
      category={lesson.module}
      title={lesson.title}
      description={lesson.description}
      readingTime={lesson.readingTime}
      tableOfContents={tableOfContents}
    >
      <AtomicStructureContent />

      <LessonNavigation previous={lesson.previous} next={lesson.next} />
    </LessonPage>
  );
}
