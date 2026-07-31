import type { HintState } from "./HintTypes";

type HintPanelProps = {
  hintState: HintState;
  answered: boolean;
};

export default function HintPanel({
  hintState,
  answered,
}: HintPanelProps) {
  if (answered || !hintState.activeHint) {
    return null;
  }

  return (
    <aside
      className="rounded-2xl border border-amber-200 bg-amber-50 p-4"
      aria-live="polite"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">
        Hint
      </p>

      <p className="mt-2 leading-7 text-amber-950">
        {hintState.activeHint.message}
      </p>

      {hintState.shouldHighlightTarget ? (
        <p className="mt-3 text-sm font-semibold text-amber-800">
          The correct target is now highlighted on the reaction diagram.
        </p>
      ) : null}

      {hintState.shouldRevealAnswer ? (
        <p className="mt-3 text-sm font-semibold text-rose-700">
          The correct answer has been revealed so you can continue.
        </p>
      ) : null}
    </aside>
  );
}