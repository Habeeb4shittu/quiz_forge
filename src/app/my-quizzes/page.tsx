"use client"
import { fetchAllMyQuizzes } from "@/lib/api/fetch";
import { Quiz } from "@/lib/types";
import { useEffect, useState } from "react"

export default function MyQuizzes() {
    const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const quizData = await fetchAllMyQuizzes();
            console.log(quizData);
            setLoading(false);
        };
        fetchData();
    }, [])
    return (
        <div className="px-5 pb-6">
            <h1 className="text-2xl font-semibold mb-4">Manage Your Quizzes</h1>

        </div>
    )
}