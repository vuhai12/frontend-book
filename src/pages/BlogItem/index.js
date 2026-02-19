import React from "react";
import { useParams } from "react-router-dom";
import { listBlogs } from "../../constants/listBlogs";
import RecentBlog from "../../components/RecentBlog";

const BlogItem = () => {
  const { id } = useParams();
  const blogItem = listBlogs.find((item) => item.id == id);

  if (!blogItem) return null;

  return (
    <div className="container py-12 px-4 md:px-0">
      <div className="grid lg:grid-cols-[1fr_250px] gap-10">
        {/* MAIN CONTENT */}
        <div className="flex flex-col gap-8">
          {/* Image */}
          <div className="overflow-hidden rounded-xl">
            <img
              src={blogItem.img}
              alt={blogItem.title}
              className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover"
            />
          </div>

          {/* Title + Description */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#173F5F]">
              {blogItem.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {blogItem.des}
            </p>
          </div>

          {/* Comment Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl sm:text-2xl font-semibold">Comments</h3>

            <h3 className="text-lg sm:text-xl font-medium">Leave a Comment</h3>

            <form className="flex flex-col gap-6">
              {/* Name + Email */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col flex-1 gap-2">
                  <label className="text-sm font-medium">Nick Name :</label>
                  <input
                    placeholder="Name"
                    className="py-3 px-4 bg-gray-100 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#ED553B]"
                  />
                </div>

                <div className="flex flex-col flex-1 gap-2">
                  <label className="text-sm font-medium">E-mail :</label>
                  <input
                    placeholder="Email"
                    className="py-3 px-4 bg-gray-100 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#ED553B]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Write a Message :</label>
                <textarea className="h-[180px] md:h-[220px] bg-gray-100 py-3 px-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#ED553B]" />
              </div>

              {/* Button */}
              <button
                type="button"
                className="py-3 px-6 w-fit bg-[#ED553B] rounded-lg text-white font-semibold hover:bg-[#d9432c] transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="mt-10 lg:mt-0">
          <RecentBlog />
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
