import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("access_token");
const roleCode = () => {
  if (token) {
    const { role_code } = jwtDecode(token);
    return role_code;
  }
};

export const MenuItems = [
  {
    title: "Tài khoản",
    path:
      token && roleCode() == "R1"
        ? "/system-admin-user"
        : token && roleCode() == "R2"
        ? "/user-info"
        : "/login",
    cName: "dropdown-link",
  },
  {
    title: "Đơn hàng",
    path:
      token && roleCode() == "R1"
        ? "/system-admin-order"
        : token && roleCode() == "R2"
        ? "/user-order"
        : "/login",
    cName: "dropdown-link",
  },
];
