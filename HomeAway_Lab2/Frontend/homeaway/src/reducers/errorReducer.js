import _ from "lodash";
import { OWNER_LOGIN } from "../actions";
import { GET_ERRORS } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {};

//Reducer listening to different action types
export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}
