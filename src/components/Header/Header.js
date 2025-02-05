import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCartToolkit } from "../../redux/slides/cartSlice";
import { fetchGetListBookToolkit } from "../../redux/slides/bookSlice";
import { fetchLogoutToolkit } from "../../redux/slides/userSlice";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../SidebarMobile/SidebarMobile";
import account from "../../assets/header-account.png";
import cart from "../../assets/header-cart.png";
import { AiOutlineHome, AiFillHome, AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [isShowSidebarMobile, setIsShowSidebarMobile] = useState(false);
  const listCart = useSelector((state) => state.cart.listCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage?.getItem("access_token");

  useEffect(() => {
    if (token) {
      dispatch(fetchGetCartToolkit());
    }
  }, [dispatch, token]);

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
    } else {
      navigate("/login");
    }
  };

  const handleDirectLogin = () => navigate("/login");

  const handleLogout = () => {
    dispatch(fetchLogoutToolkit()).then(() => {
      localStorage.clear();
      dispatch(fetchGetCartToolkit());
      navigate("/login");
    });
  };

  const handleSearch = (e) => setSearchString(e.target.value);

  const handleSubmit = () => {
    dispatch(
      fetchGetListBookToolkit({
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
          className="text-2xl font-bold text-blue-500 hidden lg:block"
        >
          Book
        </Link>
        <FontAwesomeIcon
          className="text-2xl text-blue-500 cursor-pointer block lg:hidden"
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
            className="w-[25%] h-full py-2 hidden lg:block text-white bg-blue-500 rounded-r-lg hover:bg-blue-600"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Navbar Links & Cart */}
      <div className="flex  items-center gap-3 ">
        {/* Trang Chủ */}
        {/* <Link
          to="/"
          className={`${isActive} && bg-gray-200 hidden lg:flex items-center space-x-2 text-sm font-medium text-gray-600 hover:bg-gray-200 px-[10px] py-[5px] rounded-[5px]`}
        > */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "hidden lg:flex  items-center space-x-2 text-blue-500 px-[10px] py-[5px] rounded-[5px]"
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
          <img
            src={cart}
            alt="cart"
            className="h-[24px] w-auto  object-contain"
          />
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
