import { React, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { autoLogin } from "../utils/users.js";
import { ImSpinner10 } from "react-icons/im";

export const Auth = ({ children }) => {
  const location = useLocation();
  const { user, setUser } = useUser();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      if (!user?._id) {
        const loggedInUser = await autoLogin();
        if (loggedInUser?._id) {
          setUser(loggedInUser);
        }
      }
      setChecking(false);
    };
    verifyUser();
  }, [user?._id]);
  // return user?._id ? (
  //   children
  // ) : (
  //   <Navigate to="/" replace state={{ from: location }} />
  // );
  if (checking) {
    return (
      <div className="loadingOverlay">
        <ImSpinner10 className="spinnerIcon" />
      </div>
    );
  }

  if (!user?._id) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
};
