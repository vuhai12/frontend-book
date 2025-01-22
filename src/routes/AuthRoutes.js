import { createBrowserHistory } from "history";
import { jwtDecode } from "jwt-decode";

const ProtectedRouteAuth = (props) => {
  const token = localStorage?.getItem("access_token");
  const history = createBrowserHistory();
  const roleCode = () => {
    if (token) {
      const { role_code } = jwtDecode(token);
      return role_code;
    }
  };
  if (token && roleCode()) {
    history.back();
  } else {
    return <>{props.children}</>;
  }
};

export default ProtectedRouteAuth;
