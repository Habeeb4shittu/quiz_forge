type InputProps = {
    type?: string;
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    icon: React.ReactNode;
};
export default function Input({
    type = "text", name, placeholder, value, onChange, icon }: InputProps) {
    return (
        <div className="relative">
            {icon}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 text-black placeholder:text-gray-300 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-transparent focus:bg-white"
            />
        </div>
    )
}