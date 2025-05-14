import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export const Auth = ({ children }) => {
  const { user } = useUser();
  return user?._id ? children : <Navigate to="/" replace />;
};
