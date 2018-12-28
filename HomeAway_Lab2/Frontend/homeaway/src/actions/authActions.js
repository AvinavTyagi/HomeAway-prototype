import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { bindActionCreators } from "redux";
import store from '../store';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import rootURL from '../config/urlRoot';
const ROOT_URL = rootURL.ROOT_URL;
export const FETCH_BOOKS = "fetch_books";
export const OWNER_LOGIN = "owner_login";


// Register User
export const registerUser = (values, history) => dispatch => {
    axios
    .post(`${ROOT_URL}/api/users/register`, values)
      .then(res => history.push('/ownerLogin'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
// export function registerUser(values, history) {
//     const request = axios
//         .post(`${ROOT_URL}/api/users/register`, values)
//         .then(res => history.push('/ownerLogin'));

//     return {
//         type: FETCH_BOOKS,
//         payload: request
//     };
// }
export const ownerLoginAction = (values, history) => dispatch => {
    var searchLocation = "searchLocation";
    let loc = store.getState().auth.searchLocation;
    values.searchLocation = loc;
    console.log("VALUES: " + JSON.stringify(values));
    const request = axios
        .post(`${ROOT_URL}/api/users/login`, values, { withCredentials: true })
        .then((res) => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            //Decode token to get user data
            const decoded = jwt_decode(token);
            console.log("decoded token: " + JSON.stringify(decoded));
            // Set current user
            dispatch(setCurrentUser(decoded));
            history.push('/');
        });
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

const updateSearchLocation = searchLocation => ({
    type: "CHANGE_LOCATION",
    payload: searchLocation
});
export const actionCreators = bindActionCreators(
    {
        updateSearchLocation
    },
    store.dispatch
);
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};