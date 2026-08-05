import InteractivePractice, {
  type InteractivePracticeQuestion,
} from "./InteractivePractice";

type PracticeQuestionInput = Omit<InteractivePracticeQuestion, "type"> & {
  type: string;
};

type PracticeQuestionsProps = {
  questions: readonly (string | PracticeQuestionInput)[];
};

function isInteractiveQuestion(
  question: string | PracticeQuestionInput,
): question is PracticeQuestionInput {
  return (
    typeof question !== "string" &&
    (question.type === "multiple-choice" || question.type === "short-answer")
  );
}

export default function PracticeQuestions({ questions }: PracticeQuestionsProps) {
  const interactiveQuestions = questions.filter(isInteractiveQuestion).map(
    (question): InteractivePracticeQuestion => ({
      ...question,
      type: question.type as InteractivePracticeQuestion["type"],
    }),
  );

  if (interactiveQuestions.length === questions.length) {
    return <InteractivePractice questions={interactiveQuestions} />;
  }

  return (
    <ol className="space-y-4">
      {questions.map((question, index) => {
        const text = typeof question === "string" ? question : question.prompt;
        return (
          <li
            key={typeof question === "string" ? question : question.id}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
              {index + 1}
            </span>
            <span className="pt-0.5 text-base leading-7 text-slate-700">{text}</span>
          </li>
        );
      })}
    </ol>
  );
}
