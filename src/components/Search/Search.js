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
    <input
      className="border-[1px] border-solid border-gray-500 rounded-[5px] p-[5px] my-[10px]"
      value={keyWord}
      placeholder="Search"
      onChange={(e) => handleOnchangeSearch(e)}
    />
  );
};

export default Search;
