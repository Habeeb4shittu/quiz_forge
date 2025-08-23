import { useState, useRef, useEffect } from "react";
import { quizIcons } from "@/lib/quizIcons";

interface IconPickerProps {
    selected: string | null;
    setSelected: (icon: string) => void;
}

export default function IconPicker({ selected, setSelected }: IconPickerProps) {
    const [open, setOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement | null>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (iconName: string) => {
        setSelected(iconName);
        setOpen(false);
    };

    const SelectedIcon = selected
        ? quizIcons.find((ic) => ic.name === selected)?.icon
        : null;

    return (
        <div className="relative inline-block" ref={pickerRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 w-56 px-3 py-2 border rounded-lg bg-white hover:bg-gray-100"
            >
                {SelectedIcon ? (
                    <SelectedIcon className="w-5 h-5" />
                ) : (
                    <span className="text-gray-400">Pick Icon</span>
                )}
            </button>

            {open && (
                <div className="absolute mt-2 w-56 bg-white border rounded-lg shadow-lg p-2 z-50">
                    <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto">
                        {quizIcons.map(({ name, icon: Icon }) => (
                            <div
                                key={name}
                                className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition ${selected === name ? "bg-indigo-100 border border-indigo-500" : "hover:bg-gray-100"
                                    }`}
                                onClick={() => handleSelect(name)}
                            >
                                <Icon className="w-12 h-5 text-gray-700 text-5xl" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
