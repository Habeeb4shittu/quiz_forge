"use client";
import QuizForm from "@/app/components/QuizForm";
import { useParams } from "next/navigation";

export default function EditQuizPage() {
    const { quizId } = useParams();
    return (
        <div className="px-5 pb-6">
            <h1 className="text-2xl font-semibold mb-4">Edit Quiz</h1>
            <p>Use the form below to edit your quiz.</p>
            <QuizForm isEdit={true} quizId={quizId as string} />
        </div>
    )
}