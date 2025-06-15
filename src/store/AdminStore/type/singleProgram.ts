export type CourseData = {
  id: string;
  title: string;
  thumbnail: string;
  averageRating: number;
  isCompleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  programId: string;
  _count: {
    modules: number;
    reviews: number;
  };
};

export type SingleProgramData = {
  id: string;
  thumbnail: string;
  description: string;
  title: string;
  price: number;
  publishedFor: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  courses: CourseData[];
};

export const defaultCourseData: CourseData = {
  id: "",
  title: "",
  thumbnail: "",
  averageRating: 0,
  isCompleted: false,
  createdAt: "",
  updatedAt: "",
  programId: "",
  _count: {
    modules: 0,
    reviews: 0,
  },
};

export const defaultSingleProgramData: SingleProgramData = {
  id: "",
  thumbnail: "",
  description: "",
  title: "",
  price: 0,
  publishedFor: "",
  createdAt: "",
  updatedAt: "",
  courses: [],
};
