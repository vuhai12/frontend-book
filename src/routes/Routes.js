import { lazy } from "react";
// import Home from "../pages/homePage/Home";
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import BookDetail from "../pages/book/BookDetail";
// import CartDetail from "../pages/cart/CartDetail";
// import Payment from "../pages/payment/Payment";
// import UserInfo from "../pages/userPage/UserInfo/UserInfo";
// import UserOrder from "../pages/userPage/UserOrder/UserOrder";
// import AminOrder from "../pages/adminPage/AminOrder/AminOrder";
// import AminUser from "../pages/adminPage/AminUser/AminUser";
// import AminBook from "../pages/adminPage/AminBook/AminBook";
// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

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
  {
    path: "/cart",
    page: lazy(() => import("../pages/cart/CartDetail")),
  },
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
  {
    path: "/category-:code",
    page: lazy(() => import("../pages/homePage/Home")),
  },
  {
    path: "/",
    page: lazy(() => import("../pages/homePage/Home")),
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
];
