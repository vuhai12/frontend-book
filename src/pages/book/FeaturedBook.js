import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListBooksHome } from "../../redux/slides/bookSlice";
import BookCard from "../../components/BookCard/BookCard";
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import Loading from "../../components/Loading/Loading";

const FeaturedBook = () => {
  const dispatch = useDispatch();
  const limitListBook = process.env.REACT_APP_LIMIT_LIST_BOOK || 12;
  const totalBooks = useSelector((state) => state.book.totalBooks);
  const isLoading = useSelector((state) => state.book.isLoading);
  const listBooksHome = useSelector((state) => state.book.listBooksHome);

  const [pageCurent, setCurrentPage] = useState(1);

  const params = useParams();
  const category = params.code;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    const controller = new AbortController();
    if (pageCurent === 1) {
      dispatch(
        fetchListBooksHome({
          limitListBook,
          pageCurent,
          searchString: "",
          category,
        })
      );
    } else {
      setIsLoadingMore(true); // Chỉ bật loading khi load thêm sách
      dispatch(
        fetchListBooksHome({
          limitListBook,
          pageCurent,
          searchString: "",
          category,
        })
      ).finally(() => setIsLoadingMore(false)); // Tắt loading khi API hoàn thành
    }

    // dispatch(
    //   fetchListBooks({
    //     limitListBook,
    //     pageCurent,
    //     searchString: "",
    //     category,
    //     // signal,
    //   })
    // );

    return () => {
      controller.abort();
    };
  }, [pageCurent, category]);

  const handleLoadMore = () => {
    setCurrentPage(pageCurent + 1);
  };

  return (
    <>
      <div className="flex-1 rounded-[5px] w-[100%] ">
        <div className="w-full  rounded-[8px] relative pb-[350px] lg:mt-0 mt-[100px]">
          <BannerSlider />
        </div>
        {isLoading && pageCurent == 1 ? (
          <div className="">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-wrap ">
            {listBooksHome &&
              listBooksHome?.length > 0 &&
              listBooksHome?.map((item, index) => {
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
        )}

        {/* Hiển thị nút Xem thêm khi có sách để load */}
        {/* {listBook &&
          listBook?.length > 0 &&
          totalBooks > +listBook.length &&
          !isLoading && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                className="rounded-[5px] border border-[#003366] text-[#003366] px-[30px] py-[5px]"
              >
                Xem thêm
              </button>
            </div>
          )} */}

        {listBooksHome &&
          listBooksHome?.length > 0 &&
          totalBooks > +listBooksHome.length && (
            <div className="text-center">
              {isLoadingMore ? (
                <Loading />
              ) : (
                <button
                  onClick={handleLoadMore}
                  className="rounded-[5px] border border-[#003366] text-[#003366] px-[30px] py-[5px]"
                >
                  Xem thêm
                </button>
              )}
            </div>
          )}
      </div>
    </>
  );
};

export default FeaturedBook;
