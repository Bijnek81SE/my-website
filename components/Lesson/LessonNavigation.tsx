import Link from "next/link";

type LessonNavigationProps = {
  previous?: {
    title: string;
    href: string;
  };

  next?: {
    title: string;
    href: string;
  };
};

export default function LessonNavigation({
  previous,
  next,
}: LessonNavigationProps) {
  return (
    <nav className="mt-16 grid gap-4 border-t border-slate-200 pt-8 md:grid-cols-2">
      {previous ? (
        <Link
          href={previous.href}
          className="rounded-xl border border-slate-200 p-6 transition hover:border-blue-500 hover:shadow"
        >
          <p className="text-sm text-slate-500">← Previous</p>

          <h3 className="mt-2 text-lg font-semibold">
            {previous.title}
          </h3>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="rounded-xl border border-slate-200 p-6 text-right transition hover:border-blue-500 hover:shadow"
        >
          <p className="text-sm text-slate-500">Next →</p>

          <h3 className="mt-2 text-lg font-semibold">
            {next.title}
          </h3>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}