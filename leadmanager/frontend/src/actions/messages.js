import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// CREATE MESSAGE for deleting/adding lead
export const createMessage = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  };
};

// RETURN errors
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  };
};
