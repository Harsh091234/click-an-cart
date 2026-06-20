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

  password: z
    .string()
    .min(1, "Password is required")
    .max(100),
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

  email: z.string().trim().email("Invalid email address").toLowerCase(),

  location: z
    .string()
    .trim()
    .min(2, "Location is required")
    .max(100, "Location cannot exceed 100 characters")
    .optional(),

  phone: z
    .string()
    .trim()
    .length(10, "phone no is required")
    
    .optional(),
});

