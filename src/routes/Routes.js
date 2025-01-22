import Home from "../pages/homePage/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import BookDetail from "../pages/book/BookDetail";
import CartDetail from "../pages/cart/CartDetail";
import Payment from "../pages/payment/Payment";
import UserInfo from "../pages/userPage/UserInfo/UserInfo";
import UserOrder from "../pages/userPage/UserOrder/UserOrder";
import AminOrder from "../pages/adminPage/AminOrder/AminOrder";
import AminUser from "../pages/adminPage/AminUser/AminUser";
import AminBook from "../pages/adminPage/AminBook/AminBook";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const routeAdmin = [
  {
    path: "/system-admin-book",
    page: AminBook,
    isSidebar: true,
  },
  {
    path: "/system-admin-order",
    page: AminOrder,
    isSidebar: true,
  },
  {
    path: "/system-admin-user",
    page: AminUser,
    isSidebar: true,
  },
  {
    path: "/admin-info",
    page: UserInfo,
    isSidebar: true,
  },
];

export const routeUser = [
  {
    path: "/checkout-payment",
    page: Payment,
  },
  {
    path: "/cart",
    page: CartDetail,
  },
  {
    path: "/user-order",
    page: UserOrder,
    isSidebar: true,
  },
  {
    path: "/user-info",
    page: UserInfo,
    isSidebar: true,
  },
];

export const routePublic = [
  {
    path: "/category-:code",
    page: Home,
  },
  {
    path: "/",
    page: Home,
  },
  {
    path: "/book-:id",
    page: BookDetail,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];

export const routeAuth = [
  {
    path: "/login",
    page: Login,
    isShowHeader: true,
  },
  {
    path: "/register",
    page: Register,
    isShowHeader: true,
  },
];
