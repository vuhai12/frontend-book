import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  return (
    <nav className="text-gray-700 text-sm  text-[14px]" aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        <li>
          <Link
            to="/"
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            Home
          </Link>
        </li>
        {paths.map((path, index) => {
          const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">{">"}</span>
              {isLast ? (
                <span className="text-gray-500">
                  {decodeURIComponent(path)}
                </span>
              ) : (
                <Link
                  to={fullPath}
                  className="text-blue-600 hover:underline hover:text-blue-800"
                >
                  {decodeURIComponent(path)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
