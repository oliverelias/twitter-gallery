import { combineReducers } from "redux";
import tweetsReducer from "./tweetsReducer";

const counterReducer = (state = 5, action) => {
  switch (action.type) {
    case "INCREMENT_COUNTER":
      return state + 1;

    default:
      return state;
  }
};

export default combineReducers({
  counter: counterReducer,
  tweets: tweetsReducer,
});
