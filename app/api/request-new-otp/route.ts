import { connectToDatabase } from "@/lib/dbConnection";
import { generateOTP, sendOTPEmail } from "@/lib/sendOTPEmail";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const { email } = await req.json();

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

    const newOTP = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = newOTP;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTPEmail(email, newOTP);

    return NextResponse.json(
      { success: true, message: "New OTP sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in requesting new OTP:", error);
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
