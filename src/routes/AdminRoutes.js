import { Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { jwtDecode } from "jwt-decode";

const ProtectedRouteAdmin = (props) => {
  const token = localStorage?.getItem("access_token");
  const getRoleCode = () => {
    if (token) {
      const { role_code } = jwtDecode(token);
      return role_code;
    }
  };

  const history = createBrowserHistory();

  if (!token) return <Navigate to="/login" />;

  if (getRoleCode() === "R1") {
    return <>{props.children}</>;
  } else {
    history.back();
  }
};

export default ProtectedRouteAdmin;
