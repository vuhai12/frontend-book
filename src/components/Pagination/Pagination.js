import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageCount = Math.ceil(totalPosts / postsPerPage);
  const maxVisiblePages = 5; // Số lượng nút hiển thị tối đa
  const pages = [];

  // Tính toán các nút phân trang hiển thị
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      pageCount - maxVisiblePages + 1
    )
  );
  const endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pageCount) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination flex justify-center items-center space-x-2 mt-4">
      {/* Nút "Prev" */}
      <button
        className={`px-4 py-2 rounded-md text-sm font-semibold ${
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        Prev
      </button>

      {/* Hiển thị nút đầu tiên */}
      {startPage > 1 && (
        <>
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              currentPage === 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-100"
            }`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          {startPage > 2 && (
            <span className="w-8 h-8 flex items-center justify-center">
              ...
            </span>
          )}
        </>
      )}

      {/* Hiển thị các nút giữa */}
      {pages.map((page) => (
        <button
          key={page}
          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-blue-100"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      {/* Hiển thị nút cuối cùng */}
      {endPage < pageCount && (
        <>
          {endPage < pageCount - 1 && (
            <span className="w-8 h-8 flex items-center justify-center">
              ...
            </span>
          )}
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              currentPage === pageCount
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-100"
            }`}
            onClick={() => setCurrentPage(pageCount)}
          >
            {pageCount}
          </button>
        </>
      )}

      {/* Nút "Next" */}
      <button
        className={`px-4 py-2 rounded-md text-sm font-semibold ${
          currentPage === pageCount
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        disabled={currentPage === pageCount}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
