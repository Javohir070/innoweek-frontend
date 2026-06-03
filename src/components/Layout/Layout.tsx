
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "@/assets/css/main.css";
interface IlayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<IlayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-w-0">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
