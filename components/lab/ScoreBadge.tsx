type ScoreBadgeProps = {
  score: number;
  total: number;
};

export default function ScoreBadge({ score, total }: ScoreBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-950">
      <span aria-hidden="true">★</span>
      <span>Score {score}/{total}</span>
    </div>
  );
}
