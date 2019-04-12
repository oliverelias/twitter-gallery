import axios from "axios";

export const incrementCounter = () => {
  return { type: "INCREMENT_COUNTER" };
};

export const newTweets = query => async dispatch => {
  const response = await axios.get(`/api/user_timeline/${query}`);
  console.log(response);
  dispatch({ type: "NEW_TWEETS", payload: response.data.tweets });
};

// export const fetchUser = id => async dispatch => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// };
