import { lazy } from "react";

export const routeAdmin = [
  {
    path: "/system-admin-book",
    page: lazy(() => import("../pages/adminPage/AminBook/AminBook")),
    isSidebar: true,
  },
  {
    path: "/system-admin-order",
    page: lazy(() => import("../pages/adminPage/AminOrder/AminOrder")),
    isSidebar: true,
  },
  {
    path: "/system-admin-user",
    page: lazy(() => import("../pages/adminPage/AminUser/AminUser")),
    isSidebar: true,
  },
  {
    path: "/admin-info",
    page: lazy(() => import("../pages/userPage/UserInfo/UserInfo")),
    isSidebar: true,
  },
];

export const routeUser = [
  {
    path: "/checkout-payment",
    page: lazy(() => import("../pages/payment/Payment")),
  },
  // {
  //   path: "/cart",
  //   page: lazy(() => import("../pages/cart/CartDetail")),
  // },
  {
    path: "/user-order",
    page: lazy(() => import("../pages/userPage/UserOrder/UserOrder")),
    isSidebar: true,
  },
  {
    path: "/user-info",
    page: lazy(() => import("../pages/userPage/UserInfo/UserInfo")),
    isSidebar: true,
  },
];

export const routePublic = [
  // {
  //   path: "/category-:code",
  //   page: lazy(() => import("../pages/homePage")),
  // },
  {
    path: "/",
    page: lazy(() => import("../pages/homePage/index")),
  },
  {
    path: "/cart",
    page: lazy(() => import("../pages/CartDetail/index")),
  },
  {
    path: "/checkout",
    page: lazy(() => import("../pages/Checkout/index")),
  },
  {
    path: "/checkout/success",
    page: lazy(() => import("../pages/CheckoutSuccess/index")),
  },
  {
    path: "/about-us",
    page: lazy(() => import("../pages/AboutUs/index")),
  },
  {
    path: "/list-blogs/:id",
    page: lazy(() => import("../pages/BlogItem/index")),
  },
  {
    path: "/list-blogs",
    page: lazy(() => import("../pages/BlogList/index")),
  },
  {
    path: "/categories/:category",
    page: lazy(() => import("../pages/ListBooks/index")),
  },
  {
    path: "/list-books",
    page: lazy(() => import("../pages/ListBooks/index")),
  },
  {
    path: "/list-books/:id",
    page: lazy(() => import("../pages/BookItem/index")),
  },
  {
    path: "/book-:id",
    page: lazy(() => import("../pages/book/BookDetail")),
  },
  {
    path: "*",
    page: lazy(() => import("../pages/NotFoundPage/NotFoundPage")),
  },
];

export const routeAuth = [
  {
    path: "/login",
    page: lazy(() => import("../pages/auth/Login")),
    isShowHeader: true,
  },
  {
    path: "/register",
    page: lazy(() => import("../pages/auth/Register")),
    isShowHeader: true,
  },
  {
    path: "/forgot-password",
    page: lazy(() => import("../pages/auth/ForgotPassword")),
    isShowHeader: true,
  },
  {
    path: "/reset-password",
    page: lazy(() => import("../pages/auth/ResetPassword")),
    isShowHeader: true,
  },
];
