import { verifyToken } from "@/functions/verifyToken";
import { connectToDatabase } from "@/lib/dbConnection";
import Experience from "@/models/experience.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (req: Request) => {
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

    const userID = decoded.id;
    if (!userID) {
      return NextResponse.json(
        { error: "Bad Request: User ID is required" },
        { status: 400 }
      );
    }

    if (userID !== decoded.id) {
      return NextResponse.json(
        { error: "Unauthorized: You are not allowed to access this user data" },
        { status: 403 }
      );
    }

    const { workID } = await req.json();
    const work = await Experience.findById(workID);

    if (!work) {
      return NextResponse.json(
        { error: "Work Experience not found" },
        { status: 404 }
      );
    }

    if (work.companyImage && work.companyImage.public_id) {
      await cloudinary.uploader.destroy(work.companyImage.public_id);
    }

    await Experience.findByIdAndDelete(workID);

    return NextResponse.json(
      { success: true, message: "Work experience deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
