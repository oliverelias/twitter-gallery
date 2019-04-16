import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

/**
 * Get new tweets from the
 * @param { string } query   username to fetch tweets from
 * @param { bool }   lastId  whether to get new tweets or append
 */
export const getUserTweets = (query, lastId) => async dispatch => {
  if (lastId) dispatch({ type: "FETCHING_TWEETS" });
  const response = await axios.get(
    `/api/user_timeline/${query}${lastId ? `?max_id=${lastId}` : ""}`
  );
  dispatch({
    type: lastId ? "MORE_TWEETS" : "NEW_TWEETS",
    // omit first tweet because same as last in previous request
    payload: lastId ? response.data.tweets.slice(1) : response.data.tweets,
  });
};

export const getAuthentication = () => async dispatch => {
  const user = await axios.get(`/api/current_user`);
  dispatch({
    type: "GET_AUTHENTICATION",
    payload: user.data
      ? { ...user.data, authenticated: true }
      : { authenticated: false },
  });
};

export const handleLike = (id, tweet) => async dispatch => {
  const url = tweet.liked ? `/api/unfavorite/${id}` : `/api/favorite/${id}`;
  const response = await axios.get(url);
  dispatch({
    type: tweet.liked ? "LIKE_TWEET" : "UNLIKE_TWEET",
    payload: { id, liked: tweet.liked, status: response.status },
  });
};

export const handleDrawerToggle = open => {
  return {
    type: "DRAWER_TOGGLE",
    payload: !open,
  };
};

// export const fetchUser = id => async dispatch => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// };
