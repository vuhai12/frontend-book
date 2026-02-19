import React from "react";
import { listBlogs } from "../../constants/listBlogs";
import { Link } from "react-router-dom";

const RecentBlog = () => {
  return (
    <div>
      <h3 className="py-4 px-6 bg-[#ED553B] font-semibold text-center text-white text-lg rounded-t-lg">
        Recent Blogs
      </h3>

      <div className="flex flex-col gap-5 mt-6">
        {listBlogs.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            to={`/list-blogs/${item.id}`}
            className="flex gap-4 items-start hover:opacity-80 transition group"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-[35%] sm:w-[30%] rounded-md object-cover"
            />

            <div className="flex flex-col gap-2 flex-1">
              <h5 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-[#ED553B] transition">
                {item.title}
              </h5>

              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {item.des}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentBlog;
