import { useCallback, useEffect, useState } from "react";

import SelectQuantity from "../../components/SelectQuantity/SelectQuantity";

const BookDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = useCallback((flag) => {
    setQuantity((prev) =>
      flag === "minus" && prev > 1
        ? prev - 1
        : flag === "plus"
          ? prev + 1
          : prev,
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto lg:mt-0 mt-[100px]">
      <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Phần 1: Ảnh sách */}
        <div className="bg-gray-100 p-6 flex flex-1 justify-center items-center">
          <img
            src={image}
            alt={title}
            className="object-contain w-full max-h-96 rounded-lg"
          />
        </div>

        {/* Phần 2: Chi tiết sách */}
        <div className="lg:p-8 px-8 border-l border-gray-200 flex-1">
          <h3 className="text-3xl font-bold text-gray-800">{title}</h3>
          <p className="mt-4 text-gray-500 line-clamp-5">{description}</p>

          <div className="mt-6 flex items-center gap-4">
            <h4 className="text-xl font-semibold text-red-600">
              {(price * 1000).toLocaleString()} VNĐ
            </h4>
            {price && (
              <p className="text-lg line-through text-gray-500">
                {((price + price * 0.5) * 1000).toLocaleString()} VNĐ
              </p>
            )}
          </div>
        </div>

        {/* Phần 3: Tùy chọn và hành động */}
        <div className="lg:p-8 px-8 pb-8 flex flex-col justify-start gap-6 flex-1">
          {/* Số lượng */}
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-2">Số lượng</p>
            <SelectQuantity
              quantity={quantity}
              handleChangeQuantity={handleChangeQuantity}
            />
          </div>

          {/* Nút hành động */}
          <div className="flex flex-col justify-between gap-4">
            <button
              onClick={() => handleActionAddToCart(false)}
              className="py-2 px-6 w-full flex-1 text-white bg-[#003366] rounded-md hover:bg-[#1d456c] focus:outline-none focus:ring-2 focus:ring-[#1d4975] transition-all"
            >
              Thêm giỏ hàng
            </button>
            <button
              onClick={() => handleActionAddToCart(true)}
              className="py-2 px-6 flex-1 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
