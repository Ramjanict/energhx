export type Course = {
  id: string;
  title: string;
  thumbnail: string;
  averageRating: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  programId: string;
};

export type MyReview = {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  courseId: string;
  course: Course;
};

export type AllReview = {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  courseId: string;
};

export interface SingleUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  otherName: string | null;
  sex: "MALE" | "FEMALE" | string;
  password: string;
  profile_photo: string;
  companyName: string;
  streetNumber: number;
  street: string;
  postalCode: number;
  city: string;
  countryId: string;
  stateId: string;
  isVerified: boolean;
  userType: "DEVELOPER" | "ADMIN" | "SERVER" | string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
}

export interface SingleReview {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  courseId: string;
  user: SingleUser;
}
