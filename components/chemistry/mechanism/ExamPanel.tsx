import type { PracticeQuestion } from "./PracticeTypes";

type ExamPanelProps = {
  question: PracticeQuestion;
  answered: boolean;
  currentIndex: number;
  totalQuestions: number;
  completed: boolean;
};

export default function ExamPanel({
  question,
  answered,
  currentIndex,
  totalQuestions,
  completed,
}: ExamPanelProps) {
  return (
    <section
      className="rounded-2xl border border-rose-200 bg-rose-50 p-5"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rose-700">
          Exam mode
        </p>

        <p className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-rose-700">
          Question {currentIndex + 1} of {totalQuestions}
        </p>
      </div>

      <h3 className="mt-3 text-xl font-bold text-slate-950">
        {question.title}
      </h3>

      <p className="mt-3 leading-7 text-slate-700">
        {question.description}
      </p>

      <div className="mt-5 rounded-xl border border-rose-200 bg-white p-4">
        {!answered ? (
          <>
            <p className="font-semibold text-slate-900">
              {question.instruction}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              You have one attempt. Feedback and the correct answer remain
              hidden until the exam is complete.
            </p>
          </>
        ) : completed ? (
          <p className="font-semibold text-emerald-700">
            Exam complete. Review your results below.
          </p>
        ) : (
          <p className="font-semibold text-blue-700">
            Answer recorded. Continue to the next question.
          </p>
        )}
      </div>
    </section>
  );
}