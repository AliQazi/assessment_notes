import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

const ProtectedRoutes = () => {
  let auth = !isTokenExpired();
  return auth ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoutes;
