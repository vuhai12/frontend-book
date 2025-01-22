import React from "react";
import SidebarItem from "./SidebarItem";
import { jwtDecode } from "jwt-decode";
import { SidebarDataUser } from "./SidebarDataUser";
import { SidebarDataAdmin } from "./SidebarDataAdmin";

const RoleBasedSidebar = () => {
  const token = localStorage.getItem("access_token");

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
        <div className="p-1  text-center text-xl font-semibold">
          {titleSidebar}
        </div>

        {/* Menu */}
        <div className="flex-1">
          <ul className="space-y-2 p-4">
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
