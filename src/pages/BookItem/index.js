import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookItem } from "../../redux/slides/bookSlice";
import {
  getReviewsThunk,
  postReviewThunk,
} from "../../redux/slides/reviewsSlice";
import { addCartThunk } from "../../redux/slides/cartSlice";

const BookItem = () => {
  const { handle } = useParams();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const { bookItem, errorBookItem, loadingBookItem } = useSelector(
    (state) => state.book,
  );

  const { reviews, summary, loadingGet, loadingPost, error } = useSelector(
    (state) => state.reviews,
  );

  console.log("bookItem", bookItem);
  console.log("reviews", reviews);

  useEffect(() => {
    dispatch(getBookItem({ handle }));
    if (handle) {
      dispatch(getReviewsThunk(handle));
    }
  }, [dispatch, handle]);

  const handleSubmitReviews = async () => {
    if (!comment.trim()) return;

    await dispatch(
      postReviewThunk({
        productHandle: handle,
        customerName: name,
        customerEmail: email,
        rating,
        content: comment,
      }),
    );

    setName("");
    setEmail("");
    setRating(5);
    setHover(0);
    setComment("");
  };

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("vi-VN");
  };

  console.log("summary", summary);

  const handleAddCart = async () => {
    const cartId = localStorage.getItem("shopify_cart_id");
    const bikeVariantId = bookItem?.variants?.[0]?.id;

    if (!bikeVariantId) return;

    const lines = [
      {
        merchandiseId: bikeVariantId,
        quantity: 1,
      },
    ];

    const resultAction = await dispatch(
      addCartThunk({
        cartId,
        lines,
      }),
    );
    console.log("resultAction", resultAction);

    if (addCartThunk.fulfilled.match(resultAction)) {
      console.log("92772t66t6t3t632gbggg");
      const result = resultAction.payload;

      console.log("result", result);

      if (result?.cartId) {
        localStorage.setItem("shopify_cart_id", result.cartId);
      }
    }
  };

  if (loadingBookItem) {
    return (
      <div className="container px-4 md:px-0 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
          <div className="w-full aspect-[4/5] bg-gray-200 rounded-2xl" />
          <div className="space-y-5">
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
            <div className="h-8 w-1/4 bg-gray-200 rounded-lg" />
            <div className="h-24 w-full bg-gray-200 rounded-lg" />
            <div className="flex gap-4">
              <div className="h-12 flex-1 bg-gray-200 rounded-xl" />
              <div className="h-12 flex-1 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (errorBookItem) {
    return (
      <div className="container px-4 md:px-0 py-16">
        <div className="max-w-xl mx-auto text-center bg-red-50 border border-red-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Error loading book
          </h2>
          <p className="text-gray-600">
            Something went wrong while loading book details.
          </p>
        </div>
      </div>
    );
  }

  if (!bookItem) {
    return (
      <div className="container px-4 md:px-0 py-16">
        <div className="max-w-xl mx-auto text-center bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Book not found
          </h2>
          <p className="text-gray-600">
            The book you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const renderStarInput = () => {
    return [...Array(5)].map((_, i) => {
      const value = i + 1;
      return (
        <span
          key={i}
          className={`cursor-pointer text-2xl ${
            value <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => setRating(value)}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="container px-4 md:px-0 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
        <div className="">
          <div className="w-[100%] overflow-hidden flex items-center justify-center">
            <img
              src={bookItem.featuredImage}
              alt={bookItem.title}
              className="w-[50%] h-full object-contain hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        <div className="">
          <h1 className="text-[15px] md:text-[20px] font-bold text-gray-900 leading-tight mb-4">
            {bookItem.title}
          </h1>
          <div className="flex gap-[10px] items-center">
            <div className="text-[16px] tracking-wide text-amber-400">
              {"★".repeat(summary.averageRating)}
              {"☆".repeat(5 - summary.averageRating)}
            </div>
            <span className="text-gray-400">
              {" "}
              {`(${summary.reviewCount} Reviews)`}
            </span>
          </div>

          <div className="mb-6 mt-[10px]">
            <p className="text-3xl md:text-4xl font-extrabold text-[#ED553B]">
              ${bookItem.price}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleAddCart}
              className="flex-1 h-12 rounded-xl bg-[#ED553B] text-white font-semibold hover:opacity-90 transition"
            >
              Add to Cart
            </button>
            <button className="flex-1 h-12 rounded-xl border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>

          <div className="border-t border-gray-200 pt-5 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-green-600">✔</span>
              <span>Free delivery for orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-green-600">✔</span>
              <span>Secure payment available</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-green-600">✔</span>
              <span>Easy return within 7 days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[50px] p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
          Description
        </h2>
        <div dangerouslySetInnerHTML={{ __html: bookItem.descriptionHtml }} />
      </div>
      <div className="p-6 md:p-8">
        <div className="border-t pt-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900  mb-4">
            Write a review
          </h3>

          {/* Rating */}
          <div className="mb-4">
            <p className="mb-1 text-sm text-gray-600">Your rating</p>
            <div className="flex gap-1">{renderStarInput()}</div>
          </div>

          {/* Name */}
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#ED553B]"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#ED553B]"
          />

          {/* Comment */}
          <textarea
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#ED553B]"
            rows={4}
          />

          <button
            onClick={handleSubmitReviews}
            className="bg-[#ED553B] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Submit Review
          </button>
        </div>
        <div className="space-y-4 mt-[50px]">
          {reviews?.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    {item.customerName || "Ẩn danh"}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {formatDate(item.createdAt)}
                  </div>
                </div>

                <div className="text-sm tracking-wide text-amber-400">
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </div>
              </div>

              <p className="mt-3 text-sm leading-7 text-gray-700">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookItem;
