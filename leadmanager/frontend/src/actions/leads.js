import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

// action method for GET LEADS with get request called in leads component
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("/api/leads/", tokenConfig(getState)) // sends token for protected routes
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE LEAD - Action method to delete a lead with delete request
export const deleteLead = id => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteLead: "Lead Deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD LEAD - Action method to ADD a LEAD with post request
export const addLead = lead => (dispatch, getState) => {
  axios
    .post("/api/leads/", lead, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addLead: "Lead Added" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
