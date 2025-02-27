import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const ExperienceValidationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(3, { message: "Company name must be at least 3 characters" })
    .max(50, { message: "Company name must be at most 50 characters" }),

  positionName: z
    .string()
    .trim()
    .min(3, { message: "Position name must be at least 3 characters" })
    .max(50, { message: "Position name cannot exceed 50 characters" }),

  description: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || (value.length >= 10 && value.length <= 500), {
      message: "Description must be between 10 and 500 characters",
    }),

  from: z.string().trim(),
  to: z.string().trim().optional(),

  companyImage: z
    .union([
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      }),
      z.null(),
    ])
    .optional(),

  employmentType: z.enum(
    [
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Freelance",
      "Remote",
      "Temporary",
      "Casual",
      "Volunteer",
      "Self-Employed",
      "Apprenticeship",
      "Other",
    ],
    {
      required_error: "Employment type is required",
    }
  ),
  current: z.boolean().optional(),
});

export { ExperienceValidationSchema };
