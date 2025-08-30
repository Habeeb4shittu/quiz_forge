import dbConnect from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, context: any) {
  try {
    await dbConnect();
    const { id } = context.params; // Access params directly

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid quiz ID", status: "error" },
        { status: 400 }
      );
    }

    const quiz = await Quiz.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    return NextResponse.json(quiz, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { message: "Failed to fetch quiz", status: "error" },
      { status: 500 }
    );
  }
}
