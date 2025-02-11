import { model, models, Schema } from "mongoose";
import ImageSchema from "./image.model";

const ProjectSchema = new Schema(
  {
    projectName: { type: String, trim: true, required: true },
    projectUrl: { type: String, trim: true },
    projectImage: ImageSchema,
    projectDescription: { type: String, trim: true },
    projectTechStack: { type: [String], default: [] },
    projectDate: { type: Date },
    projectRole: { type: String, trim: true },
    projectClient: { type: String, trim: true },
    projectStatus: { type: String, trim: true },
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
