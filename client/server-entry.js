import React from "react";
import { StaticRouter } from "react-router-dom";
import App from "./views/App";
import { Provider } from "react-redux";
import { getServerStore } from "./stores";

const defaultStore = getServerStore();

const createApp = (path, store = defaultStore) => {
  return (
    <Provider store={store}>
      <StaticRouter location={path} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  );
};

export default createApp;

export { createApp };
