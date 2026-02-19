import { ThumbsUp, ThumbsDown } from "lucide-react";
import { listReviews } from "../../../../constants/listReviews";

const ratings = {
  5: 120,
  4: 45,
  3: 10,
  2: 5,
  1: 3,
};

const totalReviews = 320;
const Reviews = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-[24px] text-[#23272F] font-semibold">
        Ratings & Reviews
      </h3>
      <div className="flex md:gap-[30px] items-center md:flex-row flex-col gap-[30px]">
        <div className="flex flex-1 items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= 4.3 ? "gold" : "lightgray"}
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.897 1.415 8.297L12 18.896l-7.414 4.604 1.415-8.297-6.001-5.897 8.332-1.151z" />
            </svg>
          ))}
          <span className="font-semibold">{(4.3).toFixed(1)}</span>
          <span className="text-gray-500 text-sm">({300} reviews)</span>
        </div>
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratings[star] || 0;

            const percent = (count / totalReviews) * 100;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="w-12 text-sm">{star} ⭐</span>
                <div className="w-48 bg-gray-200 h-2 rounded">
                  <div
                    className="bg-[#ED553B] h-2 rounded"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{count}</span>
              </div>
            );
          })}
        </div>
        <div className="flex-1">
          <div
            className="w-[120px]  h-[120px] rounded-full flex items-center justify-center relative"
            style={{
              background: `conic-gradient(#ED553B ${
                10 * 3.6
              }deg, #E5E7EB 0deg)`,
            }}
          >
            <div className="absolute w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center text-[20px] font-semibold">
              {10}%
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5 className="text-[22px] font-semibold mb-[20px]">Reviews List</h5>
        {listReviews.map((item) => {
          return (
            <div className="border-b-[1px] border-dashed border-gray-400 py-[20px] flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <p className="text-[18px] font-semibold">{item.comment}</p>
                <p className="text-gray-400">{item.date}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[15px] font-semibold">{item.nameReviewer}</p>
                <div className="flex gap-[20px] items-center">
                  <div className="px-[20px] py-[10px] rounded-[5px] border-gray-300 border-[1px]">
                    <ThumbsUp size={18} />
                  </div>
                  <div className="px-[20px] py-[10px] rounded-[5px] border-gray-300 border-[1px]">
                    <ThumbsDown size={18} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
