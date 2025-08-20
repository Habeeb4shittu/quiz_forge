// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({
        status: "error",
        message: "Unauthorized access",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await User.findById(decoded.id).select("-password"); // exclude password

    if (!user) {
      return NextResponse.json({
        status: "error",
        message: "User not found",
      });
    }

    return NextResponse.json({
      status: "success",
      user,
    });
  } catch (err) {
    console.error("Auth check error:", err);
    return NextResponse.json({
      status: "error",
      message: "Invalid token or user not found",
    });
  }
}
