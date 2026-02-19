import { ArrowLeft, Download, Mail } from "lucide-react";
import React from "react";
import { Check } from "lucide-react";

const CheckoutSuccess = () => {
  return (
    <div className="container py-[50px]">
      <div className="max-w-[500px] mx-auto bg-white rounded-[20px] p-[30px]">
        <div className="flex justify-center">
          <div className="rounded-[50%] bg-[#eee2e1] w-16 h-16 p-[4px] flex justify-center items-center">
            <div className="rounded-[50%]  w-8 h-8 p-[4px]  border-[2px] border-[#ED553B] flex justify-center items-center">
              <Check size={18} strokeWidth={3} className="text-[#ED553B]" />
            </div>
          </div>
        </div>

        <h3 className="text-center text-[20px] font-semibold text-[#ED553B] mt-[30px]">
          Payment Successful!
        </h3>
        <p className="text-center mt-[20px] text-gray-500">
          Your payment has been processed successfully. You will receive a
          confirmation email shortly.
        </p>
        <div className="p-[20px] rounded-[20px] bg-gray-100 mt-[30px]">
          <div className="flex justify-between border-b-[1px] border-gray-500 py-[10px]">
            <p className="text-gray-500">Amount</p>
            <p>$149.99</p>
          </div>
          <div className="mt-[10px] flex-col flex gap-[10px]">
            <div className="flex justify-between">
              <p className="text-gray-500">Transaction ID</p>
              <p>TXN-789123456</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Payment Method</p>
              <p>**** 4242</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Date</p>
              <p>Dec 15, 2024</p>
            </div>
          </div>
        </div>
        <div className="p-[10px] rounded-[20px]  bg-[#eff6ff] mt-[20px]">
          <p className="text-center flex text-gray-400 gap-[10px] justify-center items-center">
            <Mail size={18} />
            Receipt sent to customer@example.com
          </p>
        </div>
        <div className="flex flex-col gap-[20px] mt-[20px]">
          <button className="rounded-[20px] flex gap-[10px] justify-center items-center text-center w-full bg-[#ED553B] py-[10px] px-[30px] text-white">
            <Download size={18} /> Download Receipt
          </button>
          <button className="rounded-[20px] flex gap-[10px] items-center justify-center py-[10px] px-[30px] text-center border-[1px] w-full border-gray-400">
            <ArrowLeft size={18} /> Return to store
          </button>
        </div>

        <p className="mt-[30px] text-[12px] text-gray-400 text-center">
          Need help? Contact our support team at support@techstore.com
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
