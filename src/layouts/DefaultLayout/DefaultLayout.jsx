import React from "react";
import Header from "../../components/Header/Header";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Footer from "../../components/Footer/Footer";
import CommitmentBar from "../../components/CommitmentBar/CommitmentBar";

const DefaultLayout = ({ children }) => {
  return (
    <div className=" flex flex-col bg-[#efefef] min-h-screen">
      {/* Nội dung của Header và Breadcrumb */}
      <header className="bg-white w-full z-50 fixed top-0 lg:static ">
        <div className="border-b border-gray-200">
          <div className="container mx-auto py-5 px-[20px] lg:px-0 border-b border-gray-200">
            <Header />
          </div>
        </div>
        <div className="container mx-auto py-5 px-[20px] lg:px-0">
          <CommitmentBar />
        </div>
      </header>

      <div className="container mx-auto py-5 hidden lg:block w-full px-[20px] lg:px-0">
        <Breadcrumb />
      </div>

      {/* Content */}
      <div className="container mx-auto flex-grow mb-10 px-[20px] lg:px-0 mt-[80px] lg:mt-0">
        {children}
      </div>

      {/* Footer */}
      <div class="w-full bg-white pt-5">
        <div class="container box-border">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
