import React from "react";
import * as FaIcons from "react-icons/fa";

export const SidebarDataUser = [
  {
    id: 1,
    title: "Thông tin tài khoản",
    path: "/user-info",
    icon: <FaIcons.FaUserCircle />,
  },
  {
    id: 2,
    title: "Quản lý đơn hàng",
    path: "/user-order",
    icon: <FaIcons.FaClipboardList />,
  },
];
