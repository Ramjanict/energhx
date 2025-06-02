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
});

export type SignUpType = z.infer<typeof signupSchema>;

const referenceSchema = z.object({
  name: z.string().min(1, "Reference name is required"),
});

const publicationSchema = z.object({
  publisher: z.string().min(1, "Publisher is required"),
  title: z.string().min(1, "Title is required"),
  authorList: z.string().min(1, "Author list is required"),
  pages: z.string().min(1, "Pages are required"),
  publicationYear: z.number().int("Publication year must be an integer"),
});

const experienceSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  title: z.string().min(1),
  startDate: z
    .string()
    .transform((val) => {
      const [day, month, year] = val.split("-").map(Number);
      const date = new Date(2000 + year, month - 1, day);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      return date.toISOString();
    })
    .pipe(
      z.string().refine((val) => val.endsWith("Z"), {
        message: "Must be in ISO 8601 UTC format",
      })
    ),
  endDate: z
    .string()
    .transform((val) => {
      const [day, month, year] = val.split("-").map(Number);
      const date = new Date(2000 + year, month - 1, day);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      return date.toISOString();
    })
    .pipe(
      z.string().refine((val) => val.endsWith("Z"), {
        message: "Must be in ISO 8601 UTC format",
      })
    ),
});
const dataSchema = z.object({
  reference: referenceSchema,
  publications: z.array(publicationSchema),
  experiences: z.array(experienceSchema),
  file: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please upload a valid image file",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Only .jpg, .jpeg, .png, pdf, and .webp formats are supported",
    })
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, {
      message: "Max file size is 4MB",
    })
    .optional()
    .or(z.literal(undefined)),
});

export default dataSchema;
export type UserExperience = z.infer<typeof dataSchema>;
