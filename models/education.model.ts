import { models, Schema } from "mongoose";
import ImageSchema from "./image.model";
import { model } from "mongoose";

const EducationSchema = new Schema(
  {
    schoolName: { type: String, trim: true, required: true },
    degree: { type: String, trim: true, required: true },
    fieldOfStudy: { type: String, trim: true, required: true },
    from: { type: Date, required: true },
    to: { type: Date },
    description: { type: String, trim: true },
    schoolImage: ImageSchema,
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Education = models.Education || model("Education", EducationSchema);
export default Education;
