import axios from "axios";

const _getTweets = (query, flush) => async (dispatch, getState) => {
  const response = await axios.get(query);

  dispatch({
    type: flush ? "NEW_TWEETS" : "MORE_TWEETS",
    // omit first tweet because same as last in previous request
    payload: flush ? response.data.tweets : response.data.tweets.slice(1),
  });
};

export const getNewTweets = query => dispatch => {
  dispatch({ type: "LOADING_NEW_TWEETS" });
  dispatch(_getTweets(query, true));
};

export const getMoreTweets = query => (dispatch, getState) => {
  dispatch({ type: "LOADING_MORE_TWEETS" });
  dispatch(_getTweets(`${query}?max_id=${getState().tweets.lastId}`), false);
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

export const handleLike = tweet => async dispatch => {
  const url = tweet.favorited
    ? `/api/unfavorite/${tweet.id}`
    : `/api/favorite/${tweet.id}`;
  dispatch({
    type: tweet.favorited ? "UNLIKE_TWEET" : "LIKE_TWEET",
    payload: { id: tweet.id },
  });
  const response = await axios.get(url);
  if (response.status !== 200) {
    dispatch({
      type: "LIKE_FAILED",
      id: tweet.id,
      message: `unable to ${tweet.favorited ? "unlike" : "like"} tweet.`,
    });
  }
};

export const handleRetweet = tweet => async dispatch => {
  const url = tweet.retweeted
    ? `/api/unretweet/${tweet.id}`
    : `/api/retweet/${tweet.id}`;
  dispatch({
    type: tweet.retweeted ? "UNRETWEET_TWEET" : "RETWEET_TWEET",
    payload: { id: tweet.id },
  });
  const response = await axios.get(url);
  if (response.status !== 200) {
    dispatch({
      type: "RETWEET_FAILED",
      id: tweet.id,
      message: `unable to ${tweet.retweeted ? "unretweet" : "retweet"} tweet.`,
    });
  }
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
