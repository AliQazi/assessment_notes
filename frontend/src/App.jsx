import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import AddNotes from "./pages/AddNotes.jsx";
import Notes from "./pages/Notes.jsx";
import UpdateNotes from "./pages/UpdateNotes.jsx";

const App = () => {
  return (
    <>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/add-notes" element={<AddNotes />} />
            <Route path="/updateNote/:id" element={<UpdateNotes />} />
            <Route path="/viewNotes" element={<Notes />} />
            <Route path="*" element={<h1>404 - page not found</h1>} />
          </Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </>
  );
};

export default App;
