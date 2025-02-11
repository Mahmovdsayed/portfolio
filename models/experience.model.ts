import { model, models, Schema } from "mongoose";
import ImageSchema from "./image.model";

const ExperienceSchema = new Schema(
  {
    companyName: { type: String, trim: true, required: true },
    positionName: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    from: { type: Date, required: true },
    to: { type: Date },
    companyImage: ImageSchema,
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Experience = models.Education || model("Experience", ExperienceSchema);
export default Experience;
