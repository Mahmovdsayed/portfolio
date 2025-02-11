import { model, models, Schema } from "mongoose";

const SkillsSchema = new Schema(
  {
    socialName: { type: String, trim: true, required: true },
    socialUrl: { type: String, trim: true, required: true },
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Skills = models.Skills || model("Skills", SkillsSchema);
export default Skills;
