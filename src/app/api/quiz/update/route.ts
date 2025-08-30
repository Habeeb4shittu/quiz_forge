import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Quiz from "@/models/Quiz";

export async function PATCH(req: Request) {
  try {
    const {
      quizId, // Required to identify the quiz
      title,
      description,
      category_id,
      difficulty,
      time_limit,
      number_of_questions,
      tags,
      icon,
      private: isPrivate,
    } = await req.json();

    await dbConnect();

    // Validation: quizId is required
    if (!quizId) {
      return NextResponse.json(
        { message: "Quiz ID is required", status: "error" },
        { status: 400 }
      );
    }

    // Validation: Difficulty must be one of the defined values
    const allowedDifficulties = ["easy", "medium", "hard"];
    if (difficulty && !allowedDifficulties.includes(difficulty)) {
      return NextResponse.json({
        message: "Invalid difficulty level",
        status: "error",
      });
    }

    // Validation: number_of_questions and time_limit should be numeric strings
    if (number_of_questions && !/^\d+$/.test(number_of_questions.toString())) {
      return NextResponse.json({
        message: "Number of questions must be a valid number",
        status: "error",
      });
    }

    if (time_limit && !/^\d+$/.test(time_limit.toString())) {
      return NextResponse.json({
        message: "Time limit must be a valid number",
        status: "error",
      });
    }

    // Update fields dynamically
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(category_id && { category_id }),
        ...(difficulty && { difficulty }),
        ...(time_limit !== undefined && { time_limit }),
        ...(number_of_questions !== undefined && { number_of_questions }),
        ...(tags && { tags }),
        ...(icon && { icon }),
        ...(isPrivate !== undefined && { private: isPrivate }),
      },
      { new: true } // Return updated document
    );

    if (!updatedQuiz) {
      return NextResponse.json(
        { message: "Quiz not found", status: "error" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Quiz updated successfully",
      status: "success",
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.error("Quiz update error:", error);
    return NextResponse.json(
      { message: "Something went wrong", status: "error" },
      { status: 500 }
    );
  }
}
