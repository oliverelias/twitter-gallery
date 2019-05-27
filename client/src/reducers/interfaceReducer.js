export default (
  state = { mobileDrawerOpen: false, modalOpen: false, modalContent: {} },
  action
) => {
  switch (action.type) {
    case "DRAWER_TOGGLE":
      return { ...state, mobileDrawerOpen: action.payload };
    case "OPEN_MODAL":
      return { ...state, modalOpen: true, modalContent: action.payload };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false };

    default:
      return state;
  }
};
