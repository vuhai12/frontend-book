import React from "react";
import Header from "../../components/Header/Header";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Footer from "../../components/Footer/Footer";
import CommitmentBar from "../../components/CommitmentBar/CommitmentBar";
import NewsletterSignup from "../../components/NewsletterSignup/NewsletterSignup";
import { Copyright } from "lucide-react";

import { Facebook, Linkedin, Instagram, Phone, Twitter } from "lucide-react";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col bg-[#efefef] min-h-screen">
      <header className="bg-white w-full">
        <div className=" bg-[#393280] text-white md:px-0 px-[10px]">
          <div className="container flex items-center justify-between h-[56px] ">
            <div className="flex gap-[20px]">
              <Phone size={18} />
              <p>+91 8374902234</p>
            </div>
            <div className="flex gap-[20px]">
              <Facebook size={18} />
              <Linkedin size={18} />
              <Instagram size={18} />
              <Twitter size={18} />
            </div>
          </div>
        </div>
        <div className="container ">
          <Header />
        </div>
      </header>

      {children}

      <Footer />
    </div>
  );
};

export default DefaultLayout;
