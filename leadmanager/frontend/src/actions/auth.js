// action functions for authentication
import axios from "axios";
import { returnErrors } from "./messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING }); // changes isLoading value to true

  // create request to load user
  axios
    .get("/api/auth/user", tokenConfig(getState))
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

// LOGIN USER
export const login = (username, password) => dispatch => {
  // Headers for requests
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  // create request to load user
  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      // incorrect credentials
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => dispatch => {
  // Headers for requests
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, password, email });

  // create request to load user
  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  // create request to load user
  axios
    .post("/api/auth/logout", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      // incorrect credentials
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

/**
 * Setup config with token - helper function
 */
export const tokenConfig = getState => {
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

  return config;
};
