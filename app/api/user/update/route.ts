import { z } from "zod";
import { verifyToken } from "@/functions/verifyToken";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const userValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(20, { message: "First name must be at most 20 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "First name can only contain letters",
    })
    .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .optional(),

  secondName: z
    .string()
    .trim()
    .min(3, { message: "Second name must be at least 3 characters" })
    .max(20, { message: "Second name must be at most 20 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "Second name can only contain letters",
    })
    .transform((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .optional(),

  email: z
    .string()
    .trim()
    .email({ message: "Invalid email format" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Invalid email format",
    })
    .optional(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(30, { message: "Password must be at most 30 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .optional(),
});

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
    const validationResult = userValidationSchema.safeParse(requestData);

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

    const { firstName, secondName, email, password } = validationResult.data;

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

    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return NextResponse.json(
          {
            status: false,
            errorMassage: "This email is already in use by another user",
          },
          { status: 400 }
        );
      }
    } else if (email === existingUser.email) {
      return NextResponse.json(
        { status: false, errorMassage: "This email is already yours" },
        { status: 200 }
      );
    }

    const updatedUser: Record<string, any> = {};
    if (firstName) updatedUser.firstName = firstName;
    if (secondName) updatedUser.secondName = secondName;
    if (email) updatedUser.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS || "")
      );
      updatedUser.password = hashedPassword;
    }

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
    return NextResponse.json(
      { status: false, errorMassage: "Something went wrong!" },
      { status: 500 }
    );
  }
};
