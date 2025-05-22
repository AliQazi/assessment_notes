import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  let auth = localStorage.getItem('token')
  return auth ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoutes;
