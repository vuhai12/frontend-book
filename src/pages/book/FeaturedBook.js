import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGetListBookToolkit } from "../../redux/slides/bookSlice";
import BookCard from "../../components/BookCard/BookCard";
import BannerSlider from "../../components/BannerSlider/BannerSlider";

const FeaturedBook = () => {
  const dispatch = useDispatch();
  const limitListBook = process.env.REACT_APP_LIMIT_LIST_BOOK || 12;
  // const listBook = useSelector((state) => state.book.listBook);
  const totalBooks = useSelector((state) => state.book.totalBooks);

  const [pageCurent, setCurrentPage] = useState(1);
  const [allBooks, setAllBooks] = useState([]);
  // const [searchString, setSearchString] = useState("");
  const params = useParams();
  const category = params.code;
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      fetchGetListBookToolkit({
        limitListBook,
        pageCurent,
        searchString: "",
        category,
        // signal,
      })
    ).then((res) => {
      if (pageCurent === 1) {
        setAllBooks(res.payload?.response?.bookData?.rows || []);
      } else {
        setAllBooks((prev) => [
          ...prev,
          ...(res.payload?.response?.bookData?.rows || []),
        ]);
      }
    });
    return () => {
      controller.abort();
    };
  }, [pageCurent, category]);

  const handleLoadMore = () => {
    setCurrentPage(pageCurent + 1);
  };

  return (
    <>
      <div className="flex-1 rounded-[5px] w-[100%] relative">
        <div className="bg-white rounded-[5px] h-[74px] p-[16px] flex items-center mt-[100px] lg:mt-0">
          <h2 className="text-black text-[28px] font-semibold">Sách</h2>
        </div>
        <div>
          <div className="w-full mt-[20px] rounded-[8px] relative bg-red-600">
            <BannerSlider />
          </div>
        </div>

        <div className="flex flex-wrap mt-[230px]">
          {allBooks &&
            allBooks?.length > 0 &&
            allBooks?.map((item, index) => {
              return (
                <div
                  className="basis-[100%] mb-[20px] rounded-[8px] p-[5px] md:basis-[33.33%] sm:basis-[50%] lg:basis-[25%]"
                  key={index}
                >
                  <BookCard
                    props={item}
                    handleViewBookDetail={() => handleViewBookDetail(item)}
                  />
                </div>
              );
            })}
        </div>

        {/* Hiển thị nút Xem thêm khi có sách để load */}
        {totalBooks > +allBooks.length && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="rounded-[5px] bg-blue-500 text-white px-[10px] py-[5px]"
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FeaturedBook;
