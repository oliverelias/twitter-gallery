export default (state = { loading: false, lastId: null, data: [] }, action) => {
  switch (action.type) {
    case "NEW_TWEETS":
      return {
        loading: false,
        lastId: action.payload[action.payload.length - 1].id,
        data: action.payload,
      };

    case "FETCHING_TWEETS":
      return { ...state, loading: true };

    case "MORE_TWEETS":
      return {
        loading: false,
        lastId: action.payload[action.payload.length - 1].id,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
};
