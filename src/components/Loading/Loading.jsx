import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full  bg-gray-100 dark:bg-gray-500">
      <div className="space-y-3 w-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="h-3 bg-gray-300 rounded-full dark:bg-gray-500 animate-pulse"
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
