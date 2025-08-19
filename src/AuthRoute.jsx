import React, { useContext } from "react";
import { UserContext } from "./Context";
import { Navigate } from "react-router-dom";
import Loader from "./comp/loader/Loader";

const AuthRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (user === null) {
    return <Loader />; // still loading
  }

  if (user === false || !token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
