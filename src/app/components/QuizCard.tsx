import { BookOpen, Clock, Hash, Lock, Star, Trash, PlusCircle, Eye, Edit2, LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Quiz {
    _id: string;
    title: string;
    description?: string;
    icon: string;
    private: boolean;
    difficulty: string;
    time_limit: number;
    number_of_questions: number;
    tags: string[];
}

interface QuizCardProps {
    quiz: Quiz;
    onDelete: (quizId: string) => void;
}

function getIcon(name: string): LucideIcon {
    const icon = (Icons as Record<string, unknown>)[name];
    return (icon as LucideIcon) || BookOpen;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);
    const Icon = getIcon(quiz?.icon);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'text-emerald-600 bg-emerald-50';
            case 'medium': return 'text-amber-600 bg-amber-50';
            case 'hard': return 'text-red-600 bg-red-50';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    const toggleTags = () => {
        setShowAllTags(!showAllTags);
    };

    return (
        <div
            id={quiz._id}
            className="group relative bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            draggable="true"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header with Icon and Status */}
            <div className="p-4 sm:p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-violet-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <h2 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors duration-300">
                                    {quiz.title}
                                </h2>
                                {quiz.private && (
                                    <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                                        <Lock className="w-3 h-3 text-red-600" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {quiz.description || "No description available"}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
                    <div className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                        <Star className="w-3 h-3" />
                        <span>{quiz.difficulty}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-600">
                        <Clock className="w-3 h-3" />
                        <span>{quiz.time_limit === 0 ? "No limit" : `${quiz.time_limit}m`}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-600">
                        <Hash className="w-3 h-3" />
                        <span>{quiz.number_of_questions} Qs</span>
                    </div>
                </div>

                {/* Tags */}
                {quiz.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {(showAllTags ? quiz.tags : quiz.tags.slice(0, 3)).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-medium hover:bg-violet-100 hover:text-violet-700 transition-colors duration-200"
                            >
                                {tag}
                            </span>
                        ))}
                        {quiz.tags.length > 3 && (
                            <button
                                onClick={toggleTags}
                                className="flex items-center px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-lg font-medium hover:bg-violet-100 hover:text-violet-700 transition-colors duration-200"
                            >
                                {showAllTags ? (
                                    <>
                                        <ChevronUp className="w-3 h-3 mr-1" />
                                        Show less
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-3 h-3 mr-1" />
                                        +{quiz.tags.length - 3} more
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="px-4 sm:px-6 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-200/60">
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href={`/quizzes/${quiz._id}`}
                            className="group/action flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-200 cursor-pointer"
                        >
                            <Eye className="w-4 h-4" />
                            <span className="text-sm font-medium">View</span>
                        </Link>
                        <Link
                            href={`/edit/${quiz._id}`}
                            className="group/action flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 cursor-pointer"
                        >
                            <Edit2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Edit</span>
                        </Link>
                        <Link
                            href={`/my-quizzes/questions/add/${quiz._id}`}
                            className="group/action flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 cursor-pointer"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Questions</span>
                        </Link>
                    </div>
                    <button
                        onClick={() => onDelete(quiz._id)}
                        className="group/action flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                        <Trash className="w-4 h-4" />
                        <span className="text-sm font-medium">Delete</span>
                    </button>
                </div>
            </div>

            {/* Hover Accent */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-violet-500 transform origin-left transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
        </div>
    );
}