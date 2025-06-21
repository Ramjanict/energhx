export type Module = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
};
export type BasicContent = {
  id: string;
  title: string;
  video: File;
  createdAt: string;
  updatedAt: string;
  courseId: string;
};

export type ModuleCardType = Module | BasicContent;
export type AllModule = {
  id: string;
  title: string;
  thumbnail: string;
  averageRating: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  programId: string;
  modules?: Module[];
  basicContents?: BasicContent[];
};
