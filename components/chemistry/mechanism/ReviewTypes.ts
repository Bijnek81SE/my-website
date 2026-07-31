import type { PracticeQuestion } from "./PracticeTypes";
import type { MechanismQuestionTopic } from "./QuestionEngine";

export type ReviewAnswer<
  TTarget extends string = string,
> = {
  question: PracticeQuestion<TTarget>;
  selectedTarget: TTarget;
  correctTarget: TTarget;
  correct: boolean;
  topic: MechanismQuestionTopic;
};

export type ReviewTopicResult = {
  topic: MechanismQuestionTopic;
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