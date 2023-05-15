import React from "react";
import { Navigate } from "react-router-dom";

const IndexPage = () => {
  return <Navigate to={"/login"} />;
};

export default IndexPage;
