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
        { success: false, error: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const userID = decoded.id;

    if (decoded.id !== userID) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: You are not allowed to access this user data",
        },
        { status: 403 }
      );
    }

    const experienceCount = await Experience.countDocuments({ userID });

    if (experienceCount >= 10) {
      return NextResponse.json(
        {
          success: false,
          error: "You have reached the maximum limit of 10 experiences.",
        },
        { status: 400 }
      );
    }

    const companyName = formData.get("companyName") as string;
    const positionName = formData.get("positionName") as string;
    const description = formData.get("description") as string;
    const from = formData.get("from") as string;
    let to = formData.get("to") as string | null;
    const employmentType = formData.get("employmentType") as string;
    const companyImage = formData.get("companyImage") as File | null;
    let current = formData.get("current") === "true";

    if (!to && !current) {
      current = true;
    }

    let imageUrl =
      "https://res.cloudinary.com/dtpsyi5am/image/upload/v1739724057/gqcbculzlv44qoytlr3c.jpg";
    let publicId = "";

    if (companyImage && companyImage.size > 0) {
      if (!allowedImageTypes.includes(companyImage.type)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid image format. Allowed formats: PNG, JPEG, JPG",
          },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await companyImage.arrayBuffer());
      const uploadResult = await cloudinary.uploader.upload(
        `data:${companyImage.type};base64,${buffer.toString("base64")}`,
        {
          folder: `portfolio/userImages/${decoded.userName}/work`,
          width: 500,
          height: 500,
          crop: "fill",
          gravity: "faces",
          use_filename: true,
          unique_filename: false,
          quality: "80",
        }
      );

      if (uploadResult?.secure_url && uploadResult?.public_id) {
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      } else {
        return NextResponse.json(
          { success: false, error: "Failed to upload image to Cloudinary." },
          { status: 500 }
        );
      }
    }

    if (!to && current) {
      to = null;
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
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
