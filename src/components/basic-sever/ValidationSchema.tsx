import { z } from "zod";

export const sungUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  sex: z.enum(["male", "female"]),
  mail: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  number: z.string().min(2, "Number must be at least 2 characters"),
  street: z.string().min(3, "Street must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  postalCode: z
    .string()
    .min(3, "Postal code must be at least 3 characters")
    .transform((val) => parseInt(val, 10)),
  province: z.string().min(2, "Province must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  interest: z.string().optional(),
});

export type FormData = z.infer<typeof sungUpSchema>;

export const workExperienceSchema = z.object({
  workEngagement: z
    .string()
    .min(2, "Work engagement must be at least 2 characters"),
  workEngagementTwo: z
    .string()
    .min(2, "Work engagement must be at least 2 characters"),
  countryOfResidence: z
    .string()
    .min(2, "Country of residence must be at least 2 characters"),
  uploadDocOne: z.instanceof(File).optional(),
  uploadDocTwo: z.instanceof(File).optional(),
  passportPhotograph: z.instanceof(File).optional(),
});

export type workExperienceType = z.infer<typeof workExperienceSchema>;

export const workExperienceTwoSchema = z.object({
  workEngagementThree: z
    .string()
    .min(2, "Work engagement must be at least 2 characters"),
  addressOfWorkEngagement: z
    .string()
    .min(2, "Address of work engagement must be at least 2 characters"),
  jobStatus: z.string().min(2, "Job status must be at least 2 characters"),
  startPeriod: z.string().min(2, "Start period must be at least 2 characters"),
  stopPeriod: z.string().min(2, "Stop period must be at least 2 characters"),
  publisher: z.string().min(2, "Publisher must be at least 2 characters"),
  titleOfPublication: z
    .string()
    .min(2, "Title of publication must be at least 2 characters"),
  listOfAuthors: z
    .string()
    .min(2, "List of authors must be at least 2 characters"),
  pages: z.string().min(2, "Pages must be at least 2 characters"),
  yearOfPublication: z.coerce
    .number()
    .min(2, "Year of publication must be at least 2 characters"),
  nameOfPersonOrCompany: z
    .string()
    .min(2, "Number of person or company must be at least 2 characters"),
  reference: z
    .string()
    .min(2, "Referrence must be at least 2 characters")
    .optional(),
  recommendationLetter: z.instanceof(File).optional(),
});

export type workExperienceTwoType = z.infer<typeof workExperienceTwoSchema>;

export const verifySubmitSchema = z.object({
  verifyFirstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),
  verifyLastName: z.string().min(2, "Last name must be at least 2 characters"),
  homeTel: z.string().min(10, "Home telephone must be at least 10 characters"),
  altTel: z
    .string()
    .min(10, "Alternative telephone must be at least 10 characters"),
  verifyMail: z.string().email("Invalid email address"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .optional(),
});

export type verifySubmitType = z.infer<typeof verifySubmitSchema>;

export const upgradeFacilitesSchema = z.object({
  service: z.string().min(2, "Service must be at least 2 characters"),
  utilityName: z.string().min(2, "Utility name must be at least 2 characters"),
  accountNo: z.coerce
    .number()
    .min(2, "Account number must be at least 2 characters"),
  upgradeFacilitiesHomeTel: z
    .string()
    .min(10, "Home telephone must be at least 10 characters"),
  upgradeFacilitiesAltTel: z
    .string()
    .min(10, "Alternative telephone must be at least 10 characters"),
  streetAddress: z
    .string()
    .min(3, "Street address must be at least 3 characters"),
  suite: z.string().min(2, "Suite must be at least 2 characters"),
  upgradeFacilitiesCity: z
    .string()
    .min(3, "City must be at least 3 characters"),
  upgradeFacilitiesPostalCode: z
    .string()
    .min(3, "Postal code must be at least 3 characters"),
});

export type upgradeFacilitiesType = z.infer<typeof upgradeFacilitesSchema>;

export const upgradeFacilitesSchemaTwo = z.object({
  upgradeFacilitiesFirstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),
  upgradeFacilitiesLastName: z
    .string()
    .min(2, "Last name must be at least 2 characters"),
  upgradeFacilitiesHomeTelTwo: z
    .string()
    .min(10, "Home telephone must be at least 10 characters"),
  upgradeFacilitiesAltTelTwo: z
    .string()
    .min(10, "Home telephone must be at least 10 characters"),
  upgradeFacilitiesMailTwo: z.string().email("Invalid email address"),
  upgradeFacilitiesCompanyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .optional(),
});

export type upgradeFacilitiesTwoType = z.infer<
  typeof upgradeFacilitesSchemaTwo
>;
