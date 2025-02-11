import { model, models, Schema } from "mongoose";

const SocialSchema = new Schema(
  {
    socialName: { type: String, trim: true, required: true },
    socialUrl: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const Social = models.Project || model("Project", SocialSchema);
export default Social;
