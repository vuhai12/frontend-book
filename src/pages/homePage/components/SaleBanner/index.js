import React, { useEffect, useState } from "react";
import banner1 from "../../../../assets/SaleBanner/Unsplash.svg";

const SaleBanner = () => {
  const endTime = new Date("2026-12-31T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState(getTime());

  function getTime() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 12)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const box = (value, label) => (
    <div className="flex items-center flex-col">
      <h3 className="text-[#ED553B] font-semibold text-[25px]">
        {String(value).padStart(2, "0")}
      </h3>
      <p>{label}</p>
    </div>
  );
  return (
    <div className="bg-white md:p-[50px] p-[10px]">
      <div className="bg-[#FCEBEA] rounded-[20px] container md:flex-row flex-col justify-center flex md:justify-between p-[20px] md:p-[50px]">
        <div className="flex-1 flex flex-col gap-[30px]">
          <h1 className="text-[30px] text-[#463C74] font-semibold">
            All books are 50% off now! Don't miss such a deal!
          </h1>
          <p className="text-[#393280]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
            feugiat amet, libero ipsum enim pharetra hac.
          </p>
          <div className="flex gap-[30px]">
            {box(timeLeft.days, "Days")}
            {box(timeLeft.hours, "Hour")}
            {box(timeLeft.minutes, "Min")}
            {box(timeLeft.seconds, "Sec")}
          </div>
        </div>
        <div className="flex-1 flex justify-center  text-center">
          <img src={banner1} alt="banner1" className="object-center" />
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
