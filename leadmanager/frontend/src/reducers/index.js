// leads reducer hands down state having to do with leads
// auth reducer for authentication
// errors reducer for errors

import { combineReducers } from "redux";
import leads from "./leads";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  leads,
  errors,
  messages
});
