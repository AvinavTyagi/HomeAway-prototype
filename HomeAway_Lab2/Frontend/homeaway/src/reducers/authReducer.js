import _ from "lodash";
import { FETCH_BOOKS, OWNER_LOGIN } from "../actions";
import { SET_CURRENT_USER, CHANGE_LOCATION } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  searchLocation: ''
};
//Reducer listening to different action types
export default function(state = initialState, action) {
  switch (action.type) {
    //target 
    case OWNER_LOGIN:
    // var map = _.mapKeys(action.payload.status, "Email");
    // console.log("Map " + JSON.stringify(map));
      return state;
      case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
      case CHANGE_LOCATION:
      return {
        ...state,
        searchLocation: action.payload
      };
    default:
      return state;
  }
}
