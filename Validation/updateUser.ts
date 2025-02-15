import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(20, { message: "First name must be at most 20 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "First name can only contain letters",
    })
    .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .optional(),

  secondName: z
    .string()
    .trim()
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(20, { message: "Last name must be at most 20 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "Last name can only contain letters",
    })
    .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .optional(),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email format" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Invalid email format",
    })
    .optional(),
  password: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (val && val.length > 0) {
        if (val.length < 6) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 6,
            type: "string",
            inclusive: true,
            message: "Password must be at least 6 characters",
          });
        }
        if (val.length > 30) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 30,
            type: "string",
            inclusive: true,
            message: "Password must be at most 30 characters",
          });
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, and one number",
          });
        }
      }
    }),
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
});
