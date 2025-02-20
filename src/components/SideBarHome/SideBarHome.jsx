import React from "react";
import { NavLink } from "react-router-dom";
import sidebarBanner from "../../assets/sidebar-banner.png";
import BestSellerBooks from "../BestSellerBooks/BestSellerBooks";

const SideBarHome = ({ listCategory, titleSideBar }) => {
  return (
    <div className=" w-[270px] h-full   hidden lg:block ">
      <div className="bg-white rounded-[8px] shadow-md">
        <div className="border-b p-4">
          <h3 className="text-[16px] font-bold text-[#0073e6]">
            {titleSideBar}
          </h3>
        </div>
        <div className="mt-2">
          {listCategory?.length > 0 &&
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

      <div className="mt-[30px] rounded-[8px]">
        <img className="rounded-[8px]" src={sidebarBanner} />
      </div>
      <div className="mt-[30px]">
        <BestSellerBooks />
      </div>
    </div>
  );
};

export default SideBarHome;
