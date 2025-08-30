import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import mongoose from "mongoose";

export async function DELETE(req: Request) {
  try {
    const { quizId } = await req.json();

    await dbConnect();
    console.log(quizId);

    // Validation: quizId is required
    if (!quizId) {
      return NextResponse.json(
        { message: "Quiz ID is required", status: "error" },
        { status: 400 }
      );
    }

    // Attempt to delete the quiz
    const deletedQuiz = await Quiz.findByIdAndDelete(
      new mongoose.Types.ObjectId(quizId)
    );

    if (!deletedQuiz) {
      return NextResponse.json(
        { message: "Quiz not found", status: "error" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Quiz deleted successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Quiz deletion error:", error);
    return NextResponse.json(
      { message: "Something went wrong", status: "error" },
      { status: 500 }
    );
  }
}
