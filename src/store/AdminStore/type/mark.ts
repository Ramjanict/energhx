export type QuizSubmission = {
  id: string;
  correctAnswers: number;
  incorrectAnswers: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  quizInstanceId: string;
  userId: string;
};

export type QuizSubmissionResponse = {
  data: {
    quizSubmission: QuizSubmission;
    score: number;
    total: number;
  };
} | null;
