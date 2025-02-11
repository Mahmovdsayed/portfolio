import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { v2 as cloudinary } from "cloudinary";
import { connectToDatabase } from "@/lib/dbConnection";
import dotenv from "dotenv";
import { cookies } from "next/headers";
import { verifyToken } from "@/functions/verifyToken";

dotenv.config();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

export const PATCH = async (req: Request) => {
  try {
    await connectToDatabase();
    const token = (await cookies()).get("userToken")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, errorMassage: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, errorMassage: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.id;
    const formData = await req.formData();
    const image = formData.get("image") as File | null;

    if (!userId) {
      return NextResponse.json(
        { success: false, errorMassage: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, errorMassage: "User not found" },
        { status: 404 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { success: false, errorMassage: "No image provided" },
        { status: 400 }
      );
    }

    if (!allowedImageTypes.includes(image.type)) {
      return NextResponse.json(
        { success: false, errorMassage: "Invalid image format" },
        { status: 400 }
      );
    }

    if (user.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(user.image.public_id);
      } catch (error) {}
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const uploadResult = await cloudinary.uploader.upload(
      `data:${image.type};base64,${buffer.toString("base64")}`,
      {
        folder: `portfolio/userImages/${decoded.userName}`,
        width: 500,
        height: 500,
        crop: "fill",
        gravity: "faces",
        use_filename: true,
        unique_filename: false,
        quality: "80",
      }
    );

    if (!uploadResult || !uploadResult.secure_url || !uploadResult.public_id) {
      return NextResponse.json(
        { success: false, errorMassage: "Failed to upload new image" },
        { status: 500 }
      );
    }

    user.image = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Profile image updated successfully",
        imageUrl: uploadResult.secure_url,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
