import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./views/App";
import { Provider } from "react-redux";
import {getClientStore} from "./stores";

const store = getClientStore(window);

let context = {tenant: window.location.pathname.split('/')[1]}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter context={context}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
