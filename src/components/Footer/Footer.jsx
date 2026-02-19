import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
} from "lucide-react";
import logo from "../../assets/logo-footer.svg";
import { dataMenu } from "../../constants/menu";
import { Link } from "react-router-dom";
import blog4 from "../../assets/Blog/Blog4.svg";
import blog5 from "../../assets/Blog/Blog5.svg";

const Footer = () => {
  return (
    <footer className="bg-[#ED553B] text-white px-4 md:px-0 py-16">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div className="flex flex-col gap-6">
          <img src={logo} alt="logo" className="h-12" />
          <p className="text-sm leading-relaxed">
            Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>

          <div className="flex gap-5">
            {[Facebook, Youtube, Instagram, Twitter].map((Icon, index) => (
              <Icon
                key={index}
                size={20}
                className="cursor-pointer hover:scale-110 transition"
              />
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-6">Company</h3>
          <ul className="flex flex-col gap-3">
            {dataMenu.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm hover:underline hover:text-white/80 transition"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest News */}
        <div>
          <h3 className="font-semibold text-lg mb-6">Latest News</h3>

          <div className="flex flex-col gap-6">
            {[blog4, blog5].map((blog, index) => (
              <div key={index} className="flex gap-4 items-start">
                <img
                  src={blog}
                  alt="blog"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium">Nostrud exercitation</h4>
                  <p className="text-xs text-white/80 line-clamp-2">
                    Nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-6">Contact</h3>

          <div className="flex flex-col gap-4 text-sm">
            <p className="flex items-center gap-3">
              <Phone size={18} />
              +91 8374902234
            </p>

            <p className="flex items-center gap-3">
              <Mail size={18} />
              contact@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="container border-t border-white/30 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
        <p>© 2022 Arihant. All Rights Reserved.</p>
        <p className="cursor-pointer hover:text-white transition">
          Privacy | Terms of Service
        </p>
      </div>
    </footer>
  );
};

export default Footer;
