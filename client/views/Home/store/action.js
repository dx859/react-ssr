import api from "../../../stores/api";
import { SET_MAIN_PAGE } from "./constants";

export const setMainPage = data => ({ type: SET_MAIN_PAGE, data });
export const fetchMainPage = () =>( dispatch , getState, apiFetch)=>
  apiFetch(api.getMainPage).then(data =>{
    dispatch(setMainPage(data));
  });
