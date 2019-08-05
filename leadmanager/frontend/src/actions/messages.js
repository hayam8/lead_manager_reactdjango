import { CREATE_MESSAGE } from "./types";

// CREATE MESSAGE for deleting/adding lead
export const createMessage = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  };
};
