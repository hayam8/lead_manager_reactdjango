import { GET_LEADS, DELETE_LEAD } from "../actions/types.js";

const initialState = {
  leads: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload
      };
    // filters leads to any whose id does not match payload id
    // deletes any lead whose id matches payload id
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter(lead => lead.id !== action.payload)
      };

    default:
      return state;
  }
}
