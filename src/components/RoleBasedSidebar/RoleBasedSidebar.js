import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { jwtDecode } from "jwt-decode";
import { SidebarDataUser } from "./SidebarDataUser";
import { SidebarDataAdmin } from "./SidebarDataAdmin";
import { fetchGetUserByIdToolkit } from "../../redux/slides/userSlice";
import { useDispatch } from "react-redux";

const RoleBasedSidebar = () => {
  const token = localStorage.getItem("access_token");
  const userDataUpdate = [
    {
      id: 1,
      inputType: "input",
      label: "Ảnh đại diện",
      type: "file",
      value: "",
      file: "",
      name: "avatar",
      error: "",
    },
    {
      id: 2,
      inputType: "input",
      label: "Họ và tên",
      type: "text",
      value: "",
      name: "name",
      error: "",
    },
    {
      id: 3,
      inputType: "input",
      label: "Email",
      type: "text",
      value: "",
      name: "email",
      error: "",
    },
    {
      id: 4,
      inputType: "input",
      label: "Địa chỉ",
      type: "text",
      value: "",
      name: "address",
      error: "",
    },
    {
      id: 5,
      inputType: "input",
      label: "Mật khẩu",
      type: "password",
      value: "",
      name: "password",
      error: "",
    },
  ];

  const dispatch = useDispatch();

  const [items, setItems] = useState(userDataUpdate);
  useEffect(() => {
    dispatch(fetchGetUserByIdToolkit()).then((result) => {
      if (result.payload.userData) {
        items[0].value = result.payload.userData.avatar;
        items[1].value = result.payload.userData.name;
        items[2].value = result.payload.userData.email;
        items[3].value = result.payload.userData.address;
        items[4].value = "";
        setItems([...items]);
      }
    });
  }, [dispatch]);

  const roleCode = () => {
    if (token) {
      const { role_code } = jwtDecode(token);
      return role_code;
    }
    return null; // Nếu không có token thì trả về null
  };

  const sidebarData = roleCode() === "R2" ? SidebarDataUser : SidebarDataAdmin;
  const titleSidebar = roleCode() === "R2" ? "User Panel" : "Admin Panel";

  return (
    <div className="lg:flex h-screen hidden">
      {/* Sidebar */}
      <div className="lg:w-64 h-screen text-gray flex flex-col ">
        {/* Logo & Title */}
        {/* <div className="p-1  text-center text-xl">{titleSidebar}</div> */}
        <div className="p-1 text-xl ">
          <p>Xin chào {items[1].value}</p>
        </div>

        {/* Menu */}
        <div className="flex-1">
          <ul className="space-y-1 py-2">
            {sidebarData.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedSidebar;
