import React from "react";
import { NavLink } from "react-router-dom";

const SideBarHome = ({ listCategory, titleSideBar }) => {
  return (
    <div className="bg-white w-[240px] h-full  hidden lg:block shadow-md">
      <div className="border-b p-4">
        <h5 className="text-[16px] font-bold text-gray-800">{titleSideBar}</h5>
      </div>
      <div className="mt-4">
        {listCategory.length > 0 &&
          listCategory.map((item) => (
            <NavLink
              key={item.id}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-900 font-semibold bg-gray-200 block py-3 px-4 text-sm "
                  : "text-gray-700 hover:text-white hover:bg-blue-600 block py-3 px-4 text-sm"
              }
              to={`/category-${item.code}`}
            >
              {item.value}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default SideBarHome;
