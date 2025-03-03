import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connectSocket } from "./ultils/socket";

function App() {
  // useEffect(() => {
  //   const token = localStorage.getItem("access_token"); // ✅ Lấy token từ localStorage
  //   if (token) {
  //     connectSocket(token); // ✅ Kết nối lại WebSocket khi load trang
  //   }
  // }, []);
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
