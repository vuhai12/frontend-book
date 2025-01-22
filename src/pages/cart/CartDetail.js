import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import SelectQuantity from "../../components/SelectQuantity/SelectQuantity";
import Cart from "../../assets/pngwing.png";
import {
  fetchGetCartToolkit,
  fetchDeleteBookInCartToolkit,
  fetchCheckedBookCartToolkit,
  // fetchCheckedAllBookCartToolkit,
  fetchDeleteAllBookCartToolkit,
  fetchIncrementQuantityBookInCart,
  fetchDecrementQuantityBookInCart,
} from "../../redux/slides/cartSlice";
import { fetchGetProfileUserToolkit } from "../../redux/slides/profileUserSlice";
import { fetchGetUserByIdToolkit } from "../../redux/slides/userSlice";
import Modal from "react-bootstrap/Modal";
// import OrderSuccessPopup from "../../components/OrderSuccessPopup/OrderSuccessPopup";

const CartDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const listCart = useSelector((state) => state.cart.listCart);
  const address = useSelector((state) => state.user.userData.address);

  let isCheckedOrder = listCart?.some(
    (item) => item.books.cartBooks.isChecked === 1
  );
  // let isCheckedAll = listCart?.every(
  //   (item) => item.books.cartBooks.isChecked === 1
  // );
  // let listCartBookId = listCart?.map((item) => item.books.id);

  const [showPopup, setShowPopup] = useState(false); // Để kiểm tra xem modal có hiển thị không

  useEffect(() => {
    dispatch(fetchGetProfileUserToolkit());
    dispatch(fetchGetCartToolkit());
    dispatch(fetchGetUserByIdToolkit());
  }, []);

  const handleChangeQuantity = useCallback((item, flag) => {
    if (flag === "minus" && item.books.quantity === 1) return;
    if (flag === "plus" && item.books.quantity > item.books.available) return;
    if (flag === "minus") {
      dispatch(
        fetchDecrementQuantityBookInCart({
          bookId: item.books.id,
          quantity: item.books.quantity - 1,
        })
      ).then(() => {
        dispatch(fetchGetCartToolkit());
      });
    }
    if (flag === "plus") {
      dispatch(
        fetchIncrementQuantityBookInCart({
          bookId: item.books.id,
          quantity: item.books.quantity + 1,
        })
      ).then(() => {
        dispatch(fetchGetCartToolkit());
      });
    }
  }, []);

  const handleCheckBox = (itemBook) => {
    dispatch(
      fetchCheckedBookCartToolkit({
        cartBookId: itemBook.books.id,
        isChecked: !itemBook.books.cartBooks.isChecked,
      })
    ).then(() => {
      dispatch(fetchGetCartToolkit());
    });
  };

  // const handleSelectAll = () => {
  //   dispatch(
  //     fetchCheckedAllBookCartToolkit({
  //       isChecked: !isCheckedAll,
  //       listCartBookId,
  //     })
  //   ).then(() => {
  //     dispatch(fetchGetCartToolkit());
  //   });
  // };

  const handleOrder = () => {
    if (!isCheckedOrder) {
      Swal.fire({
        title: "Thông báo!",
        text: "Bạn chưa chọn sản phẩm",
        icon: "warning",
        confirmButtonText: "Đóng",
      });
    } else if (!address) {
      Swal.fire({
        title: "Thông báo!",
        text: "Bạn chưa điền địa chỉ giao hàng",
        icon: "warning",
        confirmButtonText: "Đóng",
      });
    } else {
      navigate("/checkout-payment"); // Chuyển trang nếu mọi thứ ổn
    }
  };

  const handleClosePopup = () => setShowPopup(false); // Đóng popup

  const handleDeleteItemChecked = (item) => {
    if (item.books.cartBooks.isChecked === 1) {
      dispatch(fetchDeleteBookInCartToolkit(item.books.id)).then((result) => {
        Swal.fire({
          title: "Thông báo!",
          text: "Bạn đã xóa sản phẩm",
          icon: "success",
          confirmButtonText: "Đóng",
        });
        if (result.payload.error === 0) {
          dispatch(fetchGetCartToolkit());
        }
      });
    } else {
      Swal.fire({
        title: "Thông báo!",
        text: "Bạn chưa chọn sản phẩm để xóa",
        icon: "warning",
        confirmButtonText: "Đóng",
      });
    }
  };

  // const handleDeleteAllItemChecked = () => {
  //   if (isCheckedOrder) {
  //     dispatch(fetchDeleteAllBookCartToolkit()).then((result) => {
  //       alert("Bạn có muốn xóa tất cả sản phẩm?");
  //       if (result.payload.error === 0) {
  //         dispatch(fetchGetCartToolkit());
  //       }
  //     });
  //   } else {
  //     alert("Chưa chọn sản phẩm để xóa");
  //   }
  // };

  const handleEditAddress = () => {
    if (token) {
      navigate("/user-info");
    }
  };

  return (
    <div className="container mx-auto lg:mt-1 mt-[100px]">
      <h3 className="text-xl font-semibold text-gray-800">Giỏ hàng của bạn</h3>

      {listCart?.length > 0 ? (
        <div className="grid grid-cols-12 gap-4 mt-6">
          {/* Table Section */}
          <div className="col-span-12 md:col-span-8 border rounded-lg bg-white shadow-md p-4">
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-sm font-semibold text-gray-600">
                    <th className="p-3 border">Chọn</th>
                    <th className="p-3 border">Sản phẩm</th>
                    <th className="p-3 border">Đơn giá</th>
                    <th className="p-3 border">Số lượng</th>
                    <th className="p-3 border">Thành tiền</th>
                    <th className="p-3 border">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {listCart.map((item, idx) => (
                    <tr key={idx} className="text-sm text-gray-700">
                      <td className="p-3 border text-center">
                        <input
                          type="checkbox"
                          checked={item.books.cartBooks.isChecked}
                          onChange={() => handleCheckBox(item)}
                        />
                      </td>
                      <td className="p-3 border text-left flex items-center">
                        <img
                          src={item.books.image}
                          alt="product"
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        {item.books.name}
                      </td>
                      <td className="p-3 border text-center">
                        {item.books.price.toLocaleString()} đ
                      </td>
                      <td className="p-3 border text-center">
                        <SelectQuantity
                          quantity={item.books.quantity}
                          handleChangeQuantity={(flag) =>
                            handleChangeQuantity(item, flag)
                          }
                        />
                      </td>
                      <td className="p-3 border text-center">
                        {(
                          item.books.price * item.books.quantity
                        ).toLocaleString()}{" "}
                        đ
                      </td>
                      <td className="p-3 border text-center">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteItemChecked(item)}
                        >
                          <GoTrash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-span-12 md:col-span-4 border rounded-lg bg-white shadow-md p-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Tóm tắt đơn hàng
            </h4>
            <p className="text-gray-600 mt-2">
              Giao tới: {address ? address : "Chưa có địa chỉ"}
            </p>
            <button
              className="text-blue-600 mt-2 underline"
              onClick={handleEditAddress}
            >
              Chỉnh sửa địa chỉ
            </button>
            <button
              className="bg-red-500 text-white w-full py-2 mt-4 rounded-md hover:bg-red-600"
              onClick={handleOrder}
            >
              Mua hàng
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5 flex flex-col items-center justify-center">
          <img src={Cart} alt="Empty cart" className="w-32 h-32 object-cover" />
          <h4 className="text-xl font-semibold text-gray-700 mt-2">
            Giỏ hàng của bạn hiện tại trống
          </h4>
          <p className="text-gray-600 mt-2">
            Hãy thêm một vài sản phẩm vào giỏ hàng để bắt đầu mua sắm.
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-6 mt-6 rounded-md hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            Mua sắm ngay
          </button>
        </div>
      )}

      {/* Modal (Popup) */}
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Body>
          <p className="text-center text-lg text-red-500">
            Bạn chưa chọn sản phẩm hoặc chưa điền đầy đủ thông tin địa chỉ!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="w-full bg-gray-500 text-white py-2 rounded-md"
            onClick={handleClosePopup}
          >
            Đóng
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartDetail;
