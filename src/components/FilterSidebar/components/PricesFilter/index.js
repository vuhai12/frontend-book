import React from "react";

const PricesFilter = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex gap-[10px] mt-[20px] items-center">
        <div className="flex items-center gap-[10px] flex-1 ">
          <p className="w-fit">$</p>
          <input
            type="number"
            className="border-gray-400 w-full outline-none p-[10px]"
          />
        </div>
        <p className="  w-fit">to</p>
        <div className="flex items-center gap-[10px] flex-1 ">
          <p className="">$</p>
          <input
            type="number"
            className="border-gray-400 w-full outline-none p-[10px]"
          />
        </div>
      </div>

      <button className="bg-[#393280] w-full  py-[10px] px-[20px] text-white">
        Filter
      </button>
    </div>
  );
};

export default PricesFilter;
