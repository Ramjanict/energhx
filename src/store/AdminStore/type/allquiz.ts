export type SingleQuiz = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  createdAt: string;
  updatedAt: string;
  quizInstanceId: string;
};

export type AllQuiz = {
  id: string;
  totalMark: number;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  contentId: string;
  quizzes: SingleQuiz[];
};
export const defaultAllQuiz: AllQuiz = {
  id: "",
  totalMark: 0,
  createdAt: "",
  updatedAt: "",
  courseId: "",
  contentId: "",
  quizzes: [],
};
