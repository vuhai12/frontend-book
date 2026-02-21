import { listBlogs } from "../../constants/listBlogs";
import RecentBlog from "../../components/RecentBlog";
import { Link } from "react-router-dom";

const BlogList = () => {
  return (
    <div className="container py-12 px-4 md:px-0">
      <div className="grid lg:grid-cols-[1fr_250px] gap-10">
        {/* BLOG GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listBlogs.map((item) => (
            <Link
              key={item.id}
              to={`/list-blogs/${item.id}`}
              className="group flex flex-col gap-4 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4 flex flex-col gap-3">
                <h5 className="font-semibold text-sm md:text-base text-[#173F5F] group-hover:text-[#ED553B] transition">
                  {item.title}
                </h5>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-3">
                  {item.des}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* SIDEBAR */}
        <div className="mt-10 lg:mt-0">
          <RecentBlog />
        </div>
      </div>
    </div>
  );
};

export default BlogList;
