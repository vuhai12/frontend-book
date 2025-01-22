import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Button({ token }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <>
      {!token ? (
        <Link to="/login">
          <button className="btn-auth">Sign Up</button>
        </Link>
      ) : (
        <div>
          <button onClick={handleLogout} className="btn-auth">
            Logout
          </button>
        </div>
      )}
    </>
  );
}
