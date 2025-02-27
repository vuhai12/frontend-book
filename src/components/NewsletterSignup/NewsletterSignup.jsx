import { useEffect, useState } from "react";
import { Mail, Send } from "lucide-react";
import { useLocation } from "react-router-dom";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setEmail("");
    setMessage("");
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Vui lòng nhập email hợp lệ!");
      return;
    }

    setMessage("Cảm ơn bạn đã đăng ký!");
    setEmail(""); // Xóa input sau khi gửi
  };

  return (
    <div className="p-2 flex flex-col justify-center items-center gap-3">
      <h3 className="text-xl flex justify-center items-center  font-semibold gap-3 w-full">
        <Mail size={22} /> <span>Đăng ký nhận tin</span>
      </h3>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 w-full p-2 border border-white rounded-md text-black focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-white text-[#0073e6] font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition-all"
          >
            <Send size={16} /> Đăng ký
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-yellow-200">{message}</p>}
      </div>
      <p className="text-sm text-white mt-1 text-center">
        Nhận thông tin mới nhất về sách và khuyến mãi hấp dẫn!
      </p>
    </div>
  );
};

export default NewsletterSignup;
