import { Link } from "react-router-dom";
import { listCategories } from "../../../../constants/listCategories";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Categories = () => {
  return (
    <div className="bg-white py-[40px] px-[16px] md:px-0">
      <div className="container">
        {/* Title */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-[#393280] text-[22px] sm:text-[26px] md:text-[30px] font-semibold">
            Explore our Top Categories
          </h1>
        </div>

        {/* Categories Grid */}
        <motion.div
          className="mt-[30px]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px]">
            {listCategories.map((itemData) => (
              <motion.div
                key={itemData.path}
                variants={item}
                whileHover={{ y: -6 }}
                className="group w-full"
              >
                <Link to={itemData.path} className="block text-center">
                  <div className="overflow-hidden rounded-[12px]">
                    <img
                      loading="lazy"
                      src={itemData.img}
                      alt={itemData.label}
                      className="object-cover h-[180px] sm:h-[200px] w-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <p className="mt-[15px] font-semibold text-[#393280] text-[15px] sm:text-[16px]">
                    {itemData.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
