import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-gray-200 text-gray shadow"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray"
          }`
        }
      >
        <span className="text-2xl">{item.icon}</span>
        <span className="text-sm font-medium">{item.title}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
