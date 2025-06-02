import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // assuming you store user in Redux here
  // Check if user exists and maybe token cookie is present too if you want
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
