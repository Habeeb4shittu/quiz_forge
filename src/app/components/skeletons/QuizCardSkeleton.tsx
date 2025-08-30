export default function QuizCardSkeleton() {
    return (
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 p-4 rounded-lg shadow-md animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-3 bg-gray-300 rounded w-1/2" />
                    <div className="flex gap-2 mt-2">
                        <div className="h-3 w-12 bg-gray-300 rounded" />
                        <div className="h-3 w-16 bg-gray-300 rounded" />
                        <div className="h-3 w-10 bg-gray-300 rounded" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <div className="h-5 w-12 bg-gray-300 rounded-full" />
                        <div className="h-5 w-10 bg-gray-300 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
