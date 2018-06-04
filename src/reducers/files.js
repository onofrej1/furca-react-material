export const files = (state = null, action) => {
  switch (action.type) {
    case "SET_FILES":
      return action.files;
    default:
      return state;
  }
};

export const activeDirectory = (state = {}, action) => {
  switch (action.type) {
    case "SET_ACTIVE_DIRECTORY":
      return { ...action.activeDirectory };
    default:
      return state;
  }
};
