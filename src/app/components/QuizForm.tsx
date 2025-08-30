"use client";
import { AlignLeft, BadgeQuestionMarkIcon, Edit3, TimerIcon } from "lucide-react";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { fetchCategories, fetchQuiz } from "@/lib/api/fetch";
import { SearchableDropdown } from "../components/DropdownSearch";
import { SelectOpt } from "../components/SelectOpt";
import { Switch } from "@/components/ui/switch";
import TagInput from "../components/TagInput";
import { ApiResponse, Quiz } from "@/lib/types";
import IconPicker from "../components/QuizIconPicker";
import { createQuiz, updateQuiz } from "@/lib/api/quiz";
import { toast } from "sonner";
import QuizFormSkeleton from "./skeletons/FormSkeleton";
import { useRouter } from "next/navigation";

export default function QuizForm({ isEdit = false, quizId }: { isEdit?: boolean, quizId?: string }) {

    const [quizTitle, setQuizTitle] = useState<string>("");
    const [quizDescription, setQuizDescription] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [privateQuiz, setPrivateQuiz] = useState<boolean>(false);
    const [quizIcon, setQuizIcon] = useState<string | null>(null);
    const [quizTimeLimit, setQuizTimeLimit] = useState<number | null>(null);
    const [quizQuestionsCount, setQuizQuestionsCount] = useState<number | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [editDataLoading, setEditDataLoading] = useState(false);

    const router = useRouter()

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

    useEffect(() => {
        if (!isEdit) return;
        const fetchQ = async () => {
            setEditDataLoading(true);
            const quizData: Quiz = await fetchQuiz(quizId) as Quiz;
            if (quizData) {
                setQuizTitle(quizData?.title)
                setQuizDescription(quizData?.description)
                setSelectedCategory(quizData?.category_id)
                setDifficulty(quizData?.difficulty)
                setPrivateQuiz(quizData?.private)
                setQuizIcon(quizData?.icon)
                setQuizTimeLimit(quizData?.time_limit)
                setQuizQuestionsCount(quizData?.number_of_questions)
                setTags(quizData?.tags)
            };
            setEditDataLoading(false);
        };
        fetchQ();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleCreateQuiz = async (e: React.FormEvent) => {
        setLoading(true);
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
        if (!isEdit) {
            const response: ApiResponse = await createQuiz(quizData) as ApiResponse;

            if (response.status === "success") {
                toast.success("Quiz created successfully!");
                setLoading(false);
            } else {
                toast.error(response.message || "Failed to create quiz.");
                setLoading(false);
            }
        } else {
            const editData = { ...quizData, quizId }
            const response: ApiResponse = await updateQuiz(editData) as ApiResponse;

            if (response.status === "success") {
                toast.success("Quiz updated successfully!");
                setLoading(false);
                router.push("/my-quizzes")
            } else {
                toast.error(response.message || "Failed to update quiz.");
                setLoading(false);
            }
        }
    };

    return (
        editDataLoading
            ?
            <QuizFormSkeleton />
            :
            <>
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
                    <button type="submit" className="py-2 px-5 bg-indigo-600 rounded-lg cursor-pointer text-white disabled:cursor-not-allowed disabled:opacity-35" disabled={loading}>{loading ? "Please wait..." : isEdit ? "Update Quiz" : "Create Quiz"}</button>
                </form>
            </>
    )
}