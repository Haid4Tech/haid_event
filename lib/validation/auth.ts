import { z } from "zod";

const email = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.");

const password = z.string().min(6, "Password must be at least 6 characters.");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required."),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(1, "This field is required."),
  email,
  password,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
