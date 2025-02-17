import { NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import DOMPurify from "isomorphic-dompurify";
import { connectToDatabase } from "@/lib/dbConnection";
import sendEmailService from "@/lib/email";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Allowed image types
const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    const firstName = formData.get("firstName");
    const secondName = formData.get("secondName");
    const userName = formData.get("userName");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image") as File | null;

    const sanitizedFirstName = firstName
      ? DOMPurify.sanitize(firstName.toString())
      : "";
    const sanitizedSecondName = secondName
      ? DOMPurify.sanitize(secondName.toString())
      : "";
    const sanitizedUserName = userName
      ? DOMPurify.sanitize(userName.toString())
      : "";
    const sanitizedEmail = email ? DOMPurify.sanitize(email.toString()) : "";
    const sanitizedPassword = password
      ? DOMPurify.sanitize(password.toString())
      : "";

    if (
      !sanitizedUserName ||
      !sanitizedEmail ||
      !sanitizedPassword ||
      !sanitizedFirstName ||
      !sanitizedSecondName
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if username already exists
    const isUserNameExist = await User.findOne({ userName });
    if (isUserNameExist) {
      return NextResponse.json(
        { success: false, message: "username already exists" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password securely
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "");
    const hashPassword = await bcrypt.hash(sanitizedPassword, saltRounds);

    let imageUrl =
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713493679/sqlpxs561zd9oretxkki.jpg"; // Default image URL
    let publicId = "";

    const uploadToCloudinary = async (
      buffer: Buffer,
      userName: any,
      imageType: string
    ) => {
      const userFolderPath = `portfolio/userImages/${userName}`;

      const uploadResult = await cloudinary.uploader.upload(
        `data:${imageType};base64,${buffer.toString("base64")}`,
        {
          folder: userFolderPath,
          wihdth: 500,
          height: 500,
          crop: "fill",
          gravity: "faces",
          use_filename: true,
          unique_filename: false,
          quality: "80",
        }
      );

      return uploadResult;
    };

    if (image) {
      if (!allowedImageTypes.includes(image.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid image format. Allowed formats: PNG, JPEG, JPG",
          },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadToCloudinary(
        buffer,
        userName,
        image.type
      );

      if (uploadResult && uploadResult.secure_url && uploadResult.public_id) {
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      } else {
        return NextResponse.json(
          { success: false, message: "Failed to upload image to Cloudinary." },
          { status: 500 }
        );
      }
    }

    const newUser = new User({
      firstName,
      secondName,
      userName,
      email,
      password: hashPassword,
      image: { url: imageUrl, public_id: publicId },
    });
    await newUser.save();

    // Send welcome email
    await sendEmailService({
      to: email?.toString(),
      subject: "Welcome to Portfolio Website",
      message: `
    <h1>Welcome, ${userName}!</h1>
    <p>We're excited to have you on board. Enjoy exploring our platform!</p>
  `,
    });

    return NextResponse.json(
      { success: true, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in user registration:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
