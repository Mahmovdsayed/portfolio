import { NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import DOMPurify from "isomorphic-dompurify";
import { connectToDatabase } from "@/lib/dbConnection";
import sendEmailService from "@/lib/email";
import { generateOTP, sendOTPEmail } from "@/lib/sendOTPEmail";
import { userValidationSchema } from "@/Validation/userValidation";

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
    const nationality = formData.get("nationality");
    const country = formData.get("country");
    const city = formData.get("city");
    const positionName = formData.get("positionName");
    const bio = formData.get("bio");
    const about = formData.get("about");

    const userData = {
      firstName,
      secondName,
      userName,
      email,
      password,
      image,
      nationality,
      country,
      city,
      acceptTerms: formData.get("acceptTerms") === "true",
      positionName,
      bio,
      about,
    };

    // Validate user data using Zod
    const result = userValidationSchema.safeParse(userData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const sanitizedFirstName = DOMPurify.sanitize(firstName?.toString() || "");
    const sanitizedSecondName = DOMPurify.sanitize(
      secondName?.toString() || ""
    );
    const sanitizedUserName = DOMPurify.sanitize(userName?.toString() || "");
    const sanitizedEmail = DOMPurify.sanitize(email?.toString() || "");
    const sanitizedPassword = DOMPurify.sanitize(password?.toString() || "");
    const sanitizedNationality = DOMPurify.sanitize(
      nationality?.toString() || ""
    );
    const sanitizedCountry = DOMPurify.sanitize(country?.toString() || "");
    const sanitizedCity = DOMPurify.sanitize(city?.toString() || "");
    const sanitizedpositionName = DOMPurify.sanitize(
      positionName?.toString() || ""
    );

    // Check if username already exists
    const isUserNameExist = await User.findOne({ userName });
    if (isUserNameExist) {
      return NextResponse.json(
        { success: false, message: "Username already exists" },
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
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
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
          width: 500,
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
      isVerified: false,
      otp: generateOTP(),
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      nationality: sanitizedNationality,
      country: sanitizedCountry,
      city: sanitizedCity,
      positionName: sanitizedpositionName,
      bio,
      about,
    });
    await newUser.save();

    // Send OTP email
    await sendOTPEmail(newUser.email, newUser.otp);

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
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
