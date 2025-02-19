import React from "react";
import { NavLink } from "react-router-dom";
import bannerSidebar from "../../assets/banner-sidebar.png";
import bannerSidebar2 from "../../assets/banner-sidebar2.png";
import bannerSidebar3 from "../../assets/banner-sidebar3.jpg";
// import bannerSidebar5 from "../../assets/banner-sidebar5.jpg";

const SideBarHome = ({ listCategory, titleSideBar }) => {
  return (
    <div className=" w-[270px] h-full   hidden lg:block ">
      <div className="bg-white rounded-[8px] shadow-md">
        <div className="border-b p-4">
          <h5 className="text-[16px] font-bold text-gray-800">
            {titleSideBar}
          </h5>
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

      {/* <div className="mt-[30px] ">
        <AdvancedFilters />
      </div> */}

      <div className="mt-[30px] ">
        <img src={bannerSidebar} />
      </div>
      <div className="mt-[30px] rounded-[8px]">
        <img className="rounded-[8px]" src={bannerSidebar2} />
      </div>
      <div className="mt-[30px] rounded-[8px]">
        <img className="rounded-[8px]" src={bannerSidebar3} />
      </div>
      {/* <div className="mt-[30px] rounded-[8px]">
        <img className="rounded-[8px]" src={bannerSidebar5} />
      </div> */}

      {/* <div className="mt-[30px] ">
        <NewsletterSignup />
      </div> */}
    </div>
  );
};

export default SideBarHome;
