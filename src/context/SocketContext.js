import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(); // ✅ Tạo Context để quản lý socket
export const useSocket = () => useContext(SocketContext); // ✅ Hook dùng socket

export const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:5000", {
    autoConnect: false, // Không tự động kết nối ngay khi app khởi động
    reconnection: true, // ✅ Tự động kết nối lại khi mất kết nối
    reconnectionAttempts: 5, // 🔁 Thử lại tối đa 5 lần
    reconnectionDelay: 2000, // ⏳ Chờ 2 giây giữa các lần thử lại
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token"); // ✅ Lấy token đã lưu

    if (token) {
      socket.auth = { token }; // ✅ Gửi lại token khi kết nối lại
      socket.connect();
    }
    return () => {
      socket.disconnect(); // 🔴 Ngắt kết nối khi app đóng
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
