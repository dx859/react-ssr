import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getClientStore } from "./stores";
import { renderRoutes } from "react-router-config";
import routes from "./routes";

const store = getClientStore(window);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <>{renderRoutes(routes)}</>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
