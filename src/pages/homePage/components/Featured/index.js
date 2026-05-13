import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getListBooks } from "../../../../redux/slides/bookSlice";

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
  const dispatch = useDispatch();
  const { listBooks, loading, error } = useSelector((state) => state.book);
  useEffect(() => {
    dispatch(getListBooks({ tabKey: "best-seller" }));
  }, []);

  return (
    <div className=" bg-[linear-gradient(118deg,#FBEEEE_0%,#F7FFFE_100%)] px-4 md:px-0 overflow-hidden">
      {loading ? (
        <div className="flex justify-between gap-[30px] py-[40px] container">
          <div className="animate-pulse flex-1 bg-gray-200 h-[350px] rounded-[10px] mb-[30px]"></div>
          <div className="animate-pulse flex-1 bg-gray-200 h-[350px] rounded-[10px] mb-[30px]"></div>
        </div>
      ) : (
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
              loading="lazy"
              src={listBooks[0]?.image}
              alt="book1"
              className="object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div
            variants={rightItem}
            className="w-full md:w-1/2 flex flex-col gap-5 text-center md:text-left"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#393280] font-semibold">
              Featured Book
            </h1>

            <p className="text-lg sm:text-xl text-[#393280]">
              {listBooks[0]?.title}
            </p>

            <div className="flex gap-[10px] items-center">
              <div className="text-[16px] tracking-wide text-amber-400">
                {"★".repeat(listBooks[0]?.averageRating)}
                {"☆".repeat(5 - listBooks[0]?.averageRating)}
              </div>
              <span className="text-gray-400">
                {" "}
                {`(${listBooks[0]?.reviewCount} Reviews)`}
              </span>
            </div>

            <p className="text-[#7A7A7A] text-sm sm:text-base leading-relaxed line-clamp-3">
              {listBooks[0]?.description}
            </p>

            <p className="text-[#ED553B] font-semibold text-lg sm:text-xl">
              ${listBooks[0]?.price?.toFixed(2)}
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-center md:justify-start"
            >
              <Link
                to={`list-books/${listBooks[0]?.handle}`}
                className="px-6 py-3 flex gap-2 items-center w-fit text-[#393280] rounded-lg border border-[#393280] hover:bg-[#393280] hover:text-white transition"
              >
                View more
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Featured;
