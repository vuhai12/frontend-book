import React, { useState } from "react";

const QuantitySelector = ({ value }) => {
  const [quantity, setQuantity] = useState(value);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(() => quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(() => quantity + 1);
  };
  return (
    <div className="flex border border-[#EAECF0] rounded-[5px] w-[100px] h-[32px] select-none">
      <button
        type="button"
        onClick={handleDecrease}
        className="flex-1 hover:bg-gray-100"
      >
        -
      </button>

      <div className="flex-1 border-x flex items-center justify-center">
        {quantity}
      </div>

      <button
        type="button"
        onClick={handleIncrease}
        className="flex-1 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
