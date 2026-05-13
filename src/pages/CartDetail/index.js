import { useEffect, useState } from "react";
import { listBooks } from "../../constants/listBooks";
import { ArrowLeft } from "lucide-react";
import QuantitySelector from "../../components/QuantitySelector";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../redux/slides/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { removeCartLinesThunk } from "../../redux/slides/cartSlice";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Carthetail = () => {
  const dispatch = useDispatch();
  const { cart: cartData, loading, error } = useSelector((state) => state.cart);

  const { pathname } = useLocation();

  const handleRemove = async (lineId) => {
    const cartId = localStorage.getItem("shopify_cart_id");

    if (!cartId) return;

    await dispatch(
      removeCartLinesThunk({
        cartId,
        lineIds: [lineId],
      }),
    );
  };

  useEffect(() => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (cartId) {
      dispatch(getCartThunk(cartId));
    }
  }, []);

  console.log("cartData", cartData);

  const isCartEmpty =
    !cartData || !cartData.lines || cartData.lines.nodes.length === 0;

  if (isCartEmpty) {
    return (
      <div className="w-full bg-white py-[50px]">
        <div className="flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-[30px] font-[700] uppercase tracking-[1px] text-[#222222] md:text-[34px]">
            Shopping Cart
          </h1>

          <div className="mt-[50px] flex h-[140px] w-[140px] items-center justify-center">
            <ShoppingCart
              size={120}
              strokeWidth={1.8}
              className="text-[#ed553b]"
            />
          </div>

          <h2 className="mt-10 text-[34px] font-[700] leading-[1.3] text-[#2B2B2B] md:text-[42px]">
            Your Cart Is Currently Empty!
          </h2>

          <p className="mt-6 max-w-[620px] text-[14px] leading-[28px] text-[#9A9A9A]">
            Before proceed to checkout you must add some products to your
            shopping cart.
            <br />
            You will find a lot of interesting products on our "Shop" page.
          </p>

          <Link
            to="/list-books"
            className="mt-10 inline-flex min-w-[170px] items-center justify-center rounded-full bg-[#ed553b] px-8 py-4 text-[14px] font-[600] text-white transition hover:bg-[#060c52]"
          >
            Return To Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-[40px] px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-[30px]">
        {/* LEFT SIDE */}
        <div className="bg-white rounded-md pb-[30px]">
          <div className="flex justify-between font-semibold text-[20px] border-b py-[20px] px-[20px]">
            <p>Cart</p>
            {/* <p>{totalItems} Items</p> */}
          </div>
          {loading ? (
            <div className="px-[20px] py-[20px] animate-pulse">
              <div className="space-y-5">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="grid grid-cols-[90px_1fr] md:grid-cols-[90px_1fr_120px_100px_100px] gap-4 items-center border-b pb-5"
                  >
                    <div className="w-[80px] h-[100px] bg-slate-200 rounded-lg" />

                    <div className="space-y-3">
                      <div className="h-4 w-3/4 bg-slate-200 rounded" />
                      <div className="h-3 w-1/2 bg-slate-200 rounded" />
                      <div className="h-3 w-[80px] bg-slate-200 rounded" />
                    </div>

                    <div className="hidden md:block h-9 w-[100px] bg-slate-200 rounded-lg" />
                    <div className="hidden md:block h-4 w-[70px] bg-slate-200 rounded" />
                    <div className="hidden md:block h-4 w-[70px] bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-[20px] overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="text-gray-500 font-semibold text-[12px]">
                  <tr className="text-left">
                    <th className="py-[10px] w-[50%]">BOOK DETAIL</th>
                    <th className="py-[10px] w-[20%]">QUANTITY</th>
                    <th className="py-[10px] w-[15%]">PRICE</th>
                    <th className="py-[10px] w-[15%]">TOTAL</th>
                  </tr>
                </thead>

                <tbody>
                  {cartData?.lines.nodes.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-[15px]">
                        <div className="flex gap-[10px]">
                          <div className="w-[80px] shrink-0">
                            <img
                              src={item.merchandise.product.featuredImage?.url}
                              alt={item.merchandise.product.title}
                              className="w-full object-cover rounded-md"
                            />
                          </div>

                          <div className="flex flex-col gap-[6px]">
                            <p className="text-[14px] font-semibold">
                              {item.merchandise.product.title}
                            </p>
                            {/* <p className="text-[12px] text-gray-500 line-clamp-2">
                            {item.des}
                          </p> */}
                            <p
                              onClick={() => handleRemove(item.id)}
                              className="text-red-600 text-[13px] cursor-pointer underline"
                            >
                              Remove
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-[15px]">
                        <QuantitySelector value={item.quantity} />
                      </td>

                      <td className="py-[15px]">
                        ${item.cost?.totalAmount.amount}
                      </td>

                      <td className="py-[15px]">
                        ${item.cost?.totalAmount.amount * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex gap-[10px] items-center cursor-pointer mt-[20px] text-[#393280] font-semibold">
                <ArrowLeft size={18} />
                <p>Continue Shopping</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#ED553B] text-white rounded-md p-[20px] h-fit">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 w-40 bg-white/40 rounded mb-6" />
              <div className="space-y-5">
                <div className="h-4 w-full bg-white/30 rounded" />
                <div className="h-4 w-3/4 bg-white/30 rounded" />
                <div className="h-4 w-full bg-white/30 rounded" />
                <div className="h-11 w-full bg-white/40 rounded-md mt-6" />
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-[20px] border-b pb-[20px]">
                Order Summary
              </h3>
              <div className="flex flex-col gap-[20px] py-[30px] font-semibold text-[14px]">
                <div className="flex justify-between">
                  <p>Items</p>
                  <p>{cartData?.totalQuantity}</p>
                </div>

                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>
                    ${" "}
                    {cartData?.totalQuantity *
                      cartData?.cost?.totalAmount.amount}
                  </p>
                  {/* <p>${subtotal}</p> */}
                </div>

                <div className="flex justify-between text-[16px] border-t pt-[20px]">
                  <p>TOTAL COST</p>${" "}
                  {cartData?.totalQuantity * cartData?.cost?.totalAmount.amount}
                </div>

                {pathname.includes("cart") && (
                  <button
                    onClick={() => {
                      if (!cartData?.checkoutUrl) return;
                      window.location.href = cartData?.checkoutUrl;
                    }}
                    className="py-[12px] w-full bg-[#393280] rounded-md"
                  >
                    Proceed to Checkout
                  </button>
                )}

                {/* <button className="py-[12px] w-full bg-[#393280] rounded-md">
                  CHECKOUT
                </button> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carthetail;
