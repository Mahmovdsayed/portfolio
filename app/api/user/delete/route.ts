import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (req: Request) => {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required!" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 404 }
      );
    }

    const userFolderPath = `portfolio/userImages/${user.userName}`;

    const { resources } = await cloudinary.api.resources({
      type: "upload",
      prefix: userFolderPath,
    });

    if (resources.length > 0) {
      const publicIds = resources.map((file: any) => file.public_id);
      await cloudinary.api.delete_resources(publicIds);
    }

    await cloudinary.api.delete_folder(userFolderPath);

    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
