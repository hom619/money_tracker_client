import React from "react";
import { Navigate } from "react-router-dom";

export const Auth = ({ children }) => {
  const isLoggedin = false;
  return isLoggedin ? children : <Navigate to="/" replace />;
};
