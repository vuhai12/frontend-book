import { CheckCircle, Truck, RefreshCcw, Clock, Tag, Zap } from "lucide-react";
import "./CommitmentBar.css";

export default function CommitmentBar() {
  const items = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[#003366]" />,
      text: "100% Hàng Chính Hãng",
    },
    {
      icon: <Truck className="w-6 h-6 text-[#003366]" />,
      text: "Freeship Mọi Đơn",
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-[#003366]" />,
      text: "Hoàn 200% Nếu Hàng Giả",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#003366]" />,
      text: "30 Ngày Đổi Trả",
    },
    { icon: <Zap className="w-6 h-6 text-[#003366]" />, text: "Giao Nhanh 2H" },
    { icon: <Tag className="w-6 h-6 text-[#003366]" />, text: "Giá Siêu Rẻ" },
  ];

  return (
    <div className="flex items-center bg-white overflow-hidden ">
      {/* Phần chữ "Cam kết" đứng yên */}
      <h3 className="text-[#003366] font-bold px-4 flex-shrink-0">Cam kết</h3>

      {/* Nội dung cuộn liên tục */}
      <div className="relative w-full overflow-hidden">
        <div className="marquee-wrapper">
          {/* Nhân đôi để tạo hiệu ứng nối đuôi */}
          <div className="marquee-content">
            {items.concat(items).map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 border-r border-gray-300 last:border-none"
              >
                {item.icon}
                <span className="text-sm font-bold text-gray-700">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
