import { Navigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { jwtDecode } from "jwt-decode";

const ProtectedRouteUser = (props) => {
  const token = localStorage?.getItem("access_token");
  const history = createBrowserHistory();
  if (!token) return <Navigate to="/login" />;
  const { role_code } = jwtDecode(token);
  if (role_code === "R2") {
    return <>{props.children}</>;
  } else {
    history.back();
    // return <Navigate to="/" />;
  }
};

export default ProtectedRouteUser;
