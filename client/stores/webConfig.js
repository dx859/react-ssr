import apiFetch from "../utils/apiFetch";
import api from "./api";
import { getLocalData } from "../utils/localStore";

export const FETCH_CONFIG = "FETCH_CONFIG";

export const fetchWebConfig = () => ({
  type: FETCH_CONFIG,
  payload: apiFetch(api.getWebConfig)
});

const defaultState = {
  isFetching: false,
  error: "",
  primaryColor: "#009335",
  setting: {},
  logoFilePath: "",
  loginFilePath: "",
  developer: {}
};

function webConfig(state = defaultState, action) {
  switch (action.type) {
    case `${FETCH_CONFIG}_PENDING`:
      return { ...state, isFetching: true };
    case `${FETCH_CONFIG}_FULFILLED`:
      return {
        ...state,
        error: "",
        isFetching: false,
        primaryColor: action.payload.theme.primaryTheme.theme,
        loginFilePath: action.payload.systemLink.loginFilePath,
        logoFilePath: action.payload.systemLink.logoFilePath,
        developer: action.payload.developer,
        setting: action.payload.setting
      };
    case `${FETCH_CONFIG}_REJECTED`:
      return { ...state, error: action.payload.msg, isFetching: false };
    default:
      return state;
  }
}

export default webConfig;
