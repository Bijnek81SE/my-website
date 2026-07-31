import type {
  PracticeFeedback,
  PracticeQuestion,
} from "./PracticeTypes";

type PracticePanelProps = {
  question: PracticeQuestion;
  feedback: PracticeFeedback;
  answered: boolean;
  stepDescription: string;
  revealMessage?: string;
};

export default function PracticePanel({
  question,
  feedback,
  answered,
  stepDescription,
  revealMessage,
}: PracticePanelProps) {
  return (
    <div
      className="rounded-2xl border border-blue-100 bg-blue-50 p-5"
      aria-live="polite"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
        Practice
      </p>

      <h3 className="mt-2 text-xl font-bold text-slate-950">
        {question.title}
      </h3>

      <p className="mt-3 leading-7 text-slate-700">
        {answered ? stepDescription : question.description}
      </p>

      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
        {feedback === "idle" && !answered ? (
          <p className="text-slate-700">
            {question.instruction}
          </p>
        ) : null}

        {feedback === "incorrect" && !answered ? (
          <p className="font-semibold text-red-600">
            {question.incorrectFeedback}
          </p>
        ) : null}

        {answered ? (
          <div className="space-y-3">
            <p className="font-semibold text-green-700">
              ✓ Correct!
            </p>

            <p className="text-slate-700">
              {question.correctExplanation}
            </p>

            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
              {revealMessage ??
                "You have identified the correct answer."}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}