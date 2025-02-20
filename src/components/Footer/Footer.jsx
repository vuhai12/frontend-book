import { Copyright } from "lucide-react";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaCreditCard,
  FaCcMastercard,
  FaCcAmex,
  FaMoneyCheck,
  FaWallet,
  FaCcVisa,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="p-5 text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Hỗ trợ khách hàng */}
        <div>
          <h3 className="font-bold text-lg mb-4">Hỗ trợ khách hàng</h3>
          <ul className="space-y-2 text-gray-500 footer-section">
            <li>
              <a href="#">Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href="#">Hướng dẫn mua hàng</a>
            </li>
            <li>
              <a href="#">Hướng dẫn bán hàng</a>
            </li>
            <li>
              <a href="#">Thanh toán</a>
            </li>
            <li>
              <a href="#">Vận chuyển</a>
            </li>
          </ul>
        </div>

        {/* Về Book */}
        <div>
          <h3 className="font-bold text-lg mb-4">Về BookEng</h3>
          <ul className="space-y-2 text-gray-500 footer-section">
            <li>
              <a href="#">Giới thiệu về BookEng</a>
            </li>
            <li>
              <a href="#">Tuyển dụng</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#">Điều khoản sử dụng</a>
            </li>
          </ul>
        </div>

        {/* Hợp tác và liên kết */}
        <div>
          <h3 className="font-bold text-lg mb-4">Hợp tác và liên kết</h3>
          <ul className="space-y-2 text-gray-500 footer-section">
            <li>
              <a href="#">Quy chế hoạt động</a>
            </li>
            <li>
              <a href="#">Bán hàng cùng BookEng</a>
            </li>
          </ul>
        </div>

        {/* Phương thức thanh toán */}
        <div>
          <h3 className="font-bold text-lg mb-4">Phương thức thanh toán</h3>
          <div className="grid grid-cols-3 gap-2">
            <FaCreditCard className="text-red-600 text-2xl" />
            <FaCcMastercard className="text-blue-600 text-2xl" />
            <FaMoneyCheck className="text-orange-700 text-2xl" />
            <FaCcVisa className="text-fuchsia-950 text-2xl" />
            <FaWallet className="text-lime-800 text-2xl" />
            <FaCcAmex className="text-rose-800 text-2xl" />
          </div>
        </div>

        {/* Kết nối với chúng tôi */}
        <div>
          <h3 className="font-bold text-lg mb-4">Kết nối với chúng tôi</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl text-blue-600" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl text-pink-500" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-2xl text-red-600" />
            </a>
          </div>
          <div className="mt-4 text-gray-500">
            <a
              href="mailto:support@tiki.vn"
              className="flex items-center space-x-2"
            >
              <HiOutlineMail className="text-xl" />
              <span>support@BookEng.vn</span>
            </a>
          </div>
        </div>
      </div>
      {/* <p className="text-center text-gray-500 text-sm flex items-center justify-center gap-1 border-t border-gray-300">
        <Copyright className="w-4 h-4" /> 2025 by{" "}
        <span className="font-semibold">VuHai</span>.
      </p> */}
    </footer>
  );
};

export default Footer;
