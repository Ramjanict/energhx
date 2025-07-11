export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  otherName: string | null;
  sex: "MALE" | "FEMALE";
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
  userType: "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface AllAdmin {
  id: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  canAccess: "DEVELOPER" | "SERVER";
  userId: string;
  user: AdminUser;
}
