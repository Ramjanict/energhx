export type QuizOption = string;

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: number;
  createdAt: string;
  updatedAt: string;
  quizInstanceId: string;
};

export type QuizInstance = {
  id: string;
  totalMark: number;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  contentId: string;
  quizzes: QuizQuestion[];
};

export type Program = {
  publishedFor: "SERVER" | "DEVELOPER" | string;
};

export type Course = {
  program: Program;
};

export type Module = {
  course: Course;
};

// Discriminated Union by `contentType`
export type VideoContent = {
  id: string;
  title: string;
  contentType: "VIDEO";
  video: string;
  description: null;
  createdAt: string;
  updatedAt: string;
  moduleId: string;
  module: Module;
  quiz: null;
};

export type DescriptionContent = {
  id: string;
  title: string;
  contentType: "DESCRIPTION";
  video: null;
  description: string;
  createdAt: string;
  updatedAt: string;
  moduleId: string;
  module: Module;
  quiz: null;
};

export type QuizContent = {
  id: string;
  title: string;
  contentType: "QUIZ";
  video: null;
  description: null;
  createdAt: string;
  updatedAt: string;
  moduleId: string;
  module: Module;
  quiz: QuizInstance;
};

// Unified Content Type
export type SingleContent =
  | VideoContent
  | DescriptionContent
  | QuizContent
  | null;
