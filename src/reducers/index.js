import { combineReducers } from "redux";
import { apiUrl, activeResourceName, resource, resourceModel, resourceData, resourceFields } from "./resources";
import { files, activeDirectory } from "./files";
import { user } from "./auth";

//const url = 'http://localhost:8000';
const url = 'http://nessbox.local:8000';
const baseUrl = (state = url, action) => {
  return state;
};

const appUrl = (state = 'http://localhost:3000', action) => {
  return state;
};

const activeRow = (state = null, action) => {
  switch (action.type) {
    case "SET_ACTIVE_ROW":
      return action.activeRow;
    default:
      return state;
  }
};

const reducers = combineReducers({
  /* resources.js */
  apiUrl,
  activeResourceName,
  resourceData,
  resourceFields,
  resource,
  resourceModel,
  /* files.js */
  files,
  activeDirectory,
  /* auth.js */
  user,
  /* index.js */
  baseUrl,
  appUrl,
  activeRow,
});

export {url};
export default reducers;
