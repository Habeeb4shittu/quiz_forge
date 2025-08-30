"use client";
import { deleteQuiz } from "@/lib/api/quiz";
import { ApiResponse } from "@/lib/types";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteQuizConfirmModal({
    quizTitle,
    quizId,
    refresh,
    show,
    setRefresh,
    setShow,
}: {
    quizTitle: string;
    quizId: string;
    show: boolean;
    refresh?: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        const response = await deleteQuiz(quizId) as unknown as ApiResponse;
        if (response?.status === "success") {
            toast.success(response?.message)
            setRefresh(!refresh);
            setLoading(false);
        } else {
            setLoading(false);
            toast.error(response.message)
        }
        setShow(false);
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={() => setShow(false)}
        >
            <div
                className="w-full max-w-md relative rounded-2xl bg-white shadow-lg px-6 py-6"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute -top-6 -right-6 rounded-full transition-all duration-300 group cursor-pointer hover:bg-red-500 p-2" onClick={() => setShow(false)}>
                    <X className="w-4 h-4 text-red-500 group-hover:text-white transition-all duration-300" />
                </button>
                {/* Header */}
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                    Delete <span className="text-red-600">{quizTitle}</span>?
                </h1>

                {/* Message */}
                <p className="text-sm text-gray-600 mb-6">
                    This action is irreversible. Once deleted, you cannot recover this quiz.
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setShow(false)}
                        className="rounded-lg border border-gray-300 cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Don&apos;t delete
                    </button>
                    <button
                        className="rounded-lg disabled:opacity-30 bg-red-600 px-4 py-2 text-white cursor-pointer hover:bg-red-700 transition"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
