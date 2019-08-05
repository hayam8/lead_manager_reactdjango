import { USER_LOADED, USER_LOADING, AUTH_ERROR } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true, // successful login
        isLoading: false, // reset var because login successful no longer loading
        user: action.payload
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        // reset values unsuccessful login
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
