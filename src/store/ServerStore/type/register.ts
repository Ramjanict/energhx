export type Sex = "MALE" | "FEMALE";
export type UserType = "SERVER" | "DEVELOPER";

export interface Register {
  email: string;
  firstName: string;
  lastName: string;
  otherName: string;
  sex: Sex;
  phoneNumber: string;
  companyName: string;

  streetNumber: number;
  street: string;
  postalCode: number;
  province: string;
  countryId: string; // UUID
  stateId: string; // UUID
  userType: UserType;
}
