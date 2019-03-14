import { SET_MAIN_PAGE } from "./constants";

const defaultState = {
  hasData: false,
  banner: []
};

function homeReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_MAIN_PAGE:
      return Object.assign({}, state, action.data, { hasData: true });
    default:
      return state;
  }
}

export default homeReducer;
