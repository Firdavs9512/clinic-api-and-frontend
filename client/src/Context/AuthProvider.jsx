import React, { createContext, useContext, useState } from "react";

const Context = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("_token"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    token,
    setToken,
    user,
    setUser,
    isLoading,
    setIsLoading,
  };
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);
