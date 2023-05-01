import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducer";
import slider from "./sliderReducer";

export default combineReducers({
  auth,
  token,
  users,
  slider,
});
