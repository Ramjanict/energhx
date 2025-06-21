import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  otherName: z.string().optional(),
  sex: z.string().min(1, "Sex is required"),
  profilePhoto: z.string().optional(), // Storing as URL string
  companyName: z.string().optional(),
  streetNumber: z
    .number({ invalid_type_error: "Street number must be a number" })
    .min(1, "Street number is required"),
  street: z.string().optional(),
  postalCode: z
    .number({ invalid_type_error: "Postal code must be a number" })
    .min(1, "Postal code is required"),
  city: z.string().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
