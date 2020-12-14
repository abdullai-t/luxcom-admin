import Axios from "axios";

import { SAVE_USER_DATA_TO_STATE, DASHBOARD_FULL_DATA_URL, SAVE_DASHBOARD_DATA_TO_STATE } from "../Konstants";

export const saveUserInfoInStateAction = (userData) => {
  return { type: SAVE_USER_DATA_TO_STATE, payload: userData };
};

export const getDashboardDataAction = () => {
  return async function (dispatch) {
    Axios.get(DASHBOARD_FULL_DATA_URL).then(res=>{
      return dispatch({ type: SAVE_DASHBOARD_DATA_TO_STATE, payload: res.data });
    })    
  };
};
