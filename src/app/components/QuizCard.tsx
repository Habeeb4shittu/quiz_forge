import { Quiz } from "@/lib/types";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Clock, Hash, Lock, Star, Trash } from "lucide-react";
import Link from "next/link";

interface QuizCardProps {
    quiz: Quiz;
    onDelete: (quizId: string) => void;
}

function getIcon(name: string): LucideIcon {
    const icon = (Icons as Record<string, unknown>)[name];
    return (icon as LucideIcon) || BookOpen;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
    const Icon = getIcon(quiz?.icon)
    return (
        <div
            id={quiz._id}
            className="draggable w-full h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-200 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative pb-10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:transition-colors"
            draggable="true"
        >
            <div className="flex items-center gap-3">
                <Icon className="w-8 h-8 text-white" />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">{quiz.title}</h2>
                        {quiz.private && <Lock className="w-5 h-5 text-red-500" />}
                    </div>
                    <p className="text-sm text-white line-clamp-2">{quiz.description || "No description"}</p>
                    <div className="flex gap-2 mt-2 text-xs text-gray-100">
                        <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" /> {quiz.difficulty}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {quiz.time_limit === 0 ? "No limit" : `${quiz.time_limit} min`}
                        </span>
                        <span className="flex items-center gap-1">
                            <Hash className="w-4 h-4" /> {quiz.number_of_questions} Qs
                        </span>
                    </div>
                    {quiz.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {quiz.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4 flex gap-3 justify-end self-end absolute bottom-2 right-2">
                <Link
                    href={`/quizzes/${quiz._id}`}
                    className="flex items-center justify-center gap-2 group text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                    <Icons.Eye className="w-4 h-4" />
                    <span className="max-w-0 opacity-0 text-sm overflow-hidden transition-all duration-300 group-hover:max-w-[80px] group-hover:opacity-100">
                        View
                    </span>
                </Link>

                <Link
                    href={`/edit/${quiz._id}`}
                    className="flex items-center justify-center gap-2 group text-gray-600 hover:text-yellow-600 transition-colors duration-200"
                >
                    <Icons.Edit2 className="w-4 h-4" />
                    <span className="max-w-0 opacity-0 text-sm overflow-hidden transition-all duration-300 group-hover:max-w-[80px] group-hover:opacity-100">
                        Edit
                    </span>
                </Link>

                <button
                    onClick={() => onDelete(quiz._id)}
                    className="flex items-center justify-center gap-2 group cursor-pointer text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                    <Trash className="w-4 h-4" />
                    <span className="max-w-0 opacity-0 text-sm overflow-hidden transition-all duration-300 group-hover:max-w-[80px] group-hover:opacity-100">
                        Delete
                    </span>
                </button>
            </div>

        </div>
    );
}