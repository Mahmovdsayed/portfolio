import { verifyToken } from "@/functions/verifyToken";
import { connectToDatabase } from "@/lib/dbConnection";
import Experience from "@/models/experience.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    await connectToDatabase();

    const token = (await cookies()).get("userToken")?.value;
    if (!token) {
      return NextResponse.json(
        { status: false, errorMessage: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { status: false, errorMessage: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const companyName = formData.get("companyName") as string;
    const positionName = formData.get("positionName") as string;
    const description = formData.get("description") as string;
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const employmentType = formData.get("employmentType") as string;
    const current = formData.get("current") as string;

    if (!id) {
      return NextResponse.json(
        { status: false, errorMessage: "ID is required" },
        { status: 400 }
      );
    }

    const work = await Experience.findById(id);
    if (!work) {
      return NextResponse.json(
        { status: false, errorMessage: "Work experience not found" },
        { status: 404 }
      );
    }

    const updatedWork = await Experience.findByIdAndUpdate(
      id,
      {
        companyName,
        positionName,
        description,
        from,
        to,
        employmentType,
        current: current === "true",
      },
      { new: true }
    );

    return NextResponse.json({
      status: true,
      message: "Work experience updated successfully",
      updatedWork,
    });
  } catch (error) {
    return NextResponse.json(
      { status: false, errorMessage: "Something went wrong!" },
      { status: 500 }
    );
  }
};
