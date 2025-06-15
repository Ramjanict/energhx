// validationSchema.ts
import { z } from "zod";

export const passwordSchema = z.object({
  password: z.string().min(8, "Old password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 6 characters"),
});

export type PasswordFormData = z.infer<typeof passwordSchema>;
