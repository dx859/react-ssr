import api from "./api";

export const FETCH_CONFIG = "FETCH_CONFIG";

export const fetchWebConfig = () => (dispatch, getState, apiFetch) =>{
  return apiFetch(api.getWebConfig).then(data =>
    dispatch({
      type: FETCH_CONFIG,
      payload: data
    })
  );
}


const defaultState = {
  hasData: false,
  primaryColor: "#009335",
  setting: {},
  logoFilePath: "",
  loginFilePath: "",
  developer: {}
};

function webConfig(state = defaultState, action) {
  switch (action.type) {
    case FETCH_CONFIG:
      return {
        ...state,
        hasData: true,
        primaryColor: action.payload.theme.primaryTheme.theme,
        loginFilePath: action.payload.systemLink.loginFilePath,
        logoFilePath: action.payload.systemLink.logoFilePath,
        developer: action.payload.developer,
        setting: action.payload.setting
      };
    default:
      return state;
  }
}

export default webConfig;
