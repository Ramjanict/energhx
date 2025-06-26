//

export type ContentItem = {
  id: string;
  title: string;
  contentType: "DESCRIPTION" | "VIDEO" | "QUIZ";
  video: string | null;
  videoPublicId: string | null;
  description: string | null;
  videoDuration: number | null;
  createdAt: string;
  updatedAt: string;
  moduleId: string;
  courseId: string;
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
