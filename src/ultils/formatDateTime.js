export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  // Format ngày và giờ
  const formattedDate = date.toLocaleDateString("vi-VN"); // Định dạng ngày kiểu Việt Nam
  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};

// // Ví dụ sử dụng
// const isoTime = "2025-01-20T16:26:33.000Z";
// console.log(formatDateTime(isoTime)); // Kết quả: "20/01/2025 16:26"
