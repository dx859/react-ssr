import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { queryString } from "../utils/urlUtils";
import { connect } from "react-redux";
import { fetchWebConfig } from "../stores/webConfig";
import Layout from "../views/Layout";
import NotFound from "../views/NotFound/NotFound";

class App extends Component {
  componentDidMount() {
    let qs = queryString(window.location.search);
    this.props.fetchWebConfig();
  }

  render() {
    return (
      <Switch>
        <Route
          key="redirect"
          exact
          path="/hello"
          render={() => <Redirect to="/znjs" />}
        />
        <Route key="/404" path="/404" component={NotFound} />
        <Route key="/" path="/:tenant" component={Layout} />
      </Switch>
    );
  }
}

export default connect(
  null,
  { fetchWebConfig }
)(App);
