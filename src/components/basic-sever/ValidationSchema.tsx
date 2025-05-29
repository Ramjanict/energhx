import { z } from "zod";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  otherName: z.string().optional(),
  sex: z.enum(["MALE", "FEMALE"]),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please upload a valid image file",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported",
    })
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, {
      message: "Max file size is 4MB",
    })
    .optional()
    .or(z.literal(undefined)),
  streetNumber: z
    .number({ invalid_type_error: "Street number must be a number" })
    .int()
    .positive("Street number must be a positive integer"),
  street: z.string().min(1, "Street name is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z
    .number({ invalid_type_error: "Postal code must be a number" })
    .int()
    .nonnegative("Postal code must be a non-negative integer"),
  countryId: z.string().uuid("Please select a valid country"),
  stateId: z.string().uuid("Please select a valid state"),
  // userType: z.enum(["SERVER", "DEVELOPER"]),
});

export type SignUpType = z.infer<typeof signupSchema>;

export const workExperience = z.object({
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

export type WorkExperienceType = z.infer<typeof workExperience>;
