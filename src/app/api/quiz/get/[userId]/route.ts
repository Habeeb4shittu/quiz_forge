import dbConnect from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Minimal types
interface RouteParams {
  params: { userId: string };
}

export async function GET(
  request: Request,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await dbConnect();
    const { userId } = params;
    console.log(params);

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return NextResponse.json({
    //     message: "Invalid user ID",
    //     status: "error",
    //   });
    // }

    const quizzes = await Quiz.find({
      author_id: new mongoose.Types.ObjectId(userId),
    }).sort({
      title: 1,
    });

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json({
      message: "Failed to fetch quizzes",
      status: "error",
    });
  }
}
