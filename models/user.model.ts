import { Schema, model, models } from "mongoose";
import ImageSchema from "./image.model";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be at most 20 characters"],
      index: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [20, "First name must be at most 20 characters"],
      trim: true,
      lowercase: true,
    },
    secondName: {
      type: String,
      required: [true, "Second name is required"],
      minlength: [3, "Second name must be at least 3 characters"],
      maxlength: [20, "Second name must be at most 20 characters"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    image: ImageSchema,
    about: {
      type: String,
      trim: true,
      default: "No about provided yet",
    },
    bio: { type: String, trim: true, default: "No bio available yet" },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
