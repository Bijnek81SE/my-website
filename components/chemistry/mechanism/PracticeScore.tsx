import type { PracticeSessionStats } from "./PracticeTypes";

type PracticeScoreProps = {
  stats: PracticeSessionStats;
};

function starLabel(stars: number): string {
  return `${"★".repeat(stars)}${"☆".repeat(5 - stars)}`;
}

export default function PracticeScore({
  stats,
}: PracticeScoreProps) {
  return (
    <section
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
      aria-label="Practice score"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Session score
          </p>

          <p
            className="mt-1 text-2xl font-bold tracking-wide text-amber-500"
            aria-label={`${stats.stars} out of 5 stars`}
          >
            {starLabel(stats.stars)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-slate-950">
            {stats.score}
          </p>

          <p className="text-sm text-slate-500">
            out of 100
          </p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Accuracy
          </dt>

          <dd className="mt-1 text-xl font-bold text-slate-950">
            {stats.accuracy}%
          </dd>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Attempts
          </dt>

          <dd className="mt-1 text-xl font-bold text-slate-950">
            {stats.attempts}
          </dd>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Correct
          </dt>

          <dd className="mt-1 text-xl font-bold text-emerald-700">
            {stats.correctAnswers}
          </dd>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Incorrect
          </dt>

          <dd className="mt-1 text-xl font-bold text-rose-700">
            {stats.incorrectAnswers}
          </dd>
        </div>
      </dl>

      {stats.completed ? (
        <div
          className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
          role="status"
        >
          ✓ Practice session completed
        </div>
      ) : null}
    </section>
  );
}