import React from "react";
import Slider from "react-slick";
import LeftArrow from "../../assets/left-arrow.svg";
import RightArrow from "../../assets/right-arrow.svg";
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.png";
import "./BannerSlider.css";

const BannerSlider = () => {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className="absolute left-[10px] z-10 top-[50%] transform -translate-y-1/2 cursor-pointer"
    >
      <img
        src={LeftArrow}
        alt="prevArrow"
        className="w-[40px] h-[40px] bg-white p-[10px] rounded-full border-[1px] border-gray-300 shadow-md"
      />
    </div>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className="absolute right-[10px] z-10 top-[50%] transform -translate-y-1/2 cursor-pointer"
    >
      <img
        src={RightArrow}
        alt="nextArrow"
        className="w-[40px] h-[40px] bg-white p-[10px] rounded-full border-[1px] border-gray-300 shadow-md"
      />
    </div>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    customPaging: (i) => <div className="dot-custom"></div>,
  };

  return (
    <div className="w-full absolute h-[157px] rounded-[8px]">
      <Slider {...settings} className=" h-[157px] ">
        <div className="h-[157px] rounded-[8px]">
          <img
            src={slider1}
            className="w-full h-full object-cover rounded-[8px]"
          />
        </div>
        <div className=" h-[157px] rounded-[8px]">
          <img
            src={slider2}
            className="w-full h-full object-cover rounded-[8px]"
          />
        </div>
        <div className=" h-[157px] rounded-[8px]">
          <img
            src={slider3}
            className="w-full h-full object-cover rounded-[8px]"
          />
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlider;
