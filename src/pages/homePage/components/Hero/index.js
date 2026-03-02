import { useEffect, useState } from "react";
import banner1 from "../../../../assets/Banner1.svg";
import banner5 from "../../../../assets/banner5.webp";
import { ArrowRight } from "lucide-react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="relative overflow-hidden py-[30px] bg-[linear-gradient(104deg,#FFE5E5_14%,#F5FFFE_30%,#FFFFFF_67%,#FFFFFF_100%)]">
      {/* Slider Wrapper */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {listBanner.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between py-[40px] gap-[40px]">
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    current === index
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 40 }
                  }
                  transition={{ duration: 0.6 }}
                  className="w-full flex flex-col gap-[20px]"
                >
                  <h3 className="text-[#393280] font-semibold text-[24px] sm:text-[30px] md:text-[40px] lg:text-[50px] leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-[#393280] text-[14px] sm:text-[15px] md:text-[16px]">
                    {item.des}
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/list-books"
                      className="text-[#393280] flex gap-[10px] items-center w-fit px-[24px] py-[8px] sm:px-[30px] sm:py-[10px] rounded border border-gray-500 hover:bg-[#ED553B] hover:text-white transition-all duration-300"
                    >
                      Read more
                      <motion.span
                        animate={
                          current === index ? { x: [0, 5, 0] } : { x: 0 }
                        }
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                        }}
                      >
                        <ArrowRight size={18} />
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    current === index
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.6 }}
                  className="w-full md:w-[40%] lg:w-[30%]"
                >
                  <img
                    loading="lazy"
                    src={item.imgBanner}
                    alt={item.title}
                    className="w-full object-contain"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute pt-[30px] bottom-[30px] left-1/2 -translate-x-1/2 flex gap-[15px] sm:gap-[25px] z-10">
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
