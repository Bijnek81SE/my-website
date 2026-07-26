import Link from "next/link";

type ModuleCardProps = {
  number: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  href?: string;
  status: "available" | "coming-soon";
  topics: string[];
};

export default function ModuleCard({
  number,
  title,
  description,
  lessons,
  duration,
  href = "#",
  status,
  topics,
}: ModuleCardProps) {
  const available = status === "available";

  const body = (
    <>
      <div className="flex items-start justify-between gap-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Module {number}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
            {title}
          </h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            available
              ? "bg-emerald-100 text-emerald-800"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {available ? "Available" : "Coming soon"}
        </span>
      </div>

      <p className="mt-4 leading-7 text-slate-600">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 text-sm">
        <span className="text-slate-500">
          {lessons} lessons · {duration}
        </span>
        <span className={`font-semibold ${available ? "text-emerald-700" : "text-slate-400"}`}>
          {available ? "Start module →" : "In development"}
        </span>
      </div>
    </>
  );

  const classes =
    "group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition sm:p-7";

  return available ? (
    <Link
      href={href}
      className={`${classes} hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-200/70`}
    >
      {body}
    </Link>
  ) : (
    <article className={`${classes} opacity-85`}>{body}</article>
  );
}
