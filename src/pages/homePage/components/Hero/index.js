import { Fragment, useEffect, useState } from "react";
import banner1 from "../../../../assets/Banner1.svg";
import banner5 from "../../../../assets/banner5.webp";
import { ArrowRight } from "lucide-react";
import classNames from "classnames";

const listBanner = [
  {
    id: 1,
    title: "Get Your New Book Collections",
    des: "Discover a curated collection of books that inspire imagination, expand knowledge, and enrich everyday life.",
    imgBanner: banner1,
  },
  {
    id: 2,
    title: "Discover Your Next Favorite Book Collection",
    des: "Explore our newest arrivals and handpicked selections designed for every kind of reader.",
    imgBanner: banner5,
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % listBanner.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChangeSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(104deg,#FFE5E5_14%,#F5FFFE_30%,#FFFFFF_67%,#FFFFFF_100%)]">
      {/* Slides */}
      <div className="relative min-h-[420px] sm:min-h-[500px]">
        {listBanner.map((item, index) => (
          <Fragment key={item.id}>
            <div
              style={{ left: `${(index - current) * 100}%` }}
              className="absolute top-0 w-full transition-all duration-700 ease-in-out"
            >
              <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between py-[40px] gap-[40px]">
                {/* Text */}
                <div className="w-full md:w-[60%] lg:w-[70%] flex flex-col gap-[20px] text-center md:text-left">
                  <h3 className="text-[#393280] font-semibold text-[24px] sm:text-[30px] md:text-[40px] lg:text-[50px] leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-[#393280] text-[14px] sm:text-[15px] md:text-[16px]">
                    {item.des}
                  </p>

                  <button className="text-[#393280] mx-auto md:mx-0 flex gap-[10px] items-center w-fit px-[24px] py-[8px] sm:px-[30px] sm:py-[10px] rounded border border-gray-500 hover:bg-[#ED553B] hover:text-white transition-all duration-300">
                    Read more
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* Image */}
                <div className="w-full md:w-[40%] lg:w-[30%]">
                  <img
                    src={item.imgBanner}
                    className="object-contain w-full max-h-[300px] md:max-h-[400px]"
                  />
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-[15px] sm:gap-[25px] z-10">
        {listBanner.map((_, index) => (
          <div
            key={index}
            onClick={() => handleChangeSlide(index)}
            className={classNames(
              "w-2 h-2 sm:w-3 sm:h-3 cursor-pointer relative rounded-full transition-all",
              current === index ? "bg-[#ED553B]" : "bg-[#BEBEBE]",
            )}
          >
            {current === index && (
              <div className="w-[28px] h-[28px] sm:w-[39px] sm:h-[39px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-[#ED553B]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
