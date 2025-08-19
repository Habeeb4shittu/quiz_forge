import { Eye, EyeOff } from "lucide-react";

type InputProps = {
    type?: string;
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    showPassword?: boolean;
    setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
    icon: React.ReactNode;
};
export default function PasswordInput({ type = "password", name, placeholder, value, onChange, showPassword, setShowPassword, icon }: InputProps) {
    return (
        <div className="relative">
            {icon}
            <input
                type={showPassword ? "text" : type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-12 text-black placeholder:text-gray-300 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            />
            <button
                type="button"
                onClick={() => setShowPassword && setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
        </div>
    );
}