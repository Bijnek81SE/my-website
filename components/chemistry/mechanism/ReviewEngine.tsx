import type {
  ReviewAnswer,
  ReviewSession,
  ReviewTopic,
  ReviewTopicResult,
} from "./ReviewTypes";

type ReviewEngineProps<
  TTarget extends string,
> = {
  review: ReviewSession<TTarget>;
  onRetryExam: () => void;
};

function resultClasses(correct: boolean): string {
  return correct
    ? "border-emerald-200 bg-emerald-50"
    : "border-rose-200 bg-rose-50";
}

function resultLabelClasses(correct: boolean): string {
  return correct
    ? "text-emerald-700"
    : "text-rose-700";
}

function formatTarget(target: string): string {
  return target
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

function TopicSummary({
  title,
  results,
}: {
  title: string;
  results: ReviewTopicResult[];
}) {
  if (results.length === 0) {
    return null;
  }

  return (
    <section>
      <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
        {title}
      </h4>

      <div className="mt-3 space-y-2">
        {results.map((result) => (
          <div
            key={result.topic}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <span className="font-semibold text-slate-800">
              {result.topic}
            </span>

            <span className="text-sm font-bold text-slate-600">
              {result.accuracy}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnswerReview<
  TTarget extends string,
>({
  answer,
  index,
}: {
  answer: ReviewAnswer<TTarget>;
  index: number;
}) {
  return (
    <article
      className={`rounded-2xl border p-5 ${resultClasses(
        answer.correct,
      )}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Question {index + 1} · {answer.topic}
          </p>

          <h4 className="mt-2 font-bold text-slate-950">
            {answer.question.title}
          </h4>
        </div>

        <p
          className={`text-sm font-bold ${resultLabelClasses(
            answer.correct,
          )}`}
        >
          {answer.correct ? "✓ Correct" : "✗ Incorrect"}
        </p>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/80 bg-white/80 p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Your answer
          </dt>

          <dd className="mt-1 font-semibold text-slate-900">
            {formatTarget(answer.selectedTarget)}
          </dd>
        </div>

        <div className="rounded-xl border border-white/80 bg-white/80 p-3">
          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Correct answer
          </dt>

          <dd className="mt-1 font-semibold text-slate-900">
            {formatTarget(answer.correctTarget)}
          </dd>
        </div>
      </dl>

      <div className="mt-4 rounded-xl border border-white/80 bg-white/80 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Explanation
        </p>

        <p className="mt-2 leading-7 text-slate-700">
          {answer.question.correctExplanation}
        </p>
      </div>
    </article>
  );
}

export function inferReviewTopic(
  questionId: string,
  title: string,
): ReviewTopic {
  const text = `${questionId} ${title}`.toLowerCase();

  if (
    text.includes("nucleophile") ||
    text.includes("base") ||
    text.includes("hydrogen")
  ) {
    return "Nucleophiles and bases";
  }

  if (
    text.includes("leaving") ||
    text.includes("bromide")
  ) {
    return "Leaving groups";
  }

  if (
    text.includes("carbocation") ||
    text.includes("intermediate")
  ) {
    return "Reaction intermediates";
  }

  if (
    text.includes("arrow") ||
    text.includes("electron")
  ) {
    return "Curved arrows";
  }

  if (
    text.includes("bond") ||
    text.includes("breaking") ||
    text.includes("forming")
  ) {
    return "Bond changes";
  }

  if (
    text.includes("product") ||
    text.includes("alkene") ||
    text.includes("alcohol")
  ) {
    return "Products";
  }

  return "Mechanism fundamentals";
}

export function createReviewSession<
  TTarget extends string,
>(
  answers: ReviewAnswer<TTarget>[],
): ReviewSession<TTarget> {
  const topicMap = new Map<
    ReviewTopic,
    {
      correctAnswers: number;
      totalQuestions: number;
    }
  >();

  answers.forEach((answer) => {
    const current = topicMap.get(answer.topic) ?? {
      correctAnswers: 0,
      totalQuestions: 0,
    };

    topicMap.set(answer.topic, {
      correctAnswers:
        current.correctAnswers +
        (answer.correct ? 1 : 0),
      totalQuestions: current.totalQuestions + 1,
    });
  });

  const topicResults: ReviewTopicResult[] = Array.from(
    topicMap.entries(),
  )
    .map(([topic, result]) => ({
      topic,
      correctAnswers: result.correctAnswers,
      totalQuestions: result.totalQuestions,
      accuracy: Math.round(
        (result.correctAnswers /
          result.totalQuestions) *
          100,
      ),
    }))
    .sort((a, b) => b.accuracy - a.accuracy);

  const strongestAccuracy =
    topicResults.at(0)?.accuracy ?? 0;

  const weakestAccuracy =
    topicResults.at(-1)?.accuracy ?? 0;

  return {
    answers,
    topicResults,
    strongestTopics: topicResults.filter(
      (result) =>
        result.accuracy === strongestAccuracy,
    ),
    weakestTopics: topicResults.filter(
      (result) =>
        result.accuracy === weakestAccuracy,
    ),
  };
}

export default function ReviewEngine<
  TTarget extends string,
>({
  review,
  onRetryExam,
}: ReviewEngineProps<TTarget>) {
  const correctAnswers = review.answers.filter(
    (answer) => answer.correct,
  ).length;

  const accuracy =
    review.answers.length === 0
      ? 0
      : Math.round(
          (correctAnswers / review.answers.length) * 100,
        );

  return (
    <section
      className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
      aria-labelledby="exam-review-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700">
            Review Engine
          </p>

          <h3
            id="exam-review-title"
            className="mt-1 text-2xl font-bold text-slate-950"
          >
            Exam review
          </h3>

          <p className="mt-2 text-slate-600">
            Review every answer and identify the topics
            that need more practice.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-right">
          <p className="text-2xl font-bold text-slate-950">
            {accuracy}%
          </p>

          <p className="text-sm text-slate-500">
            {correctAnswers}/{review.answers.length} correct
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <TopicSummary
          title="Strongest topics"
          results={review.strongestTopics}
        />

        <TopicSummary
          title="Topics to review"
          results={review.weakestTopics}
        />
      </div>

      <div className="mt-7 space-y-4">
        {review.answers.map((answer, index) => (
          <AnswerReview
            key={answer.question.id}
            answer={answer}
            index={index}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
        <p className="text-sm text-slate-600">
          Retry the exam to improve your score and
          strengthen weak topics.
        </p>

        <button
          type="button"
          onClick={onRetryExam}
          className="rounded-xl bg-slate-950 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-800"
        >
          Retry full exam
        </button>
      </div>
    </section>
  );
}