import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetOrderByIdToolkit } from "../../../redux/slides/orderSlice";
import PopupShowOrderDetail from "../../../components/PopupShowOrderDetail/PopupShowOrderDetail";
import { formatDateTime } from "../../../ultils/formatDateTime";

const UserOrder = () => {
  const orderById = useSelector((state) => state.order.listOrderById);
  const dispatch = useDispatch();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [listBooks, setListBooks] = useState([]);

  useEffect(() => {
    dispatch(fetchGetOrderByIdToolkit());
  }, []);

  console.log("orderById", orderById);

  const handleOpenPopup = (books) => {
    setIsShowPopup(true);
    setListBooks(books);
  };
  const handleClosePopup = () => {
    setIsShowPopup(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Danh sách đơn hàng
      </h2>
      {orderById && orderById.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 text-left">STT</th>
                <th className="px-4 py-2 text-left">Phương thức thanh toán</th>
                <th className="px-4 py-2 text-left">Số lượng</th>
                <th className="px-4 py-2 text-left">Thanh toán</th>
                <th className="px-4 py-2 text-left">Giao hàng</th>
                <th className="px-4 py-2 text-left">Tổng giá</th>
                <th className="px-4 py-2 text-left">Ngày mua</th>
                <th className="px-4 py-2 text-left">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orderById.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{item.paymentMethod}</td>
                  <td className="px-4 py-2">{+item.books.length}</td>
                  <td
                    className={`px-4 py-2 ${
                      item.isPaid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      item.isDelivered ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}
                  </td>
                  <td className="px-4 py-2">
                    {item.totalPrices.toLocaleString()} VND
                  </td>
                  <td className="px-4 py-2">
                    {formatDateTime(item.createdAt)}
                  </td>
                  <td className="px-4 py-2">
                    <a
                      className="cursor-pointer text-blue-600"
                      onClick={() => handleOpenPopup(item.books)}
                    >
                      Xem
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          Bạn chưa có đơn hàng nào.
        </p>
      )}
      {isShowPopup && (
        <PopupShowOrderDetail
          handleClosePopup={handleClosePopup}
          listBooks={listBooks}
        />
      )}
    </div>
  );
};

export default UserOrder;
