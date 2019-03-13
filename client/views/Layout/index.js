import React from "react";
import Header from "./Header/";
import Footer from "./Footer";

const Layout = () => {
  console.log("render=Layout");
  return (
    <>
      <Header />
      <div style={{ height: 1000 }}> </div>
      <Footer />
    </>
  );
};

export default Layout;
