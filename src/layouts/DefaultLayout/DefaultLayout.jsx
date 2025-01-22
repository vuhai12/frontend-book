import React from "react";
import Header from "../../components/Header/Header";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const DefaultLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#efefef]">
      {/* Nội dung của Header và Breadcrumb */}
      <header className="bg-white w-full z-50 fixed top-0 lg:static">
        <div className="container mx-auto py-5 px-[20px] lg:px-0">
          <Header />
        </div>
      </header>

      <div className="container mx-auto py-5 hidden lg:block w-full px-[20px] lg:px-0">
        <Breadcrumb />
      </div>

      {/* Content */}
      <div className="container mx-auto flex-grow mb-10 px-[20px] lg:px-0">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-white text-white text-center py-4 w-full">
        <div className="container mx-auto">
          <p className="text-sm md:text-base font-semibold text-gray-500">
            &copy; {new Date().getFullYear()} by VuHai.
          </p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500  transition-colors duration-300"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500  transition-colors duration-300"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
