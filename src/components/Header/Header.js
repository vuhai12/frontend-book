import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slides/cartSlice";
import { fetchListBooksHome, searchBooks } from "../../redux/slides/bookSlice";
import {
  fetchGetListCategoryToolkit,
  fetchLogoutToolkit,
} from "../../redux/slides/userSlice";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../SidebarMobile/SidebarMobile";
import account from "../../assets/header-account.png";
import { AiOutlineHome, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useSocket } from "../../context/SocketContext";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [isShowSidebarMobile, setIsShowSidebarMobile] = useState(false);
  const listCart = useSelector((state) => state.cart.listCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage?.getItem("access_token");
  const socket = useSocket();

  useEffect(() => {
    dispatch(fetchGetListCategoryToolkit());
    if (roleCode() == "R2") {
      dispatch(fetchCart());
    }
  }, []);

  const roleCode = () => {
    if (token) {
      const { role_code } = jwtDecode(token);
      return role_code;
    }
  };

  const handleCart = () => {
    if (token) {
      if (roleCode() == "R2") {
        navigate("/cart");
      }
      if (roleCode() == "R1") {
        Swal.fire({
          title: "Thông báo!",
          text: "Tài khoản Admin không truy cập được giỏ hàng",
          icon: "success",
          confirmButtonText: "Đóng",
        });
      }
    } else {
      navigate("/login");
    }
  };

  const handleDirectLogin = () => navigate("/login");

  const handleLogout = () => {
    dispatch(fetchLogoutToolkit()).then(() => {
      localStorage.clear();
      dispatch(fetchCart());
      socket.disconnect();
      navigate("/login");
    });
  };

  const handleSearch = (e) => setSearchString(e.target.value);

  const handleSubmit = () => {
    // console.log("pageCurent", pageCurent);
    console.log("searchString", searchString);
    dispatch(
      fetchListBooksHome({
        limitListBook: process.env.REACT_APP_LIMIT_LIST_BOOK,
        pageCurent: 1,
        searchString,
      })
    ).then(() => {
      navigate("/");
    });
  };

  const handleInfo = () => {
    if (token) {
      const { role_code } = jwtDecode(token);
      role_code === "R2" ? navigate("/user-info") : navigate("/admin-info");
    } else {
      navigate("/login");
    }
  };

  const handleCloseSidebar = () => {
    setIsShowSidebarMobile(false);
  };

  const handleOpenSideBarMobile = () => {
    setIsShowSidebarMobile(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <nav className="flex items-center justify-between w-full gap-[10px] ">
      {/* Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-[#003366] hidden lg:block"
        >
          BookEng
        </Link>
        <FontAwesomeIcon
          className="text-2xl text-[#003366] cursor-pointer block lg:hidden"
          onClick={handleOpenSideBarMobile}
          icon={faBars}
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-lg mx-auto h-[38.5px]">
        <div className="flex items-center w-full bg-gray-100 rounded-lg shadow-md h-full">
          <AiOutlineSearch className="mx-3 text-gray-500" size={20} />
          <input
            type="text"
            onKeyDown={handleKeyDown}
            value={searchString}
            onChange={handleSearch}
            placeholder="Bạn tìm gì hôm nay?"
            className="flex-grow px-2 w-full py-2 text-gray-700 bg-transparent outline-none"
          />
          <button
            onClick={handleSubmit}
            className="w-[25%] h-full py-2 hidden lg:block text-white bg-[#003366] rounded-r-lg hover:[#003366]"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Navbar Links & Cart */}
      <div className="flex  items-center gap-3 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "hidden lg:flex  items-center space-x-2 text-[#003366] px-[10px] py-[5px] rounded-[5px]"
              : "hidden lg:flex  items-center text-[12px] space-x-2 text-gray-500 hover:bg-gray-200 px-[10px] py-[5px] rounded-[5px]"
          }
        >
          {/* Dùng isActive để render icon phù hợp */}
          {({ isActive }) => (
            <>
              {isActive ? (
                <AiFillHome className="text-2xl" />
              ) : (
                <AiOutlineHome className="text-2xl" />
              )}
              <span className={`${isActive ? "text-sm font-bold" : "text-sm"}`}>
                Trang chủ
              </span>
            </>
          )}
        </NavLink>

        {/* Tài Khoản */}
        <div
          className="hidden lg:flex text-gray-500 text-[14px] relative hover:bg-gray-200 px-[10px] py-[5px] rounded-[5px] items-center space-x-2 cursor-pointer"
          onMouseEnter={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
        >
          <img
            src={account}
            alt="account"
            className="h-[24px] w-auto sm:h-[24px] md:h-24 lg:h-[24px] object-contain"
          />
          <span>Tài khoản</span>
          {dropdown && (
            <div className="absolute top-full right-0 w-48 py-2  bg-white border border-gray-300 shadow-xl rounded-lg transform transition-all duration-200 opacity-100 z-10">
              {!token ? (
                <p
                  onClick={handleDirectLogin}
                  className="w-full py-2 text-sm text-left text-gray-500 hover:bg-gray-100 rounded-md"
                >
                  <span className="px-2">Đăng nhập</span>
                </p>
              ) : (
                <>
                  <p
                    onClick={handleInfo}
                    className="w-full py-2 text-sm text-left text-gray-500 hover:bg-gray-100 "
                  >
                    <span className="px-2">Thông tin tài khoản</span>
                  </p>

                  <p
                    onClick={handleLogout}
                    className="w-full py-2 text-sm text-left text-gray-500 hover:bg-gray-100 "
                  >
                    <span className="px-2">Đăng xuất</span>
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="cursor-pointer relative" onClick={handleCart}>
          {/* <img
            src={cart}
            alt="cart"
            className="h-[24px] w-auto  object-contain"
          /> */}
          <FaShoppingCart size={24} color="#003366" />
          {listCart?.length > 0 && roleCode() && (
            <div className="absolute top-[-8px] right-[-8px] flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
              {listCart.length}
            </div>
          )}
        </div>
      </div>
      {isShowSidebarMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleCloseSidebar}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[60%] bg-slate-600"
          >
            <SidebarMobile
              isShowSidebarMobile={isShowSidebarMobile}
              handleCloseSidebar={handleCloseSidebar}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
