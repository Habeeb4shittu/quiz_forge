export default function QuizFormSkeleton() {
    return (
        <div className="mt-6 space-y-4 animate-pulse">
            <div className="h-10 bg-gray-200 rounded-md" /> {/* Quiz Title */}
            <div className="h-10 bg-gray-200 rounded-md" /> {/* Quiz Description */}
            <div className="h-10 bg-gray-200 rounded-md" /> {/* Category Dropdown */}
            <div className="h-10 bg-gray-200 rounded-md" /> {/* Difficulty Dropdown */}
            <div className="h-10 bg-gray-200 rounded-md" /> {/* Time Limit */}
            <div className="h-10 bg-gray-200 rounded-md" /> {/* Number of Questions */}

            <div className="h-10 bg-gray-200 rounded-md" /> {/* Tag Input */}
            <div className="h-10 bg-gray-200 rounded-md" /> {/* Icon Picker */}

            <div className="flex items-center gap-3">
                <div className="w-10 h-5 bg-gray-200 rounded-full" /> {/* Switch */}
                <div className="h-4 w-24 bg-gray-200 rounded" /> {/* Label */}
            </div>

            <div className="h-10 bg-gray-300 rounded-md w-32" /> {/* Submit button */}
        </div>
    );
}
