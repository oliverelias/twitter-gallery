export default (
  state = {
    loadingMoreTweets: false,
    loadingNewPage: false,
    lastId: null,
    data: [],
  },
  action
) => {
  switch (action.type) {
    case "NEW_TWEETS":
      return {
        ...state,
        loadingMoreTweets: false,
        loadingNewPage: false,
        lastId: action.payload[action.payload.length - 1].id,
        data: action.payload,
      };

    case "LOADING_MORE_TWEETS":
      return { ...state, loadingMoreTweets: true };

    case "LOADING_NEW_TWEETS":
      return { ...state, data: [], loadingNewPage: true };

    case "MORE_TWEETS":
      return {
        ...state,
        loadingMoreTweets: false,
        lastId: action.payload[action.payload.length - 1].id,
        data: [...state.data, ...action.payload],
      };

    case "LIKE_TWEET":
      return {
        ...state,
        data: [
          ...state.data.map(tweet =>
            tweet.id === action.payload.id
              ? { ...tweet, favorited: true, changed: true }
              : tweet
          ),
        ],
      };
    case "UNLIKE_TWEET":
      return {
        ...state,
        data: [
          ...state.data.map(tweet =>
            tweet.id === action.payload.id
              ? { ...tweet, favorited: false, changed: true }
              : tweet
          ),
        ],
      };
    case "LIKE_FAILED": {
      console.error(`Error: ${action.payload.message}`);
      return {
        ...state,
        data: [
          ...state.data.map(tweet =>
            tweet.id === action.payload.id
              ? { ...tweet, favorited: !tweet.favorited, changed: false }
              : tweet
          ),
        ],
      };
    }
    case "RETWEET_TWEET":
      return {
        ...state,
        data: [
          ...state.data.map(tweet =>
            tweet.id === action.payload.id
              ? { ...tweet, retweeted: true, changed: true }
              : tweet
          ),
        ],
      };
    case "UNRETWEET_TWEET":
      return {
        ...state,
        data: [
          ...state.data.map(tweet =>
            tweet.id === action.payload.id
              ? { ...tweet, retweeted: false, changed: true }
              : tweet
          ),
        ],
      };
    case "RETWEET_FAILED": {
      console.error(`Error: ${action.payload.message}`);
      return {
        ...state,
        data: [
          ...state.data.map(tweet =>
            tweet.id === action.payload.id
              ? { ...tweet, retweeted: !tweet.retweeted, changed: false }
              : tweet
          ),
        ],
      };
    }
    default:
      return state;
  }
};
