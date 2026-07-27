type PracticeQuestionsProps = {
  questions: string[];
};

export default function PracticeQuestions({ questions }: PracticeQuestionsProps) {
  return (
    <ol className="space-y-4">
      {questions.map((question, index) => (
        <li key={question} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">{index + 1}</span>
          <span className="pt-0.5 text-base leading-7 text-slate-700">{question}</span>
        </li>
      ))}
    </ol>
  );
}
