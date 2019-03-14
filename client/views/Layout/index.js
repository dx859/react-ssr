import React from "react";
import Header from "./Header/";
import Footer from "./Footer";
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";

const Layout = props => {
  console.log("render=Layout");
  return (
    <>
      <Header />
      <Switch>{renderRoutes(props.route.routes)}</Switch>
      <Footer />
    </>
  );
};

export default Layout;
