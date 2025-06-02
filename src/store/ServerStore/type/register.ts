export type Sex = "MALE" | "FEMALE";
export type UserType = "SERVER" | "DEVELOPER";

export interface Register {
  email: string;
  firstName: string;
  lastName: string;
  otherName: string;
  sex: Sex;
  companyName: string;
  streetNumber: number;
  street: string;
  postalCode: number;
  province: string;
  countryId: string; // UUID
  stateId: string; // UUID
  userType: UserType;
}

export interface RegisterType {
  text: Register;
  file?: File | undefined;
}
