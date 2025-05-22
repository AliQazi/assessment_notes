import React from "react";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
    <Navbar />
      <main style={{ minHeight: "80vh" }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
