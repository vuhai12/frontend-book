import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentWithVnpay,
  fetchCreateOrderToolkit,
} from "../../redux/slides/orderSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchCheckedBooksInCart,
  fetchCart,
} from "../../redux/slides/cartSlice";
import Loading from "../../components/Loading/Loading";
import Cash from "../../assets/cash.png";
import Vnpay from "../../assets/vnpay.png";
import Momo from "../../assets/momo.jpg";

const Payment = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(1);
  const [methodPayment, setMethodPayment] = useState("Giao hàng trực tiếp");
  const navigate = useNavigate();
  const location = useLocation();
  const isLoadingCart = useSelector((state) => state.cart.isLoadingCart);

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
      icon: Cash,
      name: "Thanh toán trực tiếp",
      value: "COD",
    },
    {
      id: 2,
      icon: Vnpay,
      name: "Thanh toán qua VNpay",
      value: "VNpay",
    },
    // {
    //   id: 3,
    //   icon: Momo,
    //   name: "Thanh toán qua Momo",
    //   value: "Momo",
    // },
  ];

  useEffect(() => {
    dispatch(fetchCheckedBooksInCart());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get("vnp_ResponseCode");

    if (responseCode) {
      if (responseCode === "00") {
        dispatch(
          fetchCreateOrderToolkit({
            listBookInCartChecked,
            address,
            methodPayment: "Thanh toán bằng Vnpay",
            totalPriceCheckedInCart,
            isPaid: true,
          })
        ).then(() => {
          Swal.fire({
            title: "Thông báo!",
            text: "Đặt hàng thành công",
            icon: "success",
            confirmButtonText: "Đóng",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(fetchCheckedBooksInCart())
                .then(() => {
                  dispatch(fetchCart());
                })
                .then(() => {
                  navigate("/");
                });
            }
          });
        });
        // alert("Thanh toán thành công!");
      } else {
        Swal.fire({
          title: "Thông báo!",
          text: "Đặt hàng thất bại",
          icon: "error",
          confirmButtonText: "Đóng",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }

      // Sau 3s, điều hướng về trang chủ
      // setTimeout(() => navigate("/"), 3000);
    }
  }, [location.search, navigate]); // Chỉ chạy khi URL thay đổi

  const handleOrder = () => {
    if (isChecked == 1) {
      dispatch(
        fetchCreateOrderToolkit({
          listBookInCartChecked,
          address,
          methodPayment,
          totalPriceCheckedInCart,
          isPaid: false,
        })
      ).then(() => {
        Swal.fire({
          title: "Thông báo!",
          text: "Đặt hàng thành công",
          icon: "success",
          confirmButtonText: "Đóng",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(fetchCheckedBooksInCart())
              .then(() => {
                dispatch(fetchCart());
              })
              .then(() => {
                navigate("/");
              });
          }
        });
      });
    }
    if (isChecked == 2) {
      dispatch(
        createPaymentWithVnpay({ amount: totalPriceCheckedInCart * 1000 })
      ).then((res) => {
        console.log("res", res);
      });
    }
  };

  return (
    <div className="lg:mt-5 px-5 lg:px-10 mt-[100px]">
      <h2 className="text-2xl font-semibold mb-5">Thanh toán</h2>
      {isLoadingCart ? (
        <Loading />
      ) : (
        <>
          {listBookInCartChecked && listBookInCartChecked.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-5">
              {/* Cột sản phẩm */}
              <div className="lg:col-span-2 bg-white p-5 shadow-md rounded-md">
                <h3 className="text-lg font-semibold mb-3">
                  Danh sách sản phẩm
                </h3>
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
                              {(item.books.price * 1000).toLocaleString()} VNĐ
                            </p>
                          </div>
                        </td>
                        <td className="text-center">x {item.books.quantity}</td>
                        <td className="text-right">
                          {(
                            +item.books.price *
                            +item.books.quantity *
                            1000
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
                <h3 className="text-lg font-semibold mb-3">
                  Thông tin thanh toán
                </h3>
                <div className="mb-3">
                  <p>
                    <span className="font-semibold">Địa chỉ nhận hàng:</span>{" "}
                    {address || "Chưa có địa chỉ"}
                  </p>
                </div>
                <div className="mb-3">
                  <h4 className="font-semibold">Hình thức thanh toán:</h4>
                  {payments.map((item) => (
                    <div key={item.id} className="flex items-center mt-2 gap-2">
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
                      <img src={item.icon} className="w-6 h-6" />
                      <label htmlFor={item.name} className="text-sm">
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <p>
                    <span className="font-semibold">Tạm tính:</span>{" "}
                    {(totalPriceCheckedInCart * 1000).toLocaleString()} VNĐ
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <span className="font-semibold">Tổng tiền:</span>{" "}
                    {(totalPriceCheckedInCart * 1000).toLocaleString()} VNĐ
                  </p>
                </div>

                <button
                  className="w-full bg-[#003366] text-white py-3 rounded-md mt-3 hover:bg-[#003366]"
                  onClick={handleOrder}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          ) : (
            <p>Không có sản phẩm nào trong giỏ hàng.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Payment;
