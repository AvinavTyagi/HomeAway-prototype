import {
  CLEAR_CURRENT_PROFILE, CREATE_PROPERTY, SET_SEARCH_RESULTS, SET_PROPERTY_DETAILS
} from '../actions/types';
import _ from "lodash";

const initialState = {
  property: null,
  properties: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case PROFILE_LOADING:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    case CREATE_PROPERTY:
      return {
        ...state,
        property: action.payload
      };
    case SET_SEARCH_RESULTS:
      var map = _.mapKeys(action.payload.data, "_id");
      return {
        ...state,
        properties: map
      };
    case SET_PROPERTY_DETAILS:
      return {
        ...state,
        property: action.payload.data
      };
    default:
      return state;
  }
}
