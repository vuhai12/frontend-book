import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

export const SidebarDataAdmin = [
  {
    id: 1,
    title: "Quản lý người dùng",
    path: "/system-admin-user",
    state: "user",
    icon: <AiIcons.AiFillHome />,
  },
  {
    id: 2,
    title: "Thông tin tài khoản",
    path: "/admin-info",
    state: "info",
    icon: <RxAvatar />,
  },
  {
    id: 3,
    title: "Quản lý sách",
    path: "/system-admin-book",
    state: "book",
    icon: <IoIcons.IoIosPaper />,
  },
];
