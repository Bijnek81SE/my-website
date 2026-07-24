import LessonHeader from "@/components/Lesson/LessonHeader";

export const metadata = {
  title: "What Is Organic Chemistry? | Organic Chemistry Hub",
  description:
    "Learn the fundamentals of organic chemistry and why carbon chemistry is central to life, medicine, and materials.",
};

export default function WhatIsOrganicChemistryPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <LessonHeader
        category="Fundamentals"
        title="What Is Organic Chemistry?"
        description="Organic chemistry is the study of carbon-containing compounds, their structures, properties, reactions, and synthesis."
        readingTime="8 min"
      />

      <section className="prose prose-slate mt-12 max-w-none">
        <h2>Overview</h2>

        <p>
          Organic chemistry is the branch of chemistry concerned with the
          structure, properties, reactions, and synthesis of carbon-containing
          compounds. Carbon's ability to form stable covalent bonds with itself
          and many other elements allows the formation of millions of unique
          molecules.
        </p>

        <h2>Learning Objectives</h2>

        <ul>
          <li>Define organic chemistry.</li>
          <li>Explain why carbon is unique.</li>
          <li>Recognize common classes of organic compounds.</li>
          <li>Understand why organic chemistry is important.</li>
        </ul>

        <h2>Why It Matters</h2>

        <p>
          Organic chemistry underpins pharmaceuticals, biotechnology,
          agriculture, polymers, fuels, and the chemistry of life itself.
        </p>

        <h2>Summary</h2>

        <p>
          A strong understanding of organic chemistry begins with understanding
          carbon. The next lessons will build on this foundation by exploring
          atomic structure, bonding, and molecular geometry.
        </p>
      </section>
    </main>
  );
}