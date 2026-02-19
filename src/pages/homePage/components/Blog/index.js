import React from "react";
import Blog1 from "../../../../assets/Blog/Blog1.svg";
import Blog2 from "../../../../assets/Blog/Blog2.svg";
import Blog3 from "../../../../assets/Blog/Blog3.svg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const blogs = [
  { img: Blog1, id: 1 },
  { img: Blog2, id: 2 },
  { img: Blog3, id: 3 },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Blog = () => {
  return (
    <div className="bg-[#F7FCFC] px-4 md:px-0">
      <div className="container py-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#173F5F] font-semibold text-center">
          Latest Articles
        </h1>

        {/* Blog Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <Link
                to={`list-blogs/${blog.id}`}
                className="flex flex-col group"
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={blog.img}
                    alt="blog"
                    className="w-full h-[220px] object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <p className="text-sm text-gray-500">2 Aug, 2021</p>

                  <h3 className="text-[#173F5F] font-semibold text-lg group-hover:text-[#ED553B] transition">
                    Reading books always makes the moments happy
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to={`/list-blogs`}
              className="flex items-center gap-2 px-8 py-3 rounded-xl border border-gray-400 hover:bg-gray-100 transition"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
