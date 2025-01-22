import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import {
  fetchGetBookInCartChecked,
  fetchGetCartToolkit,
} from "../../redux/slides/cartSlice";
import { fetchCreateOrderToolkit } from "../../redux/slides/orderSlice";
import { fetchGetProfileUserToolkit } from "../../redux/slides/profileUserSlice";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(1);
  const [methodPayment, setMethodPayment] = useState("Giao hàng trực tiếp");
  const navigate = useNavigate();

  const listBookInCartChecked = useSelector(
    (state) => state.cart.listBookInCartChecked
  );
  const address = useSelector((state) => state.user.userData.address);

  const listPriceCheckedInCart = listBookInCartChecked?.map((item) => {
    return item.books.price * item.books.quantity;
  });

  const totalPriceCheckedInCart = listPriceCheckedInCart?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const payments = [
    {
      id: 1,
      name: "Thanh toán trực tiếp",
      value: "COD",
    },
    {
      id: 2,
      name: "Thanh toán qua Paypal",
      value: "PAYPAL",
    },
  ];

  useEffect(() => {
    dispatch(fetchGetProfileUserToolkit());
    dispatch(fetchGetBookInCartChecked());
  }, [dispatch]);

  const handleOrder = () => {
    dispatch(
      fetchCreateOrderToolkit({
        listBookInCartChecked,
        address,
        methodPayment,
        totalPriceCheckedInCart,
      })
    ).then(() => {
      Swal.fire({
        title: "Thông báo!",
        text: "Đặt hàng thành công",
        icon: "success",
        confirmButtonText: "Đóng",
      });
      dispatch(fetchGetBookInCartChecked())
        .then(() => {
          dispatch(fetchGetCartToolkit());
        })
        .then(() => {
          navigate("/");
        });
    });
  };

  return (
    <div className="lg:mt-5 px-5 lg:px-10 mt-[100px]">
      <h2 className="text-2xl font-semibold mb-5">Thanh toán</h2>
      {listBookInCartChecked && listBookInCartChecked.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Cột sản phẩm */}
          <div className="lg:col-span-2 bg-white p-5 shadow-md rounded-md">
            <h3 className="text-lg font-semibold mb-3">Danh sách sản phẩm</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Sản phẩm</th>
                  <th className="text-center py-2">Số lượng</th>
                  <th className="text-right py-2">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {listBookInCartChecked?.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="flex items-center py-3">
                      <img
                        src={item.books.image}
                        alt={item.books.name}
                        className="w-14 h-14 object-cover rounded-md mr-3"
                      />
                      <div>
                        <p className="font-semibold">{item.books.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.books.price.toLocaleString()} VNĐ
                        </p>
                      </div>
                    </td>
                    <td className="text-center">x {item.books.quantity}</td>
                    <td className="text-right">
                      {(
                        +item.books.price * +item.books.quantity
                      ).toLocaleString()}{" "}
                      VNĐ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cột thanh toán */}
          <div className="bg-white p-5 shadow-md rounded-md">
            <h3 className="text-lg font-semibold mb-3">Thông tin thanh toán</h3>
            <div className="mb-3">
              <p>
                <span className="font-semibold">Địa chỉ nhận hàng:</span>{" "}
                {address || "Chưa có địa chỉ"}
              </p>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold">Hình thức thanh toán:</h4>
              {payments.map((item) => (
                <div key={item.id} className="flex items-center mt-2">
                  <input
                    type="radio"
                    checked={isChecked === item.id}
                    className="mr-2"
                    onChange={() => {
                      setIsChecked(item.id);
                      setMethodPayment(item.name);
                    }}
                    id={item.name}
                  />
                  <label htmlFor={item.name} className="text-sm">
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <p>
                <span className="font-semibold">Tạm tính:</span>{" "}
                {totalPriceCheckedInCart.toLocaleString()} VNĐ
              </p>
            </div>
            <div className="mb-3">
              <p>
                <span className="font-semibold">Tổng tiền:</span>{" "}
                {totalPriceCheckedInCart.toLocaleString()} VNĐ
              </p>
            </div>
            {isChecked === 2 ? (
              <div className="mt-3">
                <PayPalButton
                  amount={(totalPriceCheckedInCart / 24000).toFixed(2)}
                  onSuccess={(details, data) => {
                    alert(
                      "Thanh toán thành công bởi " +
                        details.payer.name.given_name
                    );
                    return fetch("/paypal-transaction-complete", {
                      method: "post",
                      body: JSON.stringify({ orderID: data.orderID }),
                    });
                  }}
                />
              </div>
            ) : (
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-md mt-3 hover:bg-blue-700"
                onClick={handleOrder}
              >
                Đặt hàng
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Không có sản phẩm nào trong giỏ hàng.</p>
      )}
    </div>
  );
};

export default Payment;
