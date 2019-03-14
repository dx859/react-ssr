import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import "./App.css";
import { queryString } from "../utils/urlUtils";
import { connect } from "react-redux";
import { fetchWebConfig } from "../stores/webConfig";

const App = props => {
  useEffect(() => {
    let qs = queryString(window.location.search);
    if (!props.hasData) {
      props.fetchWebConfig();
    }
  }, []);

  return <Switch>{renderRoutes(props.route.routes)}</Switch>;
};

App.loadData = store => {
  return store.dispatch(fetchWebConfig());
};

export default connect(
  state => ({ hasData: state.webConfig.hasData }),
  { fetchWebConfig }
)(App);
