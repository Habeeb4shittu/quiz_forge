import React from "react";

type InputProps = {
    type?: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => void;
    onKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    extraClassnames?: string;
    icon?: React.ReactNode;
};

export default function Input({
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    onKeydown,
    extraClassnames = "",
    icon,
}: InputProps) {
    return (
        <div className="relative w-full">
            {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    {icon}
                </div>
            )}

            {/* Input */}
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onKeyDown={onKeydown}
                placeholder=" " // 👈 must be just a space
                className={`peer w-full pl-10 pr-4 pt-3 pb-3 text-black border border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-indigo-500 focus:outline-0
                   bg-transparent placeholder-transparent transition-all duration-200 ${extraClassnames}`}
            />

            {/* Floating Label */}
            <label
                htmlFor={name}
                className="absolute left-10 top-3 text-gray-400 transition-all duration-200 peer-placeholder-shown:bg-inherit peer-not-placeholder-shown:bg-white peer-focus:bg-white px-1
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                   peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500
                   peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs"
            >
                {placeholder}
            </label>
        </div>
    );
}
