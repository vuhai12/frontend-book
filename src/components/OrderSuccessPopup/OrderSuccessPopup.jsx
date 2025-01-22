import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderSuccessPopup = () => {
  // Hàm hiển thị thông báo
  const showSuccessToast = () => {
    toast.success(
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-3 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>Order placed successfully!</span>
      </div>,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={showSuccessToast}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        Place Order
      </button>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default OrderSuccessPopup;
