import { verifyToken } from "@/functions/verifyToken";
import { connectToDatabase } from "@/lib/dbConnection";
import Experience from "@/models/experience.model";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

    const work = await Experience.find({ userID });
    const total = await Experience.countDocuments({ userID });
    return NextResponse.json(
      {
        success: true,
        total,
        work,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};
