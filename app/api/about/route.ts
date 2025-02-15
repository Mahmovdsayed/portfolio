import { verifyToken } from "@/functions/verifyToken";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDatabase();
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;

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

    const user = await User.findById(decoded.id).select("-password");
    return NextResponse.json(
      {
        success: true,
        message: "User fetched successfully",
        user: {
          ...user.toObject(),
          about: user.about || "No about section provided yet",
          bio: user.bio || "No bio available yet",
        },
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
