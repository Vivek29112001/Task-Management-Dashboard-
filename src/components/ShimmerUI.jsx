import React from 'react';

const ShimmerUI = () => {
    return (
        <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="animate-pulse flex items-center justify-between bg-gray-300 h-16 rounded-md px-4">
                <div className="bg-gray-400 h-6 rounded w-1/3"></div>
                <div className="bg-gray-400 h-6 rounded w-1/5"></div>
            </div>
            {/* Dashboard Skeleton */}
            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="animate-pulse bg-gray-300 h-20 rounded-md"
                    ></div>
                ))}
            </div>
            {/* Footer Skeleton */}
            <div className="animate-pulse bg-gray-300 h-10 rounded-md"></div>
        </div>
    );
};

export default ShimmerUI;