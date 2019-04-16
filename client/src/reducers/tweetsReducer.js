export default (state = [], action) => {
  switch (action.type) {
    case "NEW_TWEETS":
      return action.payload;
    default:
      return state;
  }
};
