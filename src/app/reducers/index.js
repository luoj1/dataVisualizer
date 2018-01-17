import {combineReducers} from 'redux'
import * as getJson from './dict'
const appReducer = combineReducers(
  getJson
);
export default appReducer;
