import _ from "lodash";
import { FETCH_BOOKS, OWNER_LOGIN } from "../actions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 
    case OWNER_LOGIN:
    // var map = _.mapKeys(action.payload.status, "Email");
    // console.log("Map " + JSON.stringify(map));
      return state;
    default:
      return state;
  }
}
