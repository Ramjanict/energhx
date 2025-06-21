export type BasicContent = {
  id: string;
  title: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  course: {
    title: string;
    program: {
      title: string;
      publishedFor: "SERVER" | "DEVELOPER" | string;
    };
  };
};
