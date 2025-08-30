"use client"
import { fetchAllMyQuizzes } from "@/lib/api/fetch";
import { Quiz } from "@/lib/types";
import { useEffect, useState } from "react"
import QuizCard from "../components/QuizCard";
import QuizCardSkeleton from "../components/skeletons/QuizCardSkeleton";
import DeleteQuizConfirmModal from "../components/modals/DeleteQuizConfirm";

export default function MyQuizzes() {
    const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState({ id: "", title: "" })
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const quizData: Quiz[] = await fetchAllMyQuizzes() as Quiz[];
            setMyQuizzes(quizData)
            setLoading(false);
        };
        fetchData();
    }, [refresh])
    return (
        <div className="px-5 pb-6">
            <h1 className="text-2xl font-semibold mb-4">Manage Your Quizzes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {loading
                    ? Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx}>
                            <QuizCardSkeleton />
                        </div>
                    ))
                    : myQuizzes.map((quiz, ind) => (
                        <div
                            key={quiz._id}
                            className={`${ind === myQuizzes.length - 1 && myQuizzes.length % 2 !== 0
                                ? "md:col-span-2"
                                : ""
                                }`}
                        >
                            <QuizCard
                                onDelete={() => {
                                    setShowDeleteModal(true)
                                    setCurrentQuiz({ id: quiz?._id, title: quiz?.title })
                                }}
                                quiz={quiz}
                            />
                        </div>
                    ))}
            </div>
            {showDeleteModal && <DeleteQuizConfirmModal setRefresh={setRefresh} refresh={refresh} quizId={currentQuiz?.id} quizTitle={currentQuiz?.title} show={showDeleteModal} setShow={setShowDeleteModal} />}
        </div>

    )
}
