import type { Metadata } from "next";
import { LessonPage } from "@/components/Lesson";
import { getLessonBySlug } from "@/content/lessons";
import ResonanceLessonContent from "./content.mdx";
import { createPageMetadata } from "@/lib/seo";

const lesson = getLessonBySlug("resonance");

export const metadata: Metadata = createPageMetadata({
  title: lesson.title,
  description: lesson.description,
  path: lesson.href,
  type: "article",
  keywords: [lesson.module, "organic chemistry lesson"],
});

const tableOfContents = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Learning objectives" },
  { id: "meaning", label: "What resonance means" },
  { id: "rules", label: "Rules for resonance" },
  { id: "arrows", label: "Curved arrows" },
  { id: "contributors", label: "Major and minor contributors" },
  { id: "examples", label: "Worked examples" },
  { id: "hybrid", label: "Resonance hybrid" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "summary", label: "Summary" },
  { id: "practice", label: "Practice questions" },
  { id: "references", label: "References" },
] as const;

export default function ResonancePage() {
  return (
    <LessonPage lesson={lesson} tableOfContents={tableOfContents}>
      <ResonanceLessonContent />
    </LessonPage>
  );
}
