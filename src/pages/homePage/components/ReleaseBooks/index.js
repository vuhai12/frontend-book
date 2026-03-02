import ImgBook1 from "../../../../assets/releaseBooks/book1.svg";
import ImgBook2 from "../../../../assets/releaseBooks/book2.svg";
import ImgBook3 from "../../../../assets/releaseBooks/book3.svg";
import ImgBook4 from "../../../../assets/releaseBooks/book4.svg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const books = [
  {
    id: 1,
    img: ImgBook1,
    title: "Simple way of piece life",
    author: "Armor Ramsey",
    price: 40,
  },
  {
    id: 2,
    img: ImgBook2,
    title: "Great travel at desert",
    author: "Sanchit Howdy",
    price: 35,
  },
  {
    id: 3,
    img: ImgBook3,
    title: "The lady beauty Scarlett",
    author: "Arthur Doyle",
    price: 45,
  },
  {
    id: 4,
    img: ImgBook4,
    title: "Once upon a time",
    author: "Klien Marry",
    price: 38,
  },
];

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
  return (
    <div className="bg-[#FCECEC] py-[60px] px-[16px] md:px-0">
      <div className="container mx-auto text-center">
        <h1 className="text-[22px] sm:text-[26px] md:text-[32px] font-semibold text-[#393280]">
          New Release Books
        </h1>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-[40px]"
        >
          {books.map((book) => (
            <motion.div
              key={book.id}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="group"
            >
              <Link to={`/list-books/${book.id}`}>
                <div className="bg-white relative overflow-hidden rounded-[10px] shadow-md  transition-shadow duration-300">
                  {/* IMAGE */}
                  <motion.img
                    src={book.img}
                    alt={book.title}
                    className="w-full h-[260px] sm:h-[290px] object-contain p-[25px]"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    loading="lazy"
                  />

                  {/* OVERLAY */}
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

                {/* TEXT */}
                <div className="mt-[18px] flex flex-col gap-[6px] text-center">
                  <p className="text-[#393280] font-semibold text-[15px] group-hover:text-red-600 transition-colors duration-300">
                    {book.title}
                  </p>
                  <p className="text-gray-400 text-[13px]">{book.author}</p>
                  <p className="text-red-600 font-semibold text-[15px]">
                    ${book.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

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
