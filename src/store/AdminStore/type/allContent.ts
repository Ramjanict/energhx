//

export type ContentItem = {
  id: string;
  title: string;
  contentType: "DESCRIPTION" | "VIDEO" | "QUIZ";
  video: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
  moduleId: string;
};

export type AllContent = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  contents: ContentItem[];
};
