export type PracticeHint = {
  afterAttempt: number;
  message: string;
};

export type HintState = {
  attemptsForQuestion: number;
  activeHint?: PracticeHint;
  shouldHighlightTarget: boolean;
  shouldRevealAnswer: boolean;
};