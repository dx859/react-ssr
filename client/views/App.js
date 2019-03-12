import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { queryString } from "../utils/urlUtils";
import { connect } from "react-redux";
import { fetchWebConfig } from "../stores/webConfig";
import Layout from "./Layout";

const App = props => {
  useEffect(() => {
    let qs = queryString(window.location.search);
    props.fetchWebConfig();
  }, []);
  console.log("render=>App");

  return (
    <>
      <Route path="/:tenant" component={Layout} />
    </>
  );
};

export default connect(
  null,
  { fetchWebConfig }
)(App);
