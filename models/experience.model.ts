import { model, models, Schema } from "mongoose";
import ImageSchema from "./image.model";

const ExperienceSchema = new Schema(
  {
    companyName: { type: String, trim: true, required: true },
    positionName: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    from: { type: String, required: true },
    to: { type: String },
    companyImage: ImageSchema,
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    current: { type: Boolean, default: false },
    employmentType: {
      type: String,
      trim: true,
      required: true,
      enum: [
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
    },
  },
  { timestamps: true }
);

const Experience = models.Experience || model("Experience", ExperienceSchema);
export default Experience;
