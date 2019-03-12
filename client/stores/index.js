import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import webConfig from "./webConfig";

const reducer = combineReducers({
  webConfig: webConfig
});

export const getClientStore = (window = {}) => {
  const defaultState =
    window.context && window.context.state ? window.context.state : {};
  return window.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
        reducer,
        defaultState,
        compose(
          applyMiddleware(promise, thunk),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      )
    : createStore(reducer, defaultState, applyMiddleware(promise, thunk));
};

export const getServerStore = () => {
  return createStore(reducer, applyMiddleware(promise, thunk));
};
