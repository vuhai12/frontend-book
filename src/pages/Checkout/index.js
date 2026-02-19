import React, { useState } from "react";
import Visa from "../../assets/payment/Visa.svg";
import AmericanExpress from "../../assets/payment/AmericanExpress.svg";
import Discover from "../../assets/payment/Discover.svg";
import Mastercard from "../../assets/payment/Mastercard.svg";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipcode: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
    month: "",
    year: "",
  });

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format card number: 0000 0000 0000 0000
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();

      setFormData({ ...formData, [name]: formatted });
      return;
    }

    // Limit CVV to 4 numbers
    if (name === "cvv") {
      const formatted = value.replace(/\D/g, "").slice(0, 4);
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout Data:", formData);
    alert("Payment Submitted!");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
        {/* LEFT */}
        <div className="flex flex-col gap-10 bg-white p-6 sm:p-8 rounded-lg shadow-sm">
          {/* DELIVERY */}
          <div>
            <h3 className="font-semibold text-xl text-[#393280]">Delivery</h3>

            <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="rounded-lg flex-1 px-5 py-3 border border-gray-300"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="rounded-lg flex-1 px-5 py-3 border border-gray-300"
                />
              </div>

              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="rounded-lg px-5 py-3 border border-gray-300"
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="rounded-lg flex-1 px-5 py-3 border border-gray-300"
                />
                <input
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="Zipcode"
                  className="rounded-lg flex-1 px-5 py-3 border border-gray-300"
                />
              </div>

              {/* PAYMENT */}
              <h3 className="font-semibold text-xl text-[#393280] mt-6">
                Payment Method
              </h3>

              <div className="flex gap-4 flex-wrap">
                <img src={Visa} alt="Visa" className="h-6" />
                <img
                  src={AmericanExpress}
                  alt="AmericanExpress"
                  className="h-6"
                />
                <img src={Discover} alt="Discover" className="h-6" />
                <img src={Mastercard} alt="Mastercard" className="h-6" />
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <input
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="Name on Card"
                  className="rounded-lg flex-1 px-5 py-3 border border-gray-300"
                />

                <input
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  className="rounded-lg flex-1 px-5 py-3 border border-gray-300"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="CVV"
                  className="rounded-lg flex-1 px-5 py-3 border border-gray-300"
                />

                <div className="flex flex-1 gap-4">
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="flex-1 rounded-lg px-5 py-3 border border-gray-300"
                  >
                    <option value="">Month</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="flex-1 rounded-lg px-5 py-3 border border-gray-300"
                  >
                    <option value="">Year</option>
                    {[2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#ED553B] text-white p-6 sm:p-8 rounded-lg">
          <h3 className="font-semibold text-xl border-b border-white/40 pb-5">
            Order Summary
          </h3>

          <div className="flex flex-col gap-6 py-6 text-sm font-semibold">
            <div className="flex justify-between">
              <p>Items 3</p>
              <p>$2500</p>
            </div>

            <div className="flex justify-between">
              <p>Shipping Charges</p>
              <p>$5</p>
            </div>

            <div className="flex justify-between text-base">
              <p>TOTAL COST</p>
              <p>$2800</p>
            </div>
            <button
              type="submit"
              className="py-3 mt-6 bg-[#393280] text-white rounded-lg font-semibold"
            >
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
