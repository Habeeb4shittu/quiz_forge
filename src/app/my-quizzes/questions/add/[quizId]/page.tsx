"use client";
import { useState } from "react";
import { ChevronDown, Plus, Send, BookOpen, Upload, Code, X, Check } from "lucide-react";
import { Question } from "@/lib/types";
import { QuestionInput } from "@/app/components/QuizQuestionForm";


const QuestionForm: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([
        { text: "", choices: ["", "", "", ""], correctAnswerIndex: 0, explanation: "" },
    ]);
    const [expandedIndex, setExpandedIndex] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isJsonSyntaxVisible, setIsJsonSyntaxVisible] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const addQuestion = () => {
        const newIndex = questions.length;
        setQuestions([...questions, { text: "", choices: ["", "", "", ""], correctAnswerIndex: 0, explanation: "" }]);
        setTimeout(() => setExpandedIndex(newIndex), 100);
    };

    const updateQuestion = (index: number, updatedQuestion: Question) => {
        const newQuestions = [...questions];
        newQuestions[index] = updatedQuestion;
        setQuestions(newQuestions);
    };

    const removeQuestion = (index: number) => {
        // if (questions.length === 1) return; // Keep at least one question

        setQuestions(questions.filter((_, i) => i !== index));
        if (expandedIndex === index) {
            setExpandedIndex(questions.length - 2 >= 0 ? questions.length - 2 : 0);
        } else if (expandedIndex > index) {
            setExpandedIndex(expandedIndex - 1);
        }
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateJson = (data: any): Question[] | null => {
        try {
            if (!Array.isArray(data)) return null;

            const validatedQuestions: Question[] = [];
            for (const q of data) {
                if (
                    typeof q.text !== "string" ||
                    !Array.isArray(q.choices) ||
                    q.choices.length !== 4 ||
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    !q.choices.every((c: any) => typeof c === "string") ||
                    typeof q.correctAnswerIndex !== "number" ||
                    q.correctAnswerIndex < 0 ||
                    q.correctAnswerIndex >= q.choices.length
                ) {
                    return null;
                }
                validatedQuestions.push({
                    text: q.text,
                    choices: q.choices,
                    correctAnswerIndex: q.correctAnswerIndex,
                    explanation: q.explanation || "",
                });
            }
            return validatedQuestions;
        } catch {
            return null;
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target?.result as string);
                const validatedQuestions = validateJson(jsonData);
                if (validatedQuestions) {
                    setQuestions([...questions, ...validatedQuestions]);
                    setExpandedIndex(questions.length);
                    setShowSuccessMessage(true);
                    setTimeout(() => setShowSuccessMessage(false), 3000);
                }
            } catch {
                // Handle error silently or show a toast
            }
        };
        reader.readAsText(file);
        e.target.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            questionsAndAnswers: questions,
        };

        console.log("Submitting:", payload);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
        }, 2000);
    };

    const totalCompletionPercentage = () => {
        if (questions.length === 0) return 0;
        const totalCompletion = questions.reduce((acc, q) => {
            let completed = 0;
            if (q.text.trim()) completed++;
            q.choices.forEach(choice => {
                if (choice.trim()) completed++;
            });
            return acc + (completed / 5);
        }, 0);
        return Math.round((totalCompletion / questions.length) * 100);
    };

    const jsonSyntax = `[
  {
    "text": "What is the capital of France?",
    "choices": ["London", "Berlin", "Paris", "Madrid"],
    "correctAnswerIndex": 2,
    "explanation": "Paris is the capital city of France."
  }
]`;

    return (
        <div className="mt-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-100/40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl"></div>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl transform transition-all duration-500 ease-out animate-in slide-in-from-top-2">
                    <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">Success! Questions processed.</span>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto px-6 py-12 relative">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-violet-200/50 shadow-lg mb-6">
                        <BookOpen className="w-6 h-6 text-violet-600" />
                        <span className="text-violet-700 font-semibold">Quiz Builder</span>
                    </div>
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">
                        Create Amazing Questions
                    </h1>
                    <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                        Build engaging quiz questions with our intuitive interface or upload them via JSON
                    </p>

                    {/* Progress indicator */}
                    {/* <div className="mt-8 max-w-md mx-auto">
                        <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                            <span>Overall Progress</span>
                            <span className="font-semibold">{totalCompletionPercentage()}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="h-full bg-violet-500 transition-all duration-700 ease-out rounded-full"
                                style={{ width: `${totalCompletionPercentage()}%` }}
                            />
                        </div>
                    </div> */}
                </div>

                {/* JSON Syntax Toggle */}
                <div className="mb-8 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setIsJsonSyntaxVisible(!isJsonSyntaxVisible)}
                        className="group cursor-pointer flex items-center space-x-3 bg-white/80 backdrop-blur-md text-violet-700 hover:text-violet-900 px-6 py-3 rounded-2xl font-semibold border border-violet-200/50 hover:border-violet-300 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Code className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <span>{isJsonSyntaxVisible ? "Hide" : "View"} JSON Format</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isJsonSyntaxVisible ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* JSON Syntax Display */}
                {isJsonSyntaxVisible && (
                    <div className="mb-8 transform transition-all duration-500 ease-out animate-in slide-in-from-top-4">
                        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-white font-bold text-lg flex items-center space-x-2">
                                    <Code className="w-5 h-5 text-violet-400" />
                                    <span>JSON Format Example</span>
                                </h4>
                                <button
                                    onClick={() => setIsJsonSyntaxVisible(false)}
                                    className="p-2 text-slate-400 hover:text-white cursor-pointer hover:bg-slate-700 rounded-xl transition-all duration-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <pre className="text-sm text-slate-300 bg-slate-800/50 p-6 rounded-2xl border border-slate-600 overflow-x-auto font-mono">
                                <code>{jsonSyntax}</code>
                            </pre>
                            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                                Upload a JSON file with this structure. Each question must have a <code className="bg-slate-700 px-2 py-1 rounded text-violet-300">text</code>,
                                exactly 4 <code className="bg-slate-700 px-2 py-1 rounded text-violet-300">choices</code>, and a
                                <code className="bg-slate-700 px-2 py-1 rounded text-violet-300"> correctAnswerIndex</code> (0-3).
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sticky top-0 py-3 bg-white z-50 justify-center mb-12">
                    <label className="group relative overflow-hidden cursor-pointer">
                        <div className="flex items-center justify-center space-x-3 bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-8 rounded-lg font-bold shadow-xl hover:shadow-2xl transform transition-all duration-400 hover:scale-105 active:scale-95">
                            <Upload className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                            <span>Upload JSON Questions</span>
                        </div>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </label>

                    <button
                        type="button"
                        onClick={addQuestion}
                        className="group flex items-center justify-center space-x-3 bg-violet-500 hover:bg-violet-600 text-white py-4 px-8 rounded-lg font-bold shadow-xl hover:shadow-2xl transform transition-all duration-400 cursor-pointer hover:scale-105 active:scale-95"
                    >
                        <Plus className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                        <span>Add New Question</span>
                    </button>
                </div>

                {/* Questions List */}
                <div className="space-y-8 mb-12">
                    {questions.map((question, index) => (
                        <div key={index} className="transform transition-all duration-500 ease-out hover:-translate-y-1">
                            <QuestionInput
                                index={index}
                                question={question}
                                onChange={updateQuestion}
                                onRemove={removeQuestion}
                                isExpanded={expandedIndex === index}
                                toggleExpand={toggleExpand}
                            />
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="group relative overflow-hidden flex items-center justify-center space-x-3 bg-emerald-500 hover:bg-emerald-600 text-white py-5 px-12 rounded-2xl font-bold shadow-2xl hover:shadow-emerald-200 transform transition-all duration-400 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-lg">Publishing Quiz...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                <span className="text-lg">Publish Quiz</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Footer Stats */}
                <div className="mt-16 text-center">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-3 border border-gray-200/50 shadow-lg">
                            <div className="text-xl font-bold text-violet-600 mb-2">{questions.length}</div>
                            <div className="text-slate-600 font-semibold">Questions</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-3 border border-gray-200/50 shadow-lg">
                            <div className="text-xl font-bold text-emerald-600 mb-2">{totalCompletionPercentage()}%</div>
                            <div className="text-slate-600 font-semibold">Complete</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-3 border border-gray-200/50 shadow-lg">
                            <div className="text-xl font-bold text-amber-600 mb-2">
                                {questions.filter(q => q.explanation?.trim()).length}
                            </div>
                            <div className="text-slate-600 font-semibold">With Explanations</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;