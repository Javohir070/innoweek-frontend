
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "@/assets/css/main.css";
interface IlayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<IlayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
