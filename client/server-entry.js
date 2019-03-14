import React from "react";
import { StaticRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { getServerStore } from "./stores/index";
import routes from "./routes";
import { renderRoutes } from "react-router-config";

const createApp = (url, store, routerContext) => {
  return (
    <Provider store={store}>
      <StaticRouter location={url} context={routerContext}>
        <>{renderRoutes(routes)}</>
      </StaticRouter>
    </Provider>
  );
};

export { createApp, getServerStore, routes };
