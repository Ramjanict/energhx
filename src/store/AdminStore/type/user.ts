export type User = {
  id: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | string;
  userId: string;
  user: {
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
  };
};
