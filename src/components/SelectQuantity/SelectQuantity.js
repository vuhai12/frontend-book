import React, { memo } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

const SelectQuantity = ({ handleChangeQuantity, quantity }) => {
  return (
    <div className="flex items-center space-x-3 sm:my-2">
      {/* Nút giảm số lượng */}
      <button
        onClick={() => handleChangeQuantity("minus")}
        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md 
                   text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <FiMinus size={18} />
      </button>

      {/* Hiển thị số lượng */}
      <div
        className="flex items-center justify-center w-12 h-10 border border-gray-300 rounded-md 
                   bg-gray-50 text-gray-800 font-medium text-lg select-none"
      >
        {quantity}
      </div>

      {/* Nút tăng số lượng */}
      <button
        onClick={() => handleChangeQuantity("plus")}
        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md 
                   text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <FaPlus size={18} />
      </button>
    </div>
  );
};

export default memo(SelectQuantity);
