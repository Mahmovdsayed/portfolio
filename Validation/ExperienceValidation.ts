import { z } from "zod";

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
    .min(10, "Description must be at least 10 characters long")
    .max(500, { message: "Description must be at most 500 characters" })
    .optional(),

  from: z.string().trim(),
  to: z.string().trim().optional(),

  companyImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image size should be less than 5MB",
    })
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
