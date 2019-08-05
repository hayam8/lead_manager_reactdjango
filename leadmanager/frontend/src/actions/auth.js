// action functions for authentication
import axios from "axios";
import { returnErrors } from "./messages";

import { USER_LOADED, USER_LOADING, AUTH_ERROR } from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING }); // changes isLoading value to true

  // Get token from state
  const token = getState().auth.token;

  // Headers for requests
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // if token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  // create request to load user
  axios
    .get("/api/auth/user", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      // incorrect credentials
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        // call auth error to reset values
        type: AUTH_ERROR
      });
    });
};
