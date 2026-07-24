import type { ReactNode } from "react";

type LessonSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function LessonSection({
  id,
  title,
  children,
  className = "",
}: LessonSectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <h2 className="mt-12 text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>

      <div className="mt-5">{children}</div>
    </section>
  );
}