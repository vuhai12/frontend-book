import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import { Facebook, Linkedin, Instagram, Phone, Twitter } from "lucide-react";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#efefef] overflow-x-hidden">
      {/* Top Bar */}
      <header className="bg-white w-full">
        <div className="bg-[#393280] text-white px-[10px] md:px-0">
          <div className="container mx-auto flex items-center justify-between h-[56px]">
            {/* Phone */}
            <div className="flex items-center gap-[12px]">
              <Phone size={18} />
              <p>+91 8374902234</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-[18px]">
              <Facebook
                size={18}
                className="cursor-pointer hover:opacity-80 transition"
              />
              <Linkedin
                size={18}
                className="cursor-pointer hover:opacity-80 transition"
              />
              <Instagram
                size={18}
                className="cursor-pointer hover:opacity-80 transition"
              />
              <Twitter
                size={18}
                className="cursor-pointer hover:opacity-80 transition"
              />
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto">
          <Header />
        </div>
      </header>
      {/* Page Content */}
      <main className="flex-1">{children}</main>
      {/* Footer */}
      <Footer />
      {/* Scroll To Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default DefaultLayout;
