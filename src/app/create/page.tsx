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
import { QuizUser } from "@/lib/types";
import PeakGreeting from "../components/Greeting";

export default function CreatePage() {
    const [quizTitle, setQuizTitle] = useState<string>("");
    const [quizDescription, setQuizDescription] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [privateQuiz, setPrivateQuiz] = useState<boolean>(false);
    const [quizImage, setQuizImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
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

    useEffect(() => {
        console.log("Selected category changed:", selectedCategory);
        console.log("Selected difficulty changed:", difficulty);
    }, [selectedCategory, difficulty]);

    return (
        <div className="px-5 pb-6">
            <h1 className="text-2xl font-semibold mb-4">Create a New Quiz</h1>
            <p>Use the form below to create your quiz.</p>
            <form className="mt-6 space-y-4">
                <Input type="text" name="quizTitle" placeholder="Quiz Title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} icon={<Edit3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />
                <Input type="text" name="quizDescription" placeholder="Quiz Description" value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} icon={<AlignLeft className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />
                <SearchableDropdown options={categories} selected={selectedCategory} setSelected={setSelectedCategory} />
                <SelectOpt placeholder="Set Difficulty" options={[
                    { value: "easy", label: "Easy" },
                    { value: "medium", label: "Medium" },
                    { value: "hard", label: "Hard" }
                ]} selected={difficulty} setSelected={setDifficulty} />
                <Input type="number" name="quizTimeLimit" placeholder="Time Limit (in minutes)" value="" onChange={() => { }} icon={<TimerIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />
                <Input type="number" name="quizQuestionsCount" placeholder="Number of Questions" value="" onChange={() => { }} icon={<BadgeQuestionMarkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />
                <div>
                    <label className="relative flex items-center">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="quizImage"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setQuizImage(file);
                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        <div
                            className="flex items-center w-full bg-white border border-gray-300 rounded-lg px-3 py-2 cursor-pointer relative"
                            onClick={() => document.getElementById("quizImage")?.click()}
                        >
                            <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <span className="ml-8 text-gray-400">
                                {quizImage ? quizImage.name : "Upload Quiz Image"}
                            </span>
                        </div>
                    </label>
                    {imagePreview && (
                        <div className="mt-2">
                            <Image
                                src={imagePreview}
                                alt="Quiz Preview"
                                width={320}
                                height={180}
                                className="rounded-lg border border-gray-200"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    width: typeof window !== "undefined" && window.innerWidth < 640 ? 180 : 370,
                                    minHeight: typeof window !== "undefined" && window.innerWidth < 640 ? 100 : 180,
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="mx-auto">
                    <TagInput
                        name="quizTags"
                        placeholder="Add tags (press Enter or comma)"
                        tags={tags}
                        setTags={setTags}
                    />
                    <div className="mt-2">
                        <strong>Tags:</strong> {tags.join(", ")}
                    </div>
                </div>
                <div className="flex items-center justify-start gap-3">
                    <Switch id="privacySwitch" className="cursor-pointer" checked={privateQuiz} onCheckedChange={() => {
                        setPrivateQuiz(!privateQuiz)
                    }} />
                    <label htmlFor="privacySwitch">Private Quiz</label>
                </div>
                <button type="submit" className="py-2 px-5 bg-indigo-600 rounded-lg text-white">Create Quiz</button>
            </form>
            <p className="mt-4 text-sm text-gray-500">Once created, you can add questions and options to your quiz.</p>
        </div>
    );
}