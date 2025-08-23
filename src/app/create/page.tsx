"use client";
import { AlignLeft, BadgeQuestionMarkIcon, Edit3, ImageIcon, TagsIcon, TimerIcon } from "lucide-react";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCategories } from "@/lib/api/fetch";
import { SearchableDropdown } from "../components/DropdownSearch";
import { SelectOpt } from "../components/SelectOpt";
import { Switch } from "@/components/ui/switch";
import TagInput from "../components/TagInput";
import { ApiResponse, QuizUser } from "@/lib/types";
import PeakGreeting from "../components/Greeting";
import IconPicker from "../components/QuizIconPicker";
import { createQuiz } from "@/lib/api/quiz";
import { toast } from "sonner";

export default function CreatePage() {
    const [quizTitle, setQuizTitle] = useState<string>("");
    const [quizDescription, setQuizDescription] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [privateQuiz, setPrivateQuiz] = useState<boolean>(false);
    const [quizIcon, setQuizIcon] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [quizTimeLimit, setQuizTimeLimit] = useState<number | null>(null);
    const [quizQuestionsCount, setQuizQuestionsCount] = useState<number | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch categories from the API
        const fetchData = async () => {
            const categoriesData = await fetchCategories();
            setCategories(Array.isArray(categoriesData) ? categoriesData.map((category) => {
                return {
                    value: category._id,
                    label: category.name
                };
            }) : []);
            setLoading(false);
        };
        fetchData();
    }, []);


    const handleCreateQuiz = async (e: React.FormEvent) => {
        e.preventDefault();

        const quizData = {
            author_id: JSON.parse(localStorage.getItem("user") || "")._id,
            title: quizTitle,
            description: quizDescription,
            category_id: selectedCategory, // match your backend naming
            difficulty: difficulty,
            private: privateQuiz,
            icon: quizIcon,
            time_limit: quizTimeLimit,
            number_of_questions: quizQuestionsCount,
            tags: tags
        };

        const response: ApiResponse = await createQuiz(quizData) as ApiResponse;

        if (response.status === "success") {
            toast.success("Quiz created successfully!");
            // maybe navigate to quiz page or show success toast
        } else {
            toast.error(response.message || "Failed to create quiz.");
            // show error toast
        }
    };

    return (
        <div className="px-5 pb-6">
            <h1 className="text-2xl font-semibold mb-4">Create a New Quiz</h1>
            <p>Use the form below to create your quiz.</p>
            <form className="mt-6 space-y-4" onSubmit={handleCreateQuiz}>
                <Input type="text" name="quizTitle" placeholder="Quiz Title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} icon={<Edit3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />
                <Input type="text" name="quizDescription" placeholder="Quiz Description" value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} icon={<AlignLeft className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />
                <SearchableDropdown options={categories} selected={selectedCategory} setSelected={setSelectedCategory} />
                <SelectOpt placeholder="Set Difficulty" options={[
                    { value: "easy", label: "Easy" },
                    { value: "medium", label: "Medium" },
                    { value: "hard", label: "Hard" }
                ]} selected={difficulty} setSelected={setDifficulty} />
                <Input type="number" name="quizTimeLimit" placeholder="Time Limit (in minutes)" value={String(quizTimeLimit)} onChange={(e) => setQuizTimeLimit(Number(e.target.value))} icon={<TimerIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />
                <Input type="number" name="quizQuestionsCount" placeholder="Number of Questions" value={String(quizQuestionsCount)} onChange={(e) => setQuizQuestionsCount(Number(e.target.value))} icon={<BadgeQuestionMarkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />

                <div className="mx-auto">
                    <TagInput
                        name="quizTags"
                        placeholder="Add tags (press Enter or comma)"
                        tags={tags}
                        setTags={setTags}
                    />
                    {tags.length > 0 && (
                        <div className="mt-2">
                            <strong>Tags:</strong> {tags.join(", ")}
                        </div>
                    )}
                </div>
                <div>
                    <label></label>
                    <IconPicker selected={quizIcon} setSelected={setQuizIcon} />
                </div>
                <div className="flex items-center justify-start gap-3">
                    <Switch id="privacySwitch" className="cursor-pointer" checked={privateQuiz} onCheckedChange={() => {
                        setPrivateQuiz(!privateQuiz)
                    }} />
                    <label htmlFor="privacySwitch">Private Quiz</label>
                </div>
                <button type="submit" className="py-2 px-5 bg-indigo-600 rounded-lg cursor-pointer text-white">Create Quiz</button>
            </form>
            <p className="mt-4 text-sm text-gray-500">Once created, you can add questions and options to your quiz.</p>
        </div>
    );
}