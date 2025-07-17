"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "@/assets/css/main.css";
import { ToastContainer } from "react-toastify";

interface IlayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<IlayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <ToastContainer position="top-right" autoClose={4000} theme="dark"  />
    </div>
  );
};

export default Layout;
