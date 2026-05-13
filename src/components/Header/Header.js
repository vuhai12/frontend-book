import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import classNames from "classnames";
import logo from "../../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../redux/slides/cartSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState();

  const dispatch = useDispatch();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const cartId = localStorage.getItem("shopify_cart_id");

    console.log("cartId", cartId);

    if (cartId) {
      dispatch(getCartThunk(cartId));
    }
  }, []);

  const dataMenu = [
    { id: 1, title: "HOME", path: "/" },
    { id: 2, title: "ABOUT US", path: "/about-us" },
    { id: 3, title: "BOOKS", path: "/list-books" },
    { id: 4, title: "BLOG", path: "/list-blogs" },
  ];

  const isListBook = location.pathname === "/list-books";

  const handleSearch = () => {
    const param = new URLSearchParams(searchParams);
    param.set("search", keyword);
    setSearchParams(param);
  };

  const { cart: cartData, loading, error } = useSelector((state) => state.cart);

  const totalQuantity = cartData?.totalQuantity || 0;

  console.log("cartData", cartData);
  console.log("totalQuantity", totalQuantity);

  return (
    <>
      <nav className="w-full border-b bg-white">
        <div className="container flex items-center justify-between py-4 px-[10px] md:px-0">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-[60px]" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center">
            {dataMenu.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  classNames(
                    "px-5  border-r border-gray-300 last:border-none",
                    isActive && "text-[#ED553B] font-semibold",
                  )
                }
              >
                {item.title}
              </NavLink>
            ))}
          </ul>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className="cursor-pointer">
              <User size={24} />
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />

              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 w-4 h-4 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
            {/* <Link to="/cart">
              <ShoppingCart size={20} />
            </Link> */}
          </div>

          {/* Mobile Icon Bar */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Search bar if list-books */}
        {isListBook && (
          <div className="container pb-8 px-[10px] md:px-0 flex justify-center">
            <div className="flex w-full max-w-[500px] shadow-sm ">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search books..."
                className="flex-1 py-3 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#ED553B]"
              />

              <button
                onClick={handleSearch}
                className="bg-[#ED553B] text-white px-6 rounded-r-lg hover:bg-[#d44a32] transition-colors flex items-center justify-center"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full w-[250px] bg-white shadow-lg p-6 transform transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <img src={logo} alt="logo" className="w-[60px]" />
            <button onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <ul className="flex flex-col gap-6">
            {dataMenu.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  classNames(
                    "text-gray-700",
                    isActive && "text-[#ED553B] font-semibold",
                  )
                }
              >
                {item.title}
              </NavLink>
            ))}
          </ul>

          <div className="mt-8 border-t pt-6 flex flex-col gap-4">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-3">
                <User size={18} />
                Account
              </div>
            </Link>

            <Link to="/cart" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-3">
                <ShoppingCart size={18} />
                Cart
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
