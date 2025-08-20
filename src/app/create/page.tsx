"use client";
import { AlignLeft, Edit3 } from "lucide-react";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api/fetch";
import { SearchableDropdown } from "../components/DropdownSearch";
import { SelectOpt } from "../components/SelectOpt";
import { Switch } from "@/components/ui/switch";

export default function CreatePage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [privateQuiz, setPrivateQuiz] = useState<boolean>(false);
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
        <div className="pt-12 md:pt-28 px-5">
            <h1 className="text-4xl font-semibold mb-4">Create a New Quiz</h1>
            <p>Use the form below to create your quiz.</p>
            <form className="mt-6 space-y-4">
                <Input type="text" name="quizTitle" placeholder="Quiz Title" value="" onChange={() => { }} icon={<Edit3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />
                <Input type="text" name="quizDescription" placeholder="Quiz Description" value="" onChange={() => { }} icon={<AlignLeft className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />} />
                <SearchableDropdown options={categories} selected={selectedCategory} setSelected={setSelectedCategory} />
                <SelectOpt placeholder="Set Difficulty" options={[
                    { value: "easy", label: "Easy" },
                    { value: "medium", label: "Medium" },
                    { value: "hard", label: "Hard" }
                ]} selected={difficulty} setSelected={setDifficulty} />
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