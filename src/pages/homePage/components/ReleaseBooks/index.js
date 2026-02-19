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

const ReleaseBooks = () => {
  return (
    <div className="bg-[#FCECEC] py-[50px] px-[16px] md:px-0">
      <div className="container mx-auto text-center">
        <h1 className="text-[22px] sm:text-[26px] md:text-[30px] font-semibold text-[#393280]">
          New Release Books
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[25px] mt-[30px]">
          {books.map((book) => (
            <motion.div key={book.id} whileHover={{ y: -6 }} className="group">
              <Link to={`/list-books/${book.id}`}>
                <div className="bg-white relative overflow-hidden rounded-[8px] shadow-sm">
                  <motion.img
                    src={book.img}
                    className="w-full h-[250px] sm:h-[280px] object-contain p-[15px]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20">
                    <div className="bg-red-600 text-white px-[20px] py-[8px] rounded-[4px] text-[14px]">
                      View Detail
                    </div>
                  </div>
                </div>

                <div className="mt-[15px] flex flex-col gap-[6px]">
                  <p className="text-[#393280] font-semibold text-[14px] sm:text-[15px]">
                    {book.title}
                  </p>
                  <p className="text-gray-400 text-[13px]">{book.author}</p>
                  <p className="text-red-600 font-semibold text-[14px]">
                    ${book.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center md:justify-end mt-[30px]">
          <Link
            to={"/list-books"}
            className="text-[#ED553B] font-semibold flex gap-[8px] text-[14px] items-center"
          >
            <p>View All Book</p>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReleaseBooks;
