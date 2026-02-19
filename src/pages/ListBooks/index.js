import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { listBooks } from "../../constants/listBooks";
import { listCategories } from "../../constants/listCategories";
import Pagination from "../../components/Pagination/Pagination";
import { ChevronDown } from "lucide-react";

const ListBooks = () => {
  const { category } = useParams();
  const [sort, setSort] = useState("az");
  const [showCategories, setShowCategories] = useState(false);

  const filteredBooks = useMemo(() => {
    let books = category
      ? listBooks.filter((book) => book.category === category)
      : listBooks;

    books = [...books].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      return 0;
    });

    return books;
  }, [category, sort]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-[250px,1fr] gap-10">
        {/* SIDEBAR */}
        <div>
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="md:hidden flex items-center justify-between w-full bg-gray-100 px-4 py-3 rounded-md mb-4"
          >
            <span className="font-semibold text-[#393280]">Categories</span>
            <ChevronDown
              className={`transition-transform ${
                showCategories ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Categories List */}
          <div
            className={`flex flex-col gap-3 ${
              showCategories ? "block" : "hidden"
            } md:flex md:flex-col `}
          >
            <h3 className="hidden md:block font-semibold text-[#393280] text-lg mb-2">
              Categories
            </h3>

            {listCategories.map((cat) => {
              const slug = cat.path.split("/").pop();
              const active = slug === category;

              return (
                <Link
                  key={cat.path}
                  to={cat.path}
                  onClick={() => setShowCategories(false)}
                  className={`px-3 py-2 rounded transition text-sm
                    ${active ? "bg-[#ED553B] text-white" : "hover:bg-gray-100"}
                  `}
                >
                  {cat.label}
                </Link>
              );
            })}

            <Link
              to="/list-books"
              onClick={() => setShowCategories(false)}
              className="px-3 py-2 rounded hover:bg-gray-100 text-sm"
            >
              View All
            </Link>
          </div>
        </div>

        {/* BOOK GRID */}
        <div>
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <p className="text-sm text-gray-500">
              Showing {filteredBooks.length} books
            </p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="outline-none border border-gray-300 rounded-md px-3 py-2 text-sm text-[#393280] font-semibold"
            >
              <option value="az">Sort: A → Z</option>
              <option value="za">Sort: Z → A</option>
            </select>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBooks.map((item) => (
              <Link
                to={`/list-books/${item.id}`}
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative">
                  <img
                    src={item.img}
                    alt="book"
                    className="w-full h-[250px] object-cover"
                  />

                  <div className="absolute opacity-0 group-hover:opacity-100 transition bg-[#ED553B] text-white w-[85%] left-1/2 -translate-x-1/2 bottom-5 py-2 text-center text-sm rounded-md">
                    View Detail
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2 text-center">
                  <h5 className="font-semibold text-sm text-[#393280]">
                    {item.title}
                  </h5>
                  <p className="text-xs text-gray-600">{item.author}</p>
                  <p className="text-[#ED553B] font-semibold text-sm">
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* <div className="flex justify-center mt-10">
            <Pagination />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ListBooks;
