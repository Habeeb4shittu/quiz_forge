import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
      agreeToTerms,
    } = await req.json();
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        status: "error",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({
        message: "Invalid email format",
        status: "error",
      });
    }

    if (!firstname || !lastname || !username || !email || !password) {
      return NextResponse.json({
        message: "All fields are required",
        status: "error",
      });
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return NextResponse.json({
        message:
          "Username can only contain letters, numbers, underscores, and hyphens",
        status: "error",
      });
    }

    if (password.length < 6) {
      return NextResponse.json({
        message: "Password must be at least 6 characters long",
        status: "error",
      });
    }

    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{6,}/.test(
        password
      )
    ) {
      return NextResponse.json({
        message:
          "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character",
        status: "error",
      });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({
        message: "Passwords do not match",
        status: "error",
      });
    }

    if (!agreeToTerms) {
      return NextResponse.json({
        message: "You must agree to the terms and conditions",
        status: "error",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "Registration successfully",
      status: "success",
      userId: newUser._id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
