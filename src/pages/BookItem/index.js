import { useState } from "react";
import { listBooks } from "../../constants/listBooks";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";
import Reviews from "./components/Reviews";
import { ZoomImage } from "./components/ZoomImage";

const BookItem = () => {
  const { id } = useParams();
  const bookItem = listBooks.find((item) => item.id === Number(id));

  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");

  if (!bookItem) {
    return <div className="container py-[50px]">Book not found</div>;
  }

  const dataTab = [
    {
      label: "Description",
      content: bookItem.des,
    },
    { label: "Reviews", content: <Reviews /> },
  ];

  const curentTab = dataTab.find((item) => item.label === activeTab);

  return (
    <div className="container py-[40px] px-4 md:px-0">
      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-[40px]">
        {/* LEFT SIDE */}
        <div className="flex-[3] flex flex-col gap-[40px]">
          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row gap-[30px]">
            {/* IMAGE */}
            <div className="w-full md:w-1/2 flex flex-col gap-[15px]">
              <ZoomImage src={bookItem.img} />

              <div className="flex gap-[10px] w-1/3">
                <div
                  onClick={() => setIsActive(!isActive)}
                  className={classNames(
                    "flex-1 rounded-[10px] cursor-pointer border-[1px] transition",
                    isActive ? "border-[#ED553B]" : "border-transparent",
                  )}
                >
                  <img
                    src={bookItem.img}
                    alt={bookItem.title}
                    className="rounded-[10px]"
                  />
                </div>
              </div>
            </div>

            {/* INFO */}
            <div className="w-full md:w-1/2 flex flex-col gap-[20px]">
              <h5 className="text-[22px] md:text-[28px] font-semibold text-[#393280]">
                {bookItem.title}
              </h5>

              <p>
                by <span className="font-semibold">{bookItem.author}</span>
              </p>

              <p className="text-[#ED553B] text-[20px] font-semibold">
                {bookItem.price}
              </p>

              <p className="text-[14px] md:text-[15px]">{bookItem.des}</p>

              <div className="flex flex-col sm:flex-row gap-[15px] mt-[20px]">
                <button className="py-[10px] px-[30px] border-gray-400 rounded-[10px] border-[1px] hover:bg-gray-100 transition">
                  Add to cart
                </button>
                <Link
                  to={"/checkout"}
                  className="bg-[#ED553B] rounded-[10px] text-white py-[10px] px-[30px] hover:opacity-90 transition"
                >
                  Buy now
                </Link>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex border-gray-400 border-b-[1px] w-fit overflow-x-auto">
              {dataTab.map((item) => (
                <div
                  key={item.label}
                  className={classNames(
                    "px-[20px] md:px-[30px] py-[15px] font-semibold cursor-pointer whitespace-nowrap",
                    item.label === activeTab
                      ? "border-b-[2px] border-red-500"
                      : "",
                  )}
                  onClick={() => setActiveTab(item.label)}
                >
                  {item.label}
                </div>
              ))}
            </div>

            <div className="text-[14px] md:text-[15px] leading-relaxed">
              {curentTab.content}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - RELATED BOOKS */}
        <div className="w-full lg:w-[300px]">
          <h3 className="py-[15px] font-semibold text-[18px] px-[20px] bg-[#ED553B] text-white rounded-t-[8px]">
            Related Books
          </h3>

          <div className="flex flex-col gap-[15px] mt-[15px]">
            {listBooks
              .filter((item) => item.id !== bookItem.id)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/list-books/${item.id}`}
                  className="flex gap-[15px] hover:opacity-80 transition"
                >
                  <div className="bg-white w-[35%]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="rounded-[6px]"
                    />
                  </div>

                  <div className="flex-1">
                    <h5 className="font-semibold text-[14px] line-clamp-2">
                      {item.title}
                    </h5>
                    <p className="text-[12px] line-clamp-2 text-gray-500">
                      {item.des}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
