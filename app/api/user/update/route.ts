import { z } from "zod";
import { verifyToken } from "@/functions/verifyToken";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { updateUserSchema } from "@/Validation/updateUser";

export const PATCH = async (req: Request) => {
  try {
    await connectToDatabase();

    const token = (await cookies()).get("userToken")?.value;
    if (!token) {
      return NextResponse.json(
        { status: false, errorMassage: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { status: false, errorMassage: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const requestData = await req.json();
    const validationResult = updateUserSchema.safeParse(requestData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          status: false,
          errorMassage: "Validation failed",
          details: validationResult.error.errors.map((error) => ({
            message: error.message,
          })),
        },
        { status: 400 }
      );
    }

    const userId = decoded.id;
    if (!userId) {
      return NextResponse.json(
        {
          status: false,
          errorMassage: "User ID is required",
        },
        { status: 400 }
      );
    }

    const { firstName, secondName, password, about, bio } =
      validationResult.data;

    if (decoded.id !== userId) {
      return NextResponse.json(
        {
          status: false,
          errorMassage: "Unauthorized: You cannot edit this user",
        },
        { status: 403 }
      );
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser: Record<string, any> = {};
    if (firstName) updatedUser.firstName = firstName;
    if (secondName) updatedUser.secondName = secondName;
    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS || "")
      );
      updatedUser.password = hashedPassword;
    }
    if (about) updatedUser.about = about;
    if (bio) updatedUser.bio = bio;

    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
      select: "-password",
    });

    if (!user) {
      return NextResponse.json(
        { status: false, errorMassage: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "User updated successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: false, errorMassage: "Something went wrong!" },
      { status: 500 }
    );
  }
};
