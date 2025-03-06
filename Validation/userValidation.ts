import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const userValidationSchema = z.object({
  userName: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),

  firstName: z
    .string()
    .trim()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(20, { message: "First name must be at most 20 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "First name can only contain letters",
    })
    .transform((name) => name.charAt(0).toUpperCase() + name.slice(1)),

  secondName: z
    .string()
    .trim()
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(20, { message: "Last name must be at most 20 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "Last name can only contain letters",
    })
    .transform((name) => name.charAt(0).toUpperCase() + name.slice(1)),

  email: z
    .string()
    .trim()
    .email({ message: "Invalid email format" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Invalid email format",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(30, { message: "Password must be at most 30 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image size should be less than 5MB",
    })
    .optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  nationality: z
    .string()
    .trim()
    .min(2, { message: "Nationality must be at least 2 characters" })
    .max(50, { message: "Nationality must be at most 50 characters" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Nationality can only contain letters and spaces",
    })
    .optional(),

  country: z
    .string()
    .trim()
    .min(2, { message: "Country must be at least 2 characters" })
    .max(50, { message: "Country must be at most 50 characters" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Country can only contain letters and spaces",
    })
    .optional(),

  city: z
    .string()
    .trim()
    .min(2, { message: "City must be at least 2 characters" })
    .max(50, { message: "City must be at most 50 characters" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "City can only contain letters and spaces",
    })
    .optional(),
  bio: z
    .string()
    .trim()
    .max(200, { message: "Bio must be at most 200 characters" })
    .optional(),

  about: z
    .string()
    .trim()
    .max(500, { message: "About must be at most 500 characters" })
    .optional(),
  positionName: z
    .string()
    .trim()
    .min(3, { message: "Position name must be at least 3 characters" })
    .max(50, { message: "Position name cannot exceed 50 characters" })
    .optional(),
});
