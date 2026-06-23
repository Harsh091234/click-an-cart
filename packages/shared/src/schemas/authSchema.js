import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),

  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100),
});

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z.string().min(1, "Password is required").max(100),
});

export const VerifyEmailSchema = z.object({
  code: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
});

export const ResendVerificationOtpSchema = z.object({
  email: z.email("Invalid email address"),
});

export const ForgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email"),
});

export const ResetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100),
});

export const EditProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),

  email: z.email("Invalid email address"),

  location: z.string().trim().max(100).optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be 10 digits")
    .optional()
    .or(z.literal("")),  
  languages: z.preprocess((val) => {
    if (!val) return [];
    if (typeof val === "string") return [val];
    return val;
  }, z.array(z.string()).min(1).max(5)),
});
