import React from "react";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";

function Dropdown() {
  return (
    <>
      <ul className={"dropdown-menu-item"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index} className="dropdown-link">
              <Link to={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
