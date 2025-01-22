import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchAddCartToolkit,
  fetchGetCartToolkit,
} from "../../redux/slides/cartSlice";
import SelectQuantity from "../../components/SelectQuantity/SelectQuantity";
import { jwtDecode } from "jwt-decode";

const BookDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu không có dữ liệu trong location.state, chuyển hướng về trang chính
    if (!location.state || !location.state.props) {
      navigate("/");
    }
  }, [location, navigate]);

  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("access_token");

  const handleChangeQuantity = useCallback((flag) => {
    setQuantity((prev) =>
      flag === "minus" && prev > 1
        ? prev - 1
        : flag === "plus"
        ? prev + 1
        : prev
    );
  }, []);

  // Đảm bảo giá trị mặc định nếu location.state không tồn tại
  const {
    title = "",
    description = "",
    price = 0,
    originalPrice = 0,
    image = "",
  } = location.state?.props || {};

  const handleAction = (redirectToCart = false) => {
    if (!token) return navigate("/login");

    const { role_code } = jwtDecode(token);
    if (role_code !== "R2") return navigate("/login");

    const payload = {
      image: location.state.props.image,
      bid: String(location.state.props.id),
      quantity,
      totalPrices: +location.state.props.price * +quantity,
      isChecked: "0",
    };

    dispatch(fetchAddCartToolkit(payload)).then(() => {
      dispatch(fetchGetCartToolkit()).then(() => {
        if (redirectToCart) navigate("/book-cart");
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto lg:mt-0 mt-[100px]">
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white rounded-lg shadow-lg overflow-hidden"> */}
      <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Phần 1: Ảnh sách */}
        <div className="bg-gray-100 p-6 flex flex-1 justify-center items-center">
          <img
            src={image}
            alt={title}
            className="object-contain w-full max-h-96 rounded-lg"
          />
        </div>

        {/* Phần 2: Chi tiết sách */}
        <div className="lg:p-8 px-8 border-l border-gray-200 flex-1">
          <h3 className="text-3xl font-bold text-gray-800">{title}</h3>
          <p className="mt-4 text-gray-500 line-clamp-5">{description}</p>

          <div className="mt-6 flex items-center gap-4">
            <h4 className="text-xl font-semibold text-red-600">
              {price.toLocaleString()} VNĐ
            </h4>
            {console.log("price", typeof price)}
            {price && (
              <p className="text-lg line-through text-gray-500">
                {(price + price * 0.5).toLocaleString()} VNĐ
              </p>
            )}
          </div>
        </div>

        {/* Phần 3: Tùy chọn và hành động */}
        <div className="lg:p-8 px-8 pb-8 flex flex-col justify-start gap-6 flex-1">
          {/* Số lượng */}
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-2">Số lượng</p>
            <SelectQuantity
              quantity={quantity}
              handleChangeQuantity={handleChangeQuantity}
            />
          </div>

          {/* Nút hành động */}
          <div className="flex flex-col justify-between gap-4">
            <button
              onClick={() => handleAction(false)}
              className="py-2 px-6 w-full flex-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Thêm giỏ hàng
            </button>
            <button
              onClick={() => handleAction(true)}
              className="py-2 px-6 flex-1 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
