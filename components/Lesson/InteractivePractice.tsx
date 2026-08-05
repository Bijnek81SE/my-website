"use client";

import { useMemo, useState } from "react";

export type InteractivePracticeQuestion = {
  id: string;
  prompt: string;
  type: "multiple-choice" | "short-answer";
  options?: readonly string[];
  answer: string | readonly string[];
  explanation: string;
  hint?: string;
};

type QuestionState = {
  response: string;
  checked: boolean;
};

type InteractivePracticeProps = {
  questions: readonly InteractivePracticeQuestion[];
};

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ");
}

function isCorrect(question: InteractivePracticeQuestion, response: string): boolean {
  const accepted = typeof question.answer === "string"
    ? [question.answer]
    : question.answer;

  return accepted.some((answer) => normalize(answer) === normalize(response));
}

export default function InteractivePractice({ questions }: InteractivePracticeProps) {
  const [states, setStates] = useState<Record<string, QuestionState>>({});
  const [hintIds, setHintIds] = useState<Set<string>>(() => new Set());

  const results = useMemo(
    () =>
      questions.map((question) => {
        const state = states[question.id];
        return state?.checked ? isCorrect(question, state.response) : null;
      }),
    [questions, states],
  );

  const answeredCount = results.filter((result) => result !== null).length;
  const correctCount = results.filter(Boolean).length;

  function updateResponse(id: string, response: string) {
    setStates((current) => ({
      ...current,
      [id]: { response, checked: false },
    }));
  }

  function checkAnswer(id: string) {
    setStates((current) => {
      const currentState = current[id];
      if (!currentState?.response.trim()) return current;

      return {
        ...current,
        [id]: { ...currentState, checked: true },
      };
    });
  }

  function reset() {
    setStates({});
    setHintIds(new Set());
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-950" aria-live="polite">
          {answeredCount === 0
            ? "Answer each question, then check your response."
            : `${correctCount} correct out of ${answeredCount} checked`}
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Reset practice
        </button>
      </div>

      {questions.map((question, index) => {
        const state = states[question.id] ?? { response: "", checked: false };
        const correct = state.checked && isCorrect(question, state.response);
        const showHint = hintIds.has(question.id);
        const feedbackId = `${question.id}-feedback`;

        return (
          <fieldset
            key={question.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <legend className="flex max-w-full gap-3 px-1 text-base font-semibold leading-7 text-slate-950">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
                {index + 1}
              </span>
              <span>{question.prompt}</span>
            </legend>

            <div className="mt-5 space-y-3">
              {question.type === "multiple-choice" ? (
                question.options?.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50/50"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={state.response === option}
                      onChange={(event) => updateResponse(question.id, event.target.value)}
                      aria-describedby={state.checked ? feedbackId : undefined}
                      className="mt-1 h-4 w-4 accent-blue-700"
                    />
                    <span className="text-base leading-6 text-slate-700">{option}</span>
                  </label>
                ))
              ) : (
                <label className="block">
                  <span className="sr-only">Your answer</span>
                  <input
                    type="text"
                    value={state.response}
                    onChange={(event) => updateResponse(question.id, event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") checkAnswer(question.id);
                    }}
                    aria-describedby={state.checked ? feedbackId : undefined}
                    placeholder="Type your answer"
                    className="min-h-11 w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  />
                </label>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => checkAnswer(question.id)}
                disabled={!state.response.trim()}
                className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Check answer
              </button>

              {question.hint ? (
                <button
                  type="button"
                  aria-expanded={showHint}
                  onClick={() =>
                    setHintIds((current) => {
                      const next = new Set(current);
                      if (next.has(question.id)) next.delete(question.id);
                      else next.add(question.id);
                      return next;
                    })
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  {showHint ? "Hide hint" : "Show hint"}
                </button>
              ) : null}
            </div>

            {showHint && question.hint ? (
              <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                <strong>Hint:</strong> {question.hint}
              </p>
            ) : null}

            {state.checked ? (
              <div
                id={feedbackId}
                role="status"
                className={`mt-4 rounded-xl border p-4 ${
                  correct
                    ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                    : "border-rose-200 bg-rose-50 text-rose-950"
                }`}
              >
                <p className="font-semibold">{correct ? "Correct" : "Not quite"}</p>
                <p className="mt-1 text-sm leading-6">{question.explanation}</p>
              </div>
            ) : null}
          </fieldset>
        );
      })}
    </div>
  );
}
