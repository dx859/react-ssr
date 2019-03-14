import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import webConfig from "./webConfig";
import homeReducer from "../views/Home/store/reducer";
import apiServerFetch from "../utils/apiServerFetch";
import apiFetch from "../utils/apiFetch";

const reducer = combineReducers({
  webConfig: webConfig,
  home: homeReducer
});

export const getClientStore = (window = {}) => {
  const defaultState =
    window.__INITIAL__STATE__ && window.__INITIAL__STATE__
      ? window.__INITIAL__STATE__
      : {};

  return window.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
        reducer,
        defaultState,
        compose(
          applyMiddleware(thunk.withExtraArgument(apiFetch)),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      )
    : createStore(
        reducer,
        defaultState,
        applyMiddleware(thunk.withExtraArgument(apiFetch))
      );
};

export const getServerStore = (apiPrefix, tenant) => {
  return createStore(
    reducer,
    applyMiddleware(
      thunk.withExtraArgument(apiServerFetch(apiPrefix, tenant))
    )
  );
};
