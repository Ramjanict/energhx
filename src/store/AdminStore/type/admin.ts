export type User = {
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
  userType: "ADMIN" | "DEVELOPER" | "USER" | string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
};

export type AdminAccessWithUser = {
  id: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | string;
  canAccess: "DEVELOPER" | "SERVER" | string;
  userId: string;
  user: User;
} | null;
