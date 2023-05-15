import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from "axios";

const PrivitedRoute = ({ children }) => {
  const { token, setToken, user, setUser } = useAuth();
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (user?.length < 2 || !localStorage.getItem('user')) {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND}/user/information`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        console.log(res);
        
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          localStorage.removeItem("_token");
          setToken("");
          return <Navigate to={"/login"} replace={true} />;
        }
      });
  }

  return children;
};

export default PrivitedRoute;
