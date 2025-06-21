export type QuizData = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export type Quiz = {
  contentId: string;
  quizzesData: QuizData[];
};
