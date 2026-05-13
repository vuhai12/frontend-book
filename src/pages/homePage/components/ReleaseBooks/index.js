import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { getListBooks } from "../../../../redux/slides/bookSlice";
import { useDispatch, useSelector } from "react-redux";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const ReleaseBooks = () => {
  const dispatch = useDispatch();
  const { listBooks, loading, error } = useSelector((state) => state.book);
  useEffect(() => {
    dispatch(getListBooks({ tabKey: "new-arrival" }));
  }, []);
  console.log("listBooks", listBooks);
  return (
    <div className="bg-[#FCECEC] py-[60px] px-[16px] md:px-0">
      <div className="container mx-auto text-center">
        <h1 className="text-[22px] sm:text-[26px] md:text-[32px] font-semibold text-[#393280]">
          New Release Books
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-[40px]">
            {[...Array(4)].map((_, index) => (
              <div className="animate-pulse bg-gray-300 h-[300px] rounded-[10px] mb-[30px]"></div>
            ))}
          </div>
        ) : error ? (
          <p>Error: "error"</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-[40px]"
          >
            {listBooks.map((book) => (
              <motion.div
                key={book.id}
                variants={itemVariants}
                whileHover={{ y: -12 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="group"
              >
                <Link to={`/list-books/${book.handle}`}>
                  <div className="bg-white relative overflow-hidden rounded-[10px] shadow-md  transition-shadow duration-300">
                    <motion.img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-[260px] sm:h-[290px] object-contain p-[25px]"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      loading="lazy"
                    />

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-none"
                    >
                      <motion.div
                        initial={{ scale: 0.85 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-red-600 text-white px-[22px] py-[10px] rounded-[6px] text-[14px] font-medium shadow-lg"
                      >
                        View Detail
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="mt-[18px] flex flex-col gap-[6px] text-left">
                    <p className="line-clamp-1 text-[#393280] font-semibold text-[15px] group-hover:text-red-600 transition-colors duration-300">
                      {book.title}
                    </p>
                    <div className="flex gap-[10px] items-center">
                      <div className="text-[16px] tracking-wide text-amber-400">
                        {"★".repeat(book.averageRating)}
                        {"☆".repeat(5 - book.averageRating)}
                      </div>
                      <span className="text-gray-400">
                        {" "}
                        {`(${book.reviewCount} Reviews)`}
                      </span>
                    </div>
                    <p className="text-red-600 font-semibold text-[20px]">
                      ${book.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* VIEW ALL */}
        <div className="flex justify-center md:justify-end mt-[40px]">
          <Link
            to={"/list-books"}
            className="text-[#ED553B] font-semibold flex gap-[8px] text-[14px] items-center group"
          >
            <span className="group-hover:underline">View All Book</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReleaseBooks;
