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
        loadingMoreTweets: false,
        lastId: action.payload[action.payload.length - 1].id,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
};
