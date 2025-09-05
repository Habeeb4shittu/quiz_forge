import { Edit } from "lucide-react";

export const TextareaInput: React.FC<{
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ name, placeholder, value, onChange }) => (
    <div className="relative group">
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={3}
            className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200/70 bg-white/90 backdrop-blur-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:bg-white focus:shadow-xl focus:shadow-violet-100/50 transition-all duration-400 hover:border-gray-300 hover:shadow-xl resize-none"
        />
        <Edit className="absolute left-4 top-5 text-gray-400 w-5 h-5 group-focus-within:text-violet-500 transition-colors duration-300" />
    </div>
);