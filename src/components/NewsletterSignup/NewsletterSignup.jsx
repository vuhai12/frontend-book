import { useState } from "react";
import { Mail } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
      <h5 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Mail size={18} /> Đăng ký nhận tin
      </h5>
      <p className="text-sm text-gray-600 mb-3">
        Nhận thông tin khuyến mãi và sách mới nhất!
      </p>

      {submitted ? (
        <p className="text-green-600 font-medium">
          Cảm ơn! Bạn đã đăng ký thành công.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            className="border p-2 rounded w-full"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Đăng ký
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;
