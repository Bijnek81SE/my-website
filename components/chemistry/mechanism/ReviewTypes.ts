import type { PracticeQuestion } from "./PracticeTypes";

export type ReviewTopic =
  | "Nucleophiles and bases"
  | "Leaving groups"
  | "Reaction intermediates"
  | "Curved arrows"
  | "Bond changes"
  | "Products"
  | "Mechanism fundamentals";

export type ReviewAnswer<
  TTarget extends string = string,
> = {
  question: PracticeQuestion<TTarget>;
  selectedTarget: TTarget;
  correctTarget: TTarget;
  correct: boolean;
  topic: ReviewTopic;
};

export type ReviewTopicResult = {
  topic: ReviewTopic;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
};

export type ReviewSession<
  TTarget extends string = string,
> = {
  answers: ReviewAnswer<TTarget>[];
  topicResults: ReviewTopicResult[];
  strongestTopics: ReviewTopicResult[];
  weakestTopics: ReviewTopicResult[];
};