"use server";

import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const LogInFunction = async (email: string, password: string) => {
  await connectToDatabase();
  try {
    const isEmailExist = await User.findOne({ email });

    if (!isEmailExist) {
      return { success: false, message: "Invalid login credentials" };
    }
    if (!isEmailExist.isVerified) {
      return { success: false, message: "Please verify your email first." };
    }
    const isPassMatched = bcrypt.compareSync(password, isEmailExist.password);
    if (!isPassMatched) {
      return { success: false, message: "Invalid login credentials" };
    }

    const userData = {
      _id: isEmailExist._id,
      userName: isEmailExist.userName,
      email: isEmailExist.email,
      firstName: isEmailExist.firstName,
      secondName: isEmailExist.secondName,
      image: isEmailExist.image,
    };

    const token = jwt.sign(
      {
        id: isEmailExist._id,
        userEmail: isEmailExist.email,
        userName: isEmailExist.userName,
        firstName: isEmailExist.firstName,
        secondName: isEmailExist.secondName,
        Userimage: isEmailExist.image,
      },
      process.env.LOGIN_SIG || "",
      { expiresIn: "1d" }
    );

    (await cookies()).set("userToken", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return {
      success: true,
      message: `Welcome back ${isEmailExist.firstName} ${isEmailExist.secondName} 👋`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

export { LogInFunction };
