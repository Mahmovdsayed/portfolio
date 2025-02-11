import { model, models, Schema } from "mongoose";
import ImageSchema from "./image.model";

const BlogSchema = new Schema(
  {
    blogTitle: { type: String, trim: true, required: true },
    blogDescription: { type: String, trim: true },
    blogImage: ImageSchema,
    blogCategory: { type: String, trim: true },
    blogTags: { type: [String], default: [] },
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
