import React from "react";
import { StaticRouter } from "react-router-dom";
import App from "./views/App";
import { Provider } from "react-redux";
import { getServerStore } from "./stores/index";

// react-async-bootstrapper
const createApp = (url, store, routerContext) => {
  return (
    <Provider store={store}>
      <StaticRouter location={url} context={routerContext}>
        <App />
      </StaticRouter>
    </Provider>
  );
};

export default createApp;

export { createApp, getServerStore };
