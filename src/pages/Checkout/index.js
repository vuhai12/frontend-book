import React from "react";
import { listBooks } from "../../constants/listBooks";
import { ArrowLeft, ArrowRight } from "lucide-react";
import QuantitySelector from "../../components/QuantitySelector";
import Visa from "../../assets/payment/Visa.svg";
import AmericanExpress from "../../assets/payment/AmericanExpress.svg";
import Discover from "../../assets/payment/Discover.svg";
import Mastercard from "../../assets/payment/Mastercard.svg";

const Checkout = () => {
  return (
    <div className="container py-[50px]">
      <div className="grid grid-cols-[1fr,300px]">
        <div className="flex flex-col gap-[20px] px-[30px] bg-white py-[30px]">
          <div>
            <h3 className="font-semibold text-[20px] text-[#393280]">
              Delivery
            </h3>
            <form className="w-full flex flex-col gap-[30px] mt-[30px]">
              <div className="flex gap-[20px] w-full">
                <input
                  placeholder="First Name"
                  className="rounded-[10px] flex-1  px-[20px]  py-[10px] border-[1px] border-gray-300"
                />
                <input
                  placeholder="Last Name"
                  className="rounded-[10px] flex-1  px-[20px]  py-[10px] border-[1px] border-gray-300"
                />
              </div>
              <input
                placeholder="Address"
                className="rounded-[10px] px-[20px]  py-[10px] border-[1px] border-gray-300"
              />
              <div className="flex gap-[20px] w-full">
                <input
                  placeholder="City"
                  className="rounded-[10px] flex-1  px-[20px]  py-[10px] border-[1px] border-gray-300"
                />
                <input
                  placeholder="Zipcode"
                  className="rounded-[10px] flex-1  px-[20px]  py-[10px] border-[1px] border-gray-300"
                />
              </div>
            </form>
          </div>
          <div>
            <div className="flex justify-between">
              <h3 className="font-semibold text-[20px] text-[#393280]">
                Payment Method
              </h3>
              <div className="flex gap-[20px]">
                <img src={Visa} />
                <img src={AmericanExpress} />
                <img src={Discover} />
                <img src={Mastercard} />
              </div>
            </div>

            <form className="mt-[30px] flex flex-col gap-[30px]">
              <div className="flex gap-[30px]">
                <div className="border rounded-lg p-4 bg-gray-50 flex-1">
                  <p className="text-sm text-gray-700 mb-1">Name on card</p>
                  <input
                    type="text"
                    placeholder="Meet Patel"
                    className="w-full outline-none bg-transparent  text-lg"
                  />
                </div>
                <div className="border rounded-lg p-4 bg-gray-50 flex-1">
                  <p className="text-sm text-gray-700 mb-1">Name on card</p>
                  <input
                    type="number"
                    placeholder="0000 0000 0000 0000"
                    className="w-full outline-none bg-transparent text-lg"
                  />
                </div>
              </div>

              <div className="flex gap-[30px]">
                <div className="border rounded-lg p-4 bg-gray-50 flex-1">
                  <p className="text-sm text-gray-700 mb-1">
                    Card Security Code
                  </p>
                  <input
                    type="text"
                    placeholder="Code"
                    className="w-full outline-none bg-transparent text-lg"
                  />
                </div>
                <div className="border rounded-lg p-4 bg-gray-50 flex-1">
                  <p className="text-sm text-gray-700 mb-1">Card expirstion</p>
                  <div className="flex gap-[20px] items-center">
                    <select className="flex-1 bg-transparent outline-none">
                      <option>Month</option>
                    </select>
                    <div className="bg-gray-400 w-[1px] h-[20px]" />
                    <select className="flex-1 bg-transparent outline-none">
                      <option>Year</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="px-[30px] bg-[#ED553B] text-white">
          <h3 className="font-semibold text-[20px] border-gray-300 border-b-[1px] py-[20px]">
            Order Summary
          </h3>
          <div className="flex flex-col gap-[20px] py-[30px] font-semibold text-[14px]">
            <div className="flex justify-between">
              <p>Items 3</p>
              <p>$2500</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Charges</p>
              <p>$5</p>
            </div>
            <div className="flex-col flex gap-[20px] border-gray-300 border-b-[1px] pb-[30px]">
              <p>PROMO CODE</p>
              <input
                className="py-[10px] px-[20px] w-full"
                placeholder="Enter Your Code"
              />
              <button className="py-[8px] w-fit px-[20px] bg-[#393280] text-white">
                Apply
              </button>
            </div>
            <div className="flex justify-between">
              <p>TOTAL COST</p>
              <p>$2800</p>
            </div>
            <button className="py-[10px] px-[30px] w-full text-center text-white bg-[#393280]">
              PAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
