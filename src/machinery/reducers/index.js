import {combineReducers} from 'redux'
import { saveUserInfoToStateReducer,getDashboardDataReducer } from './Reducers';

const motherReducer = combineReducers({
  user:saveUserInfoToStateReducer,
  dashboard:getDashboardDataReducer,
  });
  
  export default motherReducer;