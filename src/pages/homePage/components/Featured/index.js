import React from "react";
import book1 from "../../../../assets/Featured/book1.svg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const leftItem = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0 },
};

const rightItem = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0 },
};

const Featured = () => {
  return (
    <div className="bg-[linear-gradient(118deg,#FBEEEE_0%,#F7FFFE_100%)] px-4 md:px-0 overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container flex flex-col md:flex-row items-center justify-between py-10 gap-10"
      >
        {/* Image */}
        <motion.div
          variants={leftItem}
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.img
            src={book1}
            alt="book1"
            className="w-[250px] sm:w-[320px] md:w-[380px] lg:w-[420px] object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          variants={rightItem}
          className="w-full md:w-1/2 flex flex-col gap-5 text-center md:text-left"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#393280] font-semibold">
            Featured Book
          </h1>

          <p className="text-lg sm:text-xl text-[#393280]">
            Birds gonna be happy
          </p>

          <p className="text-[#7A7A7A] text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
            feugiat amet, libero ipsum enim pharetra hac.
          </p>

          <p className="text-[#ED553B] font-semibold text-lg sm:text-xl">
            $ 45.00
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex justify-center md:justify-start"
          >
            <Link
              to={"/list-books/1"}
              className="px-6 py-3 flex gap-2 items-center w-fit text-[#393280] rounded-lg border border-[#393280] hover:bg-[#393280] hover:text-white transition"
            >
              View more
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Featured;
