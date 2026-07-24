import Link from "next/link";

type LessonLink = {
  title: string;
  href: string;
};

type LessonNavigationProps = {
  previous?: LessonLink;
  next?: LessonLink;
};

const cardClassName =
  "flex min-h-[140px] flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-md";

export default function LessonNavigation({
  previous,
  next,
}: LessonNavigationProps) {
  return (
    <nav
      aria-label="Lesson navigation"
      className="mt-16 grid gap-4 border-t border-slate-200 pt-8 md:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          className={cardClassName}
          aria-label={`Previous lesson: ${previous.title}`}
        >
          <p className="text-sm font-medium text-slate-500">
            ← Previous
          </p>

          <h3 className="mt-3 text-lg font-semibold text-slate-900">
            {previous.title}
          </h3>
        </Link>
      ) : (
        <div className="hidden md:block" aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={next.href}
          className={`${cardClassName} text-right`}
          aria-label={`Next lesson: ${next.title}`}
        >
          <p className="text-sm font-medium text-slate-500">
            Next →
          </p>

          <h3 className="mt-3 text-lg font-semibold text-slate-900">
            {next.title}
          </h3>
        </Link>
      ) : (
        <div className="hidden md:block" aria-hidden="true" />
      )}
    </nav>
  );
}