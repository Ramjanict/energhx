export type AnswerItem = {
  quizId: string;
  answer: number;
};

export type AnswerSubmission = {
  contentId: string;
  answerSheet: AnswerItem[];
};
