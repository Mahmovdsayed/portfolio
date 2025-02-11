import { verifyToken } from "@/functions/verifyToken";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (req: Request) => {
  try {
    await connectToDatabase();

    const token = (await cookies()).get("userToken")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    const { password } = await req.json();
    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required!" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Incorrect password!" },
        { status: 401 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "Failed to delete user!" },
        { status: 500 }
      );
    }

    const userFolderPath = `portfolio/userImages/${decoded.userName}`;

    let nextCursor = null;
    do {
      const response = await cloudinary.api.resources({
        type: "upload",
        prefix: userFolderPath,
        max_results: 100,
        next_cursor: nextCursor,
      });

      if (response.resources.length > 0) {
        const publicIds = response.resources.map((file: any) => file.public_id);
        await cloudinary.api.delete_resources(publicIds);
      }

      nextCursor = response.next_cursor;
    } while (nextCursor);

    await cloudinary.api.delete_folder(userFolderPath);

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
