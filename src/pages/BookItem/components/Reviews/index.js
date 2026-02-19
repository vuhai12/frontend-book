import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { listReviews } from "../../../../constants/listReviews";

const ratings = {
  5: 120,
  4: 45,
  3: 10,
  2: 5,
  1: 3,
};

const totalReviews = Object.values(ratings).reduce((acc, val) => acc + val, 0);

const averageRating =
  Object.entries(ratings).reduce(
    (acc, [star, count]) => acc + star * count,
    0,
  ) / totalReviews;

const Reviews = () => {
  const [likedReviews, setLikedReviews] = useState({});

  const handleLike = (id, type) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: prev[id] === type ? null : type,
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* TITLE */}
      <h3 className="text-2xl font-semibold text-[#23272F]">
        Ratings & Reviews
      </h3>

      {/* SUMMARY SECTION */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT - Average */}
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                fill="#ED553B"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.897 1.415 8.297L12 18.896l-7.414 4.604 1.415-8.297-6.001-5.897 8.332-1.151z" />
              </svg>
            ))}

            <span className="font-semibold text-lg">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-500 text-sm">
            ({totalReviews} reviews)
          </span>
        </div>

        {/* MIDDLE - Bars */}
        <div className="flex-1 flex flex-col gap-3">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratings[star] || 0;
            const percent = (count / totalReviews) * 100;

            return (
              <div key={star} className="flex items-center gap-3">
                <span className="w-12 text-sm flex items-center gap-1">
                  {star}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ED553B"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.897 1.415 8.297L12 18.896l-7.414 4.604 1.415-8.297-6.001-5.897 8.332-1.151z" />
                  </svg>
                </span>

                <div className="flex-1 bg-gray-200 h-2 rounded">
                  <div
                    className="bg-[#ED553B] h-2 rounded transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <span className="text-sm text-gray-600 w-8 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* RIGHT - Recommendation */}
        <div className="flex justify-center lg:justify-start">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center relative"
            style={{
              background: `conic-gradient(#ED553B ${
                averageRating * 20 * 3.6
              }deg, #E5E7EB 0deg)`,
            }}
          >
            <div className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center text-lg font-semibold">
              {Math.round((averageRating / 5) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* REVIEW LIST */}
      <div>
        <h5 className="text-xl font-semibold mb-6">Reviews List</h5>

        <div className="flex flex-col gap-6">
          {listReviews.map((item, index) => {
            const active = likedReviews[index];

            return (
              <div
                key={index}
                className="border-b border-dashed border-gray-300 pb-6"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-base font-semibold">{item.comment}</p>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4">
                  <p className="text-sm font-semibold">{item.nameReviewer}</p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(index, "like")}
                      className={`px-4 py-2 rounded-md border transition ${
                        active === "like"
                          ? "bg-green-100 border-green-400 text-green-600"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <ThumbsUp size={18} />
                    </button>

                    <button
                      onClick={() => handleLike(index, "dislike")}
                      className={`px-4 py-2 rounded-md border transition ${
                        active === "dislike"
                          ? "bg-red-100 border-red-400 text-red-600"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <ThumbsDown size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
