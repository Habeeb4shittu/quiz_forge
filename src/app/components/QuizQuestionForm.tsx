import { Question } from "@/lib/types";
import { AlertCircle, BookOpen, Check, ChevronDown, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Input from "./Input";
import { TextareaInput } from "./TextareaInput";

interface QuestionInputProps {
    index: number;
    question: Question;
    onChange: (index: number, question: Question) => void;
    onRemove: (index: number) => void;
    isExpanded: boolean;
    toggleExpand: (index: number) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ index, question, onChange, onRemove, isExpanded, toggleExpand }) => {
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const handleChoiceChange = (choiceIndex: number, value: string) => {
        const newChoices = [...question.choices];
        newChoices[choiceIndex] = value;
        onChange(index, { ...question, choices: newChoices });
        if (errors[`choice-${choiceIndex}`]) {
            setErrors(prev => ({ ...prev, [`choice-${choiceIndex}`]: false }));
        }
    };

    const validateQuestion = () => {
        const newErrors: { [key: string]: boolean } = {};
        if (!question.text.trim()) newErrors.text = true;
        question.choices.forEach((choice, idx) => {
            if (!choice.trim()) newErrors[`choice-${idx}`] = true;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (isExpanded) validateQuestion();
    }, [question, isExpanded]);

    const completionPercentage = () => {
        let completed = 0;
        if (question.text.trim()) completed++;
        question.choices.forEach(choice => {
            if (choice.trim()) completed++;
        });
        if (question.explanation?.trim()) completed++;
        return Math.round((completed / 6) * 100);
    };

    return (
        <div className="relative">
            <div className="backdrop-blur-md rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 h-0.5 bg-gray-200/50 w-full">
                    <div
                        className="h-full bg-violet-500 transition-all duration-500"
                        style={{ width: `${completionPercentage()}%` }}
                    />
                </div>

                {/* Header */}
                <div
                    className={`flex justify-between items-center cursor-pointer hover:bg-white/20 transition-all duration-200 ${isExpanded ? "p-4" : "p-3"}`}
                    onClick={() => toggleExpand(index)}
                >
                    <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${isExpanded
                            ? "bg-violet-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-600"}`}>
                            <span>{index + 1}</span>
                            {completionPercentage() === 100 && (
                                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                                    <Check className="w-1.5 h-1.5 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-base font-medium text-gray-900 truncate max-w-[200px]">
                                {question.text || `Question ${index + 1}`}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>{completionPercentage()}% complete</span>
                                {Object.keys(errors).length > 0 && (
                                    <span className="flex items-center space-x-1 text-red-500">
                                        <AlertCircle className="w-2.5 h-2.5" />
                                        <span>Needs attention</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onRemove(index); }}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className={`p-1.5 rounded-lg transition-all ${isExpanded
                            ? "bg-violet-100 text-violet-600 rotate-180"
                            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"}`}>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Expandable Content */}
                <div className={`transition-all duration-400 ease-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-4 pb-6 space-y-4">
                        {/* Question Text */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-800 flex items-center space-x-1.5">
                                <div className="w-5 h-5 rounded-md bg-violet-100 flex items-center justify-center">
                                    <BookOpen className="w-2.5 h-2.5 text-violet-600" />
                                </div>
                                <span>Question Text</span>
                                <span className="text-red-500">*</span>
                            </label>
                            <Input
                                name={`question-${index}-text`}
                                placeholder="What would you like to ask?"
                                value={question.text}
                                onChange={(e) => onChange(index, { ...question, text: e.target.value })}
                                icon={<Edit className="w-4 h-4" />}
                            />
                        </div>

                        {/* Answer Choices */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-800 flex items-center space-x-1.5">
                                <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-600 text-xs font-semibold">4</span>
                                </div>
                                <span>Answer Choices</span>
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {question.choices.map((choice, choiceIndex) => (
                                    <div key={choiceIndex} className="relative group/choice">
                                        <Input
                                            name={`question-${index}-choice-${choiceIndex}`}
                                            placeholder={`Option ${String.fromCharCode(65 + choiceIndex)}`}
                                            value={choice}
                                            onChange={(e) => handleChoiceChange(choiceIndex, e.target.value)}
                                            icon={
                                                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-semibold transition-all ${question.correctAnswerIndex === choiceIndex
                                                    ? "bg-emerald-500 border-emerald-400 text-white"
                                                    : "border-gray-300 text-gray-500 group-hover/choice:border-violet-300 group-hover/choice:text-violet-500"}`}>
                                                    {String.fromCharCode(65 + choiceIndex)}
                                                </div>
                                            }
                                        />
                                        {question.correctAnswerIndex === choiceIndex && (
                                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                                <Check className="w-2 h-2 text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Correct Answer Selector */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-800 flex items-center space-x-1.5">
                                <div className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center">
                                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                                </div>
                                <span>Correct Answer</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={question.correctAnswerIndex}
                                    onChange={(e) => onChange(index, { ...question, correctAnswerIndex: parseInt(e.target.value) })}
                                    className="w-full pl-10 pr-8 py-2.5 rounded-md border border-gray-200/70 bg-white/90 text-sm text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 hover:border-gray-300 appearance-none cursor-pointer"
                                >
                                    {question.choices.map((choice, choiceIndex) => (
                                        <option key={choiceIndex} value={choiceIndex}>
                                            Option {String.fromCharCode(65 + choiceIndex)} {choice ? `- ${choice.slice(0, 20)}${choice.length > 20 ? '...' : ''}` : '- Empty'}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Check className="w-2 h-2 text-white" />
                                    </div>
                                </div>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>

                        {/* Explanation */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-800 flex items-center space-x-1.5">
                                <div className="w-5 h-5 rounded-md bg-amber-100 flex items-center justify-center">
                                    <BookOpen className="w-2.5 h-2.5 text-amber-600" />
                                </div>
                                <span>Explanation</span>
                                <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <TextareaInput
                                name={`question-${index}-explanation`}
                                placeholder="Why is this the correct answer?"
                                value={question.explanation || ""}
                                onChange={(e) => onChange(index, { ...question, explanation: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};