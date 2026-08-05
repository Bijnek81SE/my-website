import type { Metadata } from "next";
import { LessonPage } from "@/components/Lesson";
import { getLessonBySlug } from "@/content/lesson-registry";
import AtomicStructureContent from "@/content/fundamentals/atomic-structure.mdx";


const lesson = getLessonBySlug("atomic-structure");

const tableOfContents = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Learning objectives" },
  { id: "subatomic-particles", label: "Subatomic particles" },
  { id: "atomic-number", label: "Atomic and mass numbers" },
  { id: "worked-example", label: "Worked example" },
  { id: "isotopes", label: "Isotopes" },
  { id: "electrons", label: "Electrons and orbitals" },
  { id: "valence-electrons", label: "Valence electrons" },
  { id: "ions", label: "Ions" },
  { id: "carbon", label: "Carbon atom" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "summary", label: "Summary" },
  { id: "practice", label: "Practice questions" },
  { id: "references", label: "References" },
];

export const metadata: Metadata = {
  title: `${lesson.title} | Organic Chemistry Hub`,
  description: lesson.description,
};

export default function AtomicStructurePage() {
  return (
    <LessonPage lesson={lesson} tableOfContents={tableOfContents}>
      <AtomicStructureContent />
    </LessonPage>
  );
}
