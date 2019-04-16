export default (state = { authenticated: false }, action) => {
  switch (action.type) {
    case "GET_AUTHENTICATION":
      return action.payload;

    default:
      return state;
  }
};
