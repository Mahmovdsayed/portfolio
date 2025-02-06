import { Schema, model, models } from "mongoose";

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
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    image: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713493679/sqlpxs561zd9oretxkki.jpg", // default image
      },
      public_id: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
