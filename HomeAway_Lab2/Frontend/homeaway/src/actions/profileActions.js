import axios from 'axios';
import rootURL from '../config/urlRoot';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

import {
  CLEAR_CURRENT_PROFILE, LOAD_PROFILE, UPDATE_PROFILE
} from './types';
const ROOT_URL = rootURL.ROOT_URL;
// Load User profile
export const loadProfile = () => dispatch => {
  axios
    .post(`${ROOT_URL}/api/profile`)
    .then(res =>
      dispatch({
        type: LOAD_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Update Profile
export const updateProfile = (values, history) => dispatch => {
  axios
    .post(`${ROOT_URL}/api/profile/updateUser`, values)
    .then(res => history.push('/')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
