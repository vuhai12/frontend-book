import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { listBooks } from "../../constants/listBooks";
import { ChevronDown } from "lucide-react";
import { getListBooks } from "../../redux/slides/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from "../../redux/slides/collectionSlice";

const ListBooks = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    listBooks,
    loading: listBooksLoading,
    error,
  } = useSelector((state) => state.book);
  const { collections, loading: collectionsLoading } = useSelector(
    (state) => state.collections,
  );

  const collectionHandle = searchParams.get("collectionHandle") || "business";
  const sortParam = searchParams.get("sort") || "best-seller";
  const searchParam = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(
      getListBooks({
        collectionHandle,
        tabKey: sortParam,
        search: searchParam,
      }),
    );
  }, [collectionHandle, sortParam, searchParam]);

  const handleClickCollection = (collectionHandle) => {
    1;
    const param = new URLSearchParams(searchParams);
    param.set("collectionHandle", collectionHandle);
    setSearchParams(param);
  };
  const handleOnchangesort = (e) => {
    const param = new URLSearchParams(searchParams);
    param.set("sort", e.target.value);
    setSearchParams(param);
  };

  console.log("listBooks", listBooks);
  console.log("listBooksLoading", listBooksLoading);
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-[250px,1fr] gap-10">
        {/* SIDEBAR */}
        <div>
          {/* Mobile Toggle Button */}
          <button className="md:hidden flex items-center justify-between w-full bg-gray-100 px-4 py-3 rounded-md mb-4">
            <span className="font-semibold text-[#393280]">Categories</span>
          </button>

          {/* Categories List */}
          <div className={`flex flex-col gap-3  md:flex md:flex-col `}>
            <h3 className="hidden md:block font-semibold text-[#393280] text-lg mb-2">
              Categories
            </h3>
            {collectionsLoading ? (
              <div className="flex flex-col gap-[20px]">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="h-6 bg-gray-300 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-[10px]">
                {collections.map((collection) => {
                  return (
                    <p
                      onClick={() => handleClickCollection(collection.handle)}
                      className={`px-3 py-2 cursor-pointer rounded transition text-sm ${
                        collectionHandle === collection.handle
                          ? "bg-[#393280] text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {collection.title}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* BOOK GRID */}
        <div>
          <div className="flex justify-end items-center mb-6 flex-col sm:flex-row gap-4">
            {/* <p className="text-sm text-gray-500">
              Showing {filteredBooks.length} books
            </p> */}

            <select
              value={sortParam}
              onChange={(e) => handleOnchangesort(e)}
              className="outline-none border border-gray-300 rounded-md px-3 py-2 text-sm text-[#393280] font-semibold"
            >
              <option value="best-seller">Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Responsive Grid */}

          {listBooksLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="group rounded-xl shadow-sm hover:shadow-md transition w-full"
                >
                  <div className="relative">
                    <div className="w-full h-[250px] bg-gray-300 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listBooks.map((item) => (
                <Link
                  to={`/list-books/${item.handle}`}
                  key={item.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition w-full"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt="book"
                      className="w-full h-[250px] object-cover"
                    />
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <h5 className="font-semibold text-sm text-[#393280] line-clamp-2">
                      {item.title}
                    </h5>
                    <div className="flex gap-[10px] items-center">
                      <div className="text-[16px] tracking-wide text-amber-400">
                        {"★".repeat(item?.averageRating)}
                        {"☆".repeat(5 - item?.averageRating)}
                      </div>
                      <span className="text-gray-400 text-[14px]">
                        {" "}
                        {`(${item?.reviewCount} Reviews)`}
                      </span>
                    </div>
                    <p className="text-[#ED553B] font-semibold text-sm">
                      ${item.price}
                    </p>
                    <div className="transition text-center bg-[#ED553B] text-white w-full bottom-5 py-2 text-sm rounded-md">
                      View Detail
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* <div className="flex justify-center mt-10">
            <Pagination />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ListBooks;
