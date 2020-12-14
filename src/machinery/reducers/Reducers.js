import { SAVE_USER_DATA_TO_STATE, SAVE_DASHBOARD_DATA_TO_STATE } from "../Konstants";

export const saveUserInfoToStateReducer = (state={}, action)=>{
    if (action.type === SAVE_USER_DATA_TO_STATE) {
      return action.payload;
    }
    return state;
  };

  export const getDashboardDataReducer = (state = {}, action) => {
    if (action.type === SAVE_DASHBOARD_DATA_TO_STATE) {
      return action.payload;
    }
    return state;
  };