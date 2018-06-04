import axios from "axios";

export const fetchFiles = path => {
  return (dispatch, getState) => {
    const url = getState().baseUrl + "/files";

    axios.post(url, { path }).then(result => {
      return dispatch({
        type: "SET_FILES",
        files: result.data
      });
    });
  };
};

export const setActiveDirectory = activeDirectory => {
  return {
    type: "SET_ACTIVE_DIRECTORY",
    activeDirectory
  };
};
