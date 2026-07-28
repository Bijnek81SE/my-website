"use client";

type ChallengeFooterProps = {
  onReset?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  resetLabel?: string;
  nextLabel?: string;
};

export default function ChallengeFooter({
  onReset,
  onNext,
  nextDisabled = false,
  resetLabel = "Reset",
  nextLabel = "Next exercise",
}: ChallengeFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <button
        type="button"
        onClick={onReset}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        {resetLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="rounded-xl bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {nextLabel}
      </button>
    </div>
  );
}
