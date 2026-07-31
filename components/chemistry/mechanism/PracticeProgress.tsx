import type { PracticeSessionStats } from "./PracticeTypes";

type PracticeProgressProps = {
  stats: PracticeSessionStats;
};

export default function PracticeProgress({
  stats,
}: PracticeProgressProps) {
  const progress =
    stats.totalQuestions === 0
      ? 0
      : Math.round(
          (stats.completedQuestions / stats.totalQuestions) * 100,
        );

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4"
      aria-label="Practice progress"
    >
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-slate-800">
          Practice progress
        </span>

        <span className="font-semibold text-slate-600">
          {stats.completedQuestions}/{stats.totalQuestions}
        </span>
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={`${progress}% of practice questions completed`}
      >
        <div
          className="h-full rounded-full bg-emerald-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {stats.completed
          ? "Practice session complete."
          : `${progress}% complete`}
      </p>
    </section>
  );
}