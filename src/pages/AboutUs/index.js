import book1 from "../../assets/AboutUs/book1.jpg";
import book2 from "../../assets/AboutUs/book2.jpg";
import { Div } from "./AboutUs.styles";

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <Div className="w-full">
        <div className="container px-[10px] py-16 text-white relative z-10 flex flex-col gap-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Read Smarter. Live Better
          </h1>
          <p className="text-sm sm:text-base max-w-[650px] leading-relaxed">
            We deliver books that fuel curiosity, creativity, and growth. Our
            goal is to empower readers everywhere with knowledge and stories
            that shape the future—one book at a time.
          </p>
        </div>
      </Div>

      {/* Content Section */}
      <div className="container py-16 grid grid-cols-1 md:grid-cols-2 gap-10 px-[10px]">
        {/* Story Text */}
        <div className="bg-white p-6 sm:p-10 flex flex-col gap-6 rounded-xl shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#393280]">
            Our Bookstore Story
          </h3>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Our bookstore was founded with a love for reading and a belief in
            the power of ideas. Inspired by stories that connect people and
            knowledge that shapes the future, we set out to build a place where
            every reader can find books that educate, inspire, and entertain.
            Our goal is to make reading an everyday joy and bring great books
            closer to everyone.
          </p>
        </div>

        {/* Image 1 */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={book1}
            alt="bookstore"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 2 */}
        <div className="overflow-hidden rounded-xl">
          <img src={book2} alt="books" className="w-full h-full object-cover" />
        </div>

        {/* Belief Text */}
        <div className="bg-white p-6 sm:p-10 flex flex-col gap-6 rounded-xl shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#393280]">
            What We Believe In
          </h3>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            We believe great books have the power to inspire, educate, and
            transform lives. That’s why we are committed to offering carefully
            selected titles and dependable service for every reader. Each book
            we provide reflects our dedication to quality and our promise to
            make your reading experience enjoyable and meaningful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
