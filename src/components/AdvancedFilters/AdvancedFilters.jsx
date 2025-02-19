// import { useState } from "react";
// import { Slider } from "@mui/material";

const AdvancedFilters = () => {
  // const [price, setPrice] = useState([0, 200]);
  // const [rating, setRating] = useState(0);
  // const [format, setFormat] = useState([]);
  // const [year, setYear] = useState(2024);

  return (
    <div className=" bg-white rounded-lg shadow-md">
      <div className="border-b p-4">
        <h5 className="text-[16px] font-bold text-gray-800">Bộ lọc</h5>
      </div>
      {/* <div className="border-b p-4">
        <h3 className="text-[16px] font-bold text-gray-800 mb-3 ">Bộ lọc</h3>
      </div> */}

      {/* Price Filter */}
      {/* <div className="mb-4 p-4">
        <label className="font-medium">Giá:</label>
        <div className="w-[90%] mx-auto">
          <Slider
            value={price}
            onChange={(e, newValue) => setPrice(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={500}
          />
        </div>
        <p className="text-sm">
          {price[0]} đ - {price[1]} đ
        </p>
      </div> */}

      {/* Rating Filter */}
      {/* <div className="mb-4">
        <label className="font-medium">Đánh giá:</label>
        <select
          className="w-full p-2 border rounded mt-3"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value={0}>Tất cả</option>
          <option value={3}>3 sao trở lên</option>
          <option value={4}>4 sao trở lên</option>
          <option value={5}>5 sao</option>
        </select>
      </div> */}

      {/* Format Filter */}
      {/* <div className="mb-4">
        <label className="font-medium">Định dạng:</label>
        <div className="flex flex-col mt-3">
          {["Sách giấy", "Ebook", "Audiobook"].map((f) => (
            <label key={f} className="inline-flex items-center">
              <input
                type="checkbox"
                value={f}
                checked={format.includes(f)}
                onChange={() =>
                  setFormat((prev) =>
                    prev.includes(f)
                      ? prev.filter((i) => i !== f)
                      : [...prev, f]
                  )
                }
              />
              <span className="ml-2">{f}</span>
            </label>
          ))}
        </div>
      </div> */}

      {/* Year Filter */}
      {/* <div>
        <label className="font-medium">Năm xuất bản:</label>
        <select
          className="w-full p-2 border rounded mt-3"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value={2024}>Mới nhất (2024)</option>
          <option value={2020}>2020 - 2023</option>
          <option value={2019}>Trước 2020</option>
        </select>
      </div> */}
    </div>
  );
};

export default AdvancedFilters;
