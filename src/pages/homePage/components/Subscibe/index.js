import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-[#FCEBEA] px-4 md:px-0 py-16">
      <div className="container bg-[#ED553B] text-white rounded-2xl py-12 px-6 md:px-12 flex flex-col items-center text-center gap-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Subscribe to Our Newsletter
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base max-w-[600px] leading-relaxed">
          Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet,
          consectetur. Elit adipiscing enim pharetra hac.
        </p>

        {/* Input + Button */}
        <div className="w-full max-w-[600px] flex flex-col sm:flex-row items-center gap-3 mt-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-6 py-4 rounded-lg text-black outline-none"
          />

          <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#ED553B] font-semibold rounded-lg hover:bg-gray-100 transition">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
