// Skeleton Loader Components

export const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
);

export const SkeletonText = ({ lines = 3 }) => (
    <div className="space-y-2 animate-pulse">
        {[...Array(lines)].map((_, i) => (
            <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                style={{ width: `${100 - i * 10}%` }}
            ></div>
        ))}
    </div>
);

export const SkeletonAvatar = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    return (
        <div className={`${sizeClasses[size]} rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse`}></div>
    );
};

export const SkeletonButton = () => (
    <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
);

export const SkeletonTable = ({ rows = 5 }) => (
    <div className="space-y-3 animate-pulse">
        {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex gap-4">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
        ))}
    </div>
);

export const SkeletonDashboard = () => (
    <div className="p-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                ))}
            </div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
    </div>
);
