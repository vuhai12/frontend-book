import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

export const SidebarDataUser = [
  {
    id: 1,
    title: "Thông tin tài khoản",
    path: "/user-info",
    icon: <IoIcons.IoIosPaper />,
  },
  {
    id: 2,
    title: "Quản lý đơn hàng",
    path: "/user-order",
    icon: <FaIcons.FaCartPlus />,
  },
];
