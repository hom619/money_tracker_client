import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export const Auth = ({ children }) => {
  const location = useLocation();
  const { user } = useUser();
  return user?._id ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
