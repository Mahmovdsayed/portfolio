import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/functions/verifyToken";

export const GET = async (req: Request) => {
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

    const userId = new URL(req.url).searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { error: "Bad Request: User ID is required" },
        { status: 400 }
      );
    }

    if (userId !== decoded.id) {
      return NextResponse.json(
        { error: "Unauthorized: You are not allowed to access this user data" },
        { status: 403 }
      );
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json(
        { error: "Not Found: User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};
