import React, { useState, KeyboardEvent } from "react";
import { TagsIcon, X } from "lucide-react"; // for the close icon

type TagInputProps = {
    name: string;
    placeholder: string;
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TagInput({
    name,
    placeholder,
    tags,
    setTags,
}: TagInputProps) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInputValue("");
        }
        if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
            e.preventDefault();
            const lastTag = tags[tags.length - 1];
            setTags(tags.slice(0, -1));
            setInputValue(lastTag); // bring back the tag for editing
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="relative w-full flex flex-wrap items-center border border-gray-300 rounded-lg p-3    focus-within:ring-2 focus-within:ring-indigo-500">
            {/* Tags */}
            <TagsIcon className="text-gray-400 mr-2" />
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="flex items-center bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md mr-2 mb-1"
                >
                    {tag}
                    <button
                        type="button"
                        className="ml-1 text-indigo-500 hover:text-indigo-700"
                        onClick={() => removeTag(tag)}
                    >
                        <X size={14} />
                    </button>
                </span>
            ))}

            {/* Input */}
            <input
                id={name}
                name={name}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? placeholder : ""}
                className="flex-1 min-w-[120px] bg-transparent outline-none text-black placeholder-gray-400"
            />
        </div>
    );
}
