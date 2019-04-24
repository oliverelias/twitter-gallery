import { combineReducers } from "redux";
import tweetsReducer from "./tweetsReducer";
import authReducer from "./authReducer";
import interfaceReducer from "./interfaceReducer";

export default combineReducers({
  tweets: tweetsReducer,
  auth: authReducer,
  interface: interfaceReducer,
});
