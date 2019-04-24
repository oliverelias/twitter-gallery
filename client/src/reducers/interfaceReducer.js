export default (state = { mobileDrawerOpen: false }, action) => {
  switch (action.type) {
    case "DRAWER_TOGGLE":
      return { ...state, mobileDrawerOpen: action.payload };

    default:
      return state;
  }
};
