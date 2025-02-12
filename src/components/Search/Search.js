import React, { useEffect, useState } from "react";

const Search = ({ onKeySearch }) => {
  const [keyWord, setKeyWord] = useState("");
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onKeySearch(keyWord);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyWord]);

  const handleOnchangeSearch = (e) => {
    setKeyWord(e.target.value);
  };
  return (
    <div className="relative w-[50%] max-w-md">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        onChange={(e) => handleOnchangeSearch(e)}
        className="w-full p-3 pl-10 text-gray-700 bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011 18.5 7.5 7.5 0 0016.65 16.65z"
        />
      </svg>
    </div>
    // <input
    //   className="border-[1px] border-solid border-gray-500 rounded-[5px] p-[5px] my-[10px]"
    //   value={keyWord}
    //   placeholder="Search"
    //   onChange={(e) => handleOnchangeSearch(e)}
    // />
  );
};

export default Search;
