type LessonProgressProps = {
  current: number;
  total: number;
  percentage: number;
};

export default function LessonProgress({
  current,
  total,
  percentage,
}: LessonProgressProps) {
  return (
    <div className="mt-6 max-w-xl" aria-label={`Lesson ${current} of ${total}`}>
      <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
        <span>
          Lesson {current} of {total}
        </span>
        <span>{percentage}% through Fundamentals</span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label="Fundamentals module progress"
      >
        <div
          className="h-full rounded-full bg-blue-700 transition-[width] duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
