import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const { email, otp } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { success: false, message: "User is already verified." },
        { status: 400 }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP." },
        { status: 400 }
      );
    }

    if (user.otpExpiry < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired. Please request a new OTP.",
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Email verified successfully." },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in OTP verification:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
