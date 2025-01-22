import React from "react";

const PopupShowOrderDetail = ({ handleClosePopup, listBooks }) => {
  const calculateTotal = (price, quantity) => price * quantity;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 lg:mx-0 ">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleClosePopup}
      >
        <div
          className="bg-white p-8 rounded-lg w-120 min-h-[500px] max-h-[80vh] relative overflow-y-auto mx-[20px] lg:mx-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClosePopup}
            className="absolute top-2 right-2 text-xl font-bold text-gray-600"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Chi tiết đơn hàng
          </h2>

          {/* Bảng hiển thị chi tiết đơn hàng */}
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">
                  Hình ảnh
                </th>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">
                  Tên sách
                </th>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">
                  Đơn giá
                </th>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">
                  Số lượng
                </th>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {listBooks && listBooks.length > 0 ? (
                listBooks.map((book, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">{book.title}</td>
                    <td className="px-4 py-2 border-b">
                      {book.price.toFixed(2)} VNĐ
                    </td>
                    <td className="px-4 py-2 border-b">{book.quantity}</td>
                    <td className="px-4 py-2 border-b">
                      {calculateTotal(book.price, book.quantity).toFixed(2)} VNĐ
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 border-b text-center text-gray-500"
                  >
                    Không có sách trong đơn hàng.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopupShowOrderDetail;
