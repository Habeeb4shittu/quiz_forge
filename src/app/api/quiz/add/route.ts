import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Quiz from "@/models/Quiz";

export async function POST(req: Request) {
  try {
    const {
      author_id,
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

    // Validation: Required fields
    if (!title || !category_id) {
      return NextResponse.json({
        message: "Title and category are required",
        status: "error",
      });
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

    // Create new quiz
    const newQuiz = await Quiz.create({
      author_id,
      title,
      description: description || "",
      category_id,
      difficulty: difficulty || "medium",
      time_limit: time_limit || "25",
      number_of_questions: number_of_questions || "10",
      tags: tags || [],
      icon: icon || "BookOpen",
      private: isPrivate ?? false,
    });

    return NextResponse.json({
      message: "Quiz created successfully",
      status: "success",
      quizId: newQuiz._id,
    });
  } catch (error) {
    console.error("Quiz creation error:", error);
    return NextResponse.json(
      { message: "Something went wrong", status: "error" },
      { status: 500 }
    );
  }
}
