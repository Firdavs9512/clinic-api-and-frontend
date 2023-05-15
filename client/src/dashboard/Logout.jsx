import React from "react";
import { useAuth } from "../Context/AuthProvider";
import { Navigate } from "react-router-dom";

function Logout() {
  const { setUser, setToken } = useAuth();
  setUser([]);
  setToken("");
  localStorage.removeItem("_token");
  localStorage.removeItem("user");

  return <Navigate to={"/login"} replace={true} />;
}

export default Logout;
