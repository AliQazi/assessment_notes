import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import AddNotes from "./pages/AddNotes.jsx";
import Notes from "./pages/Notes.jsx";
import UpdateNotes from "./pages/UpdateNotes.jsx";
import { isTokenExpired, logoutUser } from "./utils/auth.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const interval = setInterval(() => {
      if (isTokenExpired()) {
        toast.warn("Session expired. Please login again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        console.log("first", 1 + 1);
        clearInterval(interval);
        setTimeout(() => {
          logoutUser();
          navigate("/");
        }, 5000);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/add-notes" element={<AddNotes />} />
          <Route path="/updateNote/:id" element={<UpdateNotes />} />
          <Route path="/viewNotes" element={<Notes />} />
          <Route path="*" element={<h1> 404 - page not found </h1>} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
