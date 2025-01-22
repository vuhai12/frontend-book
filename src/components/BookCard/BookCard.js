import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ props }) => {
  const navigate = useNavigate();

  const handleViewDetail = (id) => {
    navigate(`/book-${id}`, { state: { props } });
  };

  return (
    <div
      onClick={() => handleViewDetail(props.id)}
      className="h-full cursor-pointer p-4 flex flex-col rounded-lg bg-white shadow-md hover:shadow-lg lg:hover:scale-105 transition-transform duration-200 border border-transparent hover:border-gray-200"
    >
      {/* Book Image */}
      <div className="relative h-[240px] w-full mb-4">
        <img
          src={props.image}
          alt={props.title}
          className="w-full h-full object-cover rounded-md"
        />
        {/* Sale Tag */}
        {props.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            -{props.discount}%
          </div>
        )}
      </div>

      {/* Book Information */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <p className="text-gray-800 text-sm font-medium line-clamp-2">
          {props.title}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-lg font-bold">
            {props.price.toLocaleString()}₫
          </span>
          {props.price && (
            <span className="text-gray-400 text-sm line-through">
              {(props.price + props.price * 0.5).toLocaleString()}₫
            </span>
          )}
        </div>

        {/* Rating and Sold */}
        <div className="flex gap-[10px] flex-col justify-start text-gray-500 text-xs">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < props.rating ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3l3.09 6.26L22 9.27l-4.91 4.78L18.18 21 12 17.27 5.82 21l1.09-6.95L2 9.27l6.91-1.01L12 3z"
                />
              </svg>
            ))}
          </div>
          {/* <span>Đã bán {props.available}</span> */}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
