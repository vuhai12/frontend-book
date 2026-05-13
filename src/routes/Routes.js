import { lazy } from "react";

export const routePublic = [
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
    path: "/list-books",
    page: lazy(() => import("../pages/ListBooks/index")),
  },
  {
    path: "/list-books/:handle",
    page: lazy(() => import("../pages/BookItem/index")),
  },
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
    path: "*",
    page: lazy(() => import("../pages/NotFoundPage/NotFoundPage")),
  },
];
