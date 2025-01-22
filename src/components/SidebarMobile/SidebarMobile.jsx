import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUser,
  FaAngleDown,
  FaAngleUp,
  FaSignOutAlt,
} from "react-icons/fa"; // Thêm icon mở/đóng
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { SidebarDataUser } from "../RoleBasedSidebar/SidebarDataUser";
import { SidebarDataAdmin } from "../RoleBasedSidebar/SidebarDataAdmin";
import { jwtDecode } from "jwt-decode";
import SidebarItem from "../RoleBasedSidebar/SidebarItem";
import { fetchLogoutToolkit } from "../../redux/slides/userSlice";
import { fetchGetCartToolkit } from "../../redux/slides/cartSlice";

const SidebarMobile = ({ isShowSidebarMobile, handleCloseSidebar }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // State để điều khiển danh mục sách
  const [isManagerAccountOpen, setIsManagerAccountOpen] = useState(false); // State để điều khiển danh mục sách
  const listCategory = useSelector((state) => state.user.listCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleManagerAccount = () => {
    setIsManagerAccountOpen(!isManagerAccountOpen);
  };

  const token = localStorage.getItem("access_token");

  const roleCode = () => {
    if (token) {
      const { role_code } = jwtDecode(token);
      return role_code;
    }
    return null; // Nếu không có token thì trả về null
  };

  const handleLogout = () => {
    dispatch(fetchLogoutToolkit()).then(() => {
      localStorage.clear();
      dispatch(fetchGetCartToolkit());
      navigate("/login");
    });
  };

  const sidebarData = roleCode() === "R2" ? SidebarDataUser : SidebarDataAdmin;
  // const titleSidebar = roleCode() === "R2" ? "User Panel" : "Admin Panel";

  return (
    <div className="w-[60%] h-full bg-white shadow-lg overflow-y-auto absolute left-0 top-0 z-50">
      {/* Logo */}
      <div className="flex justify-between items-center  p-4 bg-blue-500">
        <Link to="/" className="text-2xl font-bold text-white">
          Book
        </Link>
        {isShowSidebarMobile && (
          <FontAwesomeIcon
            className="text-2xl text-white cursor-pointer"
            onClick={handleCloseSidebar}
            icon={faTimes}
          />
        )}
      </div>

      {/* Các mục bên dưới */}
      <div className="p-4 space-y-4 ">
        {/* Trang chủ */}
        <Link
          to="/"
          className=" hover:ml-[-16px] hover:mr-[-16px] hover:w-[calc(100%+32px)] hover:px-4 w-full flex items-center space-x-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100  rounded-md"
        >
          <FaHome size={20} />
          <span>Trang chủ</span>
        </Link>

        {/* Danh mục sách với tính năng mở/đóng */}
        <div
          className="flex justify-between items-center space-x-3 py-2 text-sm font-medium hover:ml-[-16px] hover:mr-[-16px] hover:w-[calc(100%+32px)] hover:px-4 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
          onClick={toggleCategory}
        >
          <div className="flex items-center gap-3">
            <FaBook size={20} />
            <span>Danh mục sách</span>
          </div>

          {isCategoryOpen ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
        </div>

        {/* Nếu danh mục sách mở, hiển thị các danh mục */}
        {isCategoryOpen && (
          <div className="pl-3  ">
            {listCategory.map((category) => (
              <NavLink
                key={category.id}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-900   pl-[64px] ml-[-48px] w-[calc(100%+64px)] font-semibold bg-gray-200 block py-3 px-4 text-sm "
                    : "text-gray-700  hover:pl-[64px] hover:ml-[-48px] hover:w-[calc(100%+64px)]      hover:text-white hover:bg-blue-600 block py-3 px-4 text-sm"
                }
                to={`/category-${category.code}`}
              >
                {category.value}
              </NavLink>
              // <Link
              //   key={category.id}
              //   to={`/category-${category.code}`}
              //   className="block py-2 text-sm hover:ml-[-48px] hover:mr-[-16px] hover:w-[calc(100%+64px)] hover:pl-[48px] hover:px-4 text-gray-600 hover:text-white hover:bg-blue-500 rounded-md"
              // >
              //   {category.value}
              // </Link>
            ))}
          </div>
        )}

        {roleCode() && (
          <div
            className="flex justify-between items-center space-x-3 py-2 text-sm font-medium hover:ml-[-16px] hover:mr-[-16px] hover:w-[calc(100%+32px)] hover:px-4 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={toggleManagerAccount}
          >
            <div className="flex items-center gap-3">
              <FaUser size={20} />
              <span>Quản lý tài khoản</span>
            </div>

            {isManagerAccountOpen && roleCode() ? (
              <FaAngleUp size={20} />
            ) : (
              <FaAngleDown size={20} />
            )}
          </div>
        )}

        {isManagerAccountOpen && roleCode() && (
          <ul>
            {sidebarData.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </ul>
        )}
        <div>
          {roleCode() ? (
            <button
              className="w-full flex items-center justify-center gap-3 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md transition-transform transform  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={20} />
              <span>Đăng xuất</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-3 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition-transform transform  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              <FaUser size={20} />
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
