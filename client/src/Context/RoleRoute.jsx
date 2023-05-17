import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from "axios";

const RoleRoute = ({ children, roles }) => {

  const { token, setToken, user, setUser } = useAuth();

  if (roles !== JSON.parse(user).role) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default RoleRoute;
