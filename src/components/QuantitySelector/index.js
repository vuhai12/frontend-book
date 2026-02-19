import React from "react";

const QuantitySelector = ({ value, onChange }) => {
  return (
    <div className="flex border border-[#EAECF0] rounded-[5px] w-[100px] h-[32px] select-none">
      <button
        type="button"
        onClick={() => value > 1 && onChange(value - 1)}
        className="flex-1 hover:bg-gray-100"
      >
        -
      </button>

      <div className="flex-1 border-x flex items-center justify-center">
        {value}
      </div>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex-1 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
