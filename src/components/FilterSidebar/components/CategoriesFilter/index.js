import React from "react";
import { listCategories } from "../../../../constants/categories";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const CategoriesFilter = () => {
  return (
    <div className="flex flex-col gap-[20px] py-[20px] text-[#393280] px-[20px]">
      {listCategories.map((item) => {
        return (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              classNames("cursor-pointer", isActive ? "underline" : "")
            }
          >
            {item.label}
          </NavLink>
        );
      })}
    </div>
  );
};

export default CategoriesFilter;
