import dbConnect from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  try {
    await dbConnect();
    const { userId } = params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID", status: "error" },
        { status: 400 }
      );
    }

    const quizzes = await Quiz.find({
      author_id: new mongoose.Types.ObjectId(userId),
    }).sort({ title: 1 });

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { message: "Failed to fetch quizzes", status: "error" },
      { status: 500 }
    );
  }
}
