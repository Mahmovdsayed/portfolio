import { verifyToken } from "@/functions/verifyToken";
import { connectToDatabase } from "@/lib/dbConnection";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Experience from "@/models/experience.model";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const token = (await cookies()).get("userToken")?.value;
    const decoded = await verifyToken(token);

    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }
    if (!decoded.id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const companyName = formData.get("companyName") as string;
    const positionName = formData.get("positionName") as string;
    const description = formData.get("description") as string;
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const employmentType = formData.get("employmentType") as string;
    const companyImage = formData.get("companyImage") as File | null;
    const current = formData.get("current") as string;
    const userID = formData.get("userID") as string;

    if (decoded.id !== userID) {
      return NextResponse.json(
        { error: "Unauthorized: You are not allowed to access this user data" },
        { status: 403 }
      );
    }

    let imageUrl =
      "https://res.cloudinary.com/dtpsyi5am/image/upload/v1739724057/gqcbculzlv44qoytlr3c.jpg";
    let publicId = "";

    const uploadToCloudinary = async (
      buffer: Buffer,
      userName: any,
      imageType: string
    ) => {
      const workFolderPath = `portfolio/userImages/${userName}/work`;

      const uploadResult = await cloudinary.uploader.upload(
        `data:${imageType};base64,${buffer.toString("base64")}`,
        {
          folder: workFolderPath,
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

    if (companyImage) {
      if (!allowedImageTypes.includes(companyImage.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid image format. Allowed formats: PNG, JPEG, JPG",
          },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await companyImage.arrayBuffer());
      const uploadResult = await uploadToCloudinary(
        buffer,
        decoded.userName,
        companyImage.type
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

    const work = new Experience({
      companyName,
      positionName,
      description,
      from,
      to,
      employmentType,
      companyImage: { url: imageUrl, public_id: publicId || null },
      userID,
      current,
    });
    await work.save();

    return NextResponse.json(
      { success: true, message: "Work added successfully", work },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", err: error },
      { status: 500 }
    );
  }
};
