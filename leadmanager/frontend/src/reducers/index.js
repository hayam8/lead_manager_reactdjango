// leads reducer hands down state having to do with leads
// auth reducer for authentication
// errors reducer for errors

import { combineReducers } from "redux";
import leads from "./leads";

export default combineReducers({
  leads
});
