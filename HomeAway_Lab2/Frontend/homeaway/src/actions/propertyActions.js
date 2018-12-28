import axios from 'axios';

import { GET_ERRORS } from './types';
import store from '../store';
import {
  SET_SEARCH_RESULTS,SET_PROPERTY_DETAILS
} from './types';
import rootURL from '../config/urlRoot';
const ROOT_URL = rootURL.ROOT_URL;
//const ROOT_URL = "http://localhost:3001";

export const createProperty = (values,history) => dispatch => {
  axios
    .post(`${ROOT_URL}/api/property/createProperty`,values)
    .then(res =>history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loadProperty = (id) => dispatch => {
  let data = {
    id: id
  }
  axios
    .post(`${ROOT_URL}/api/property/getPropertyDetails`,data)
    .then(res =>{
      dispatch(setPropertyDetails(res));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const addBooking = (values,history) => dispatch => {
  console.log(values);
  axios
    .post(`${ROOT_URL}/api/property/addBooking`,values)
    .then(res =>{
      console.log(res);
      dispatch(setPropertyDetails(res));
      history.push('/');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Search Properties Profile
export const searchProperties = (values,history) => dispatch => {
  let searchCity = store.getState().auth.searchLocation;
  //console.log("CITY FROM STATE" + searchCity);
  values.city = searchCity;
  axios
    .post(`${ROOT_URL}/api/property/search`, values)
    .then(res => {
      dispatch(setSearchResults(res));
      history.push('/searchResults')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Clear profile
export const setSearchResults = (results) => {
  return {
    type: SET_SEARCH_RESULTS,
    payload :  results
  };
};
export const setPropertyDetails = (results) => {
  return {
    type: SET_PROPERTY_DETAILS,
    payload :  results
  };
};
