type ContentBase = {
  title: string;
  contentType: "DESCRIPTION" | "VIDEO" | "QUIZ";
  moduleId: string;
};

type DescriptionContent = ContentBase & {
  contentType: "DESCRIPTION";
  description: string;
};

type VideoContent = ContentBase & {
  contentType: "VIDEO";
  video: string; // URL string
};

type QuizContent = ContentBase & {
  contentType: "QUIZ";
};

export type Content = DescriptionContent | VideoContent | QuizContent;
