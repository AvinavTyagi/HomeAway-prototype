import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import propertyReducer from "./propertyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  profile: profileReducer,
  property: propertyReducer,
  error: errorReducer
});

export default rootReducer;
