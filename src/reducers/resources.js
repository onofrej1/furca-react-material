import { url } from "./index.js";
import Models from "./../Models";

var _ = require("lodash");

export const apiUrl = (state = url, action) => {
  switch (action.type) {
    case "SET_RESOURCE_BASE_URL":
      return action.resourceBaseUrl;
    default:
      return state;
  }
};

export const activeResourceName = (state = "", action) => {
  switch (action.type) {
    case "SET_ACTIVE_RESOURCE_NAME":
      return action.activeResourceName;
    default:
      return state;
  }
};

export const resourceData = (state = {}, action) => {
  switch (action.type) {
    case "SET_RESOURCE_DATA":
      return { ...state, [action.name]: action.data };
    case "SET_RESOURCE_ROW":
      let data = state[action.name];
      let row = _.find(data, { id: action.row.id });
      if (row) {
        data = data.map(
          item => (item.id === row.id ? { ...item, ...action.row } : item)
        );
      } else {
        data = [...data, action.row];
      }

      return { ...state, [action.name]: data };
    default:
      return state;
  }
};

export const resourceFields = (state = {}, action) => {
  switch (action.type) {
    case "SET_RESOURCE_FIELDS":
      return { ...state, [action.name]: action.fields };
    default:
      return state;
  }
};

export const resource = (state = {}, action) => {
  switch (action.type) {
    case "SET_RESOURCE":
      return { ...state, [action.resource.name]: { ...action.resource } };

    default:
      return state;
  }
};

export const resourceModel = (state = Models, action) => {
  switch (action.type) {
    case "SET_OPTIONS_DATA":
      const { resource, name, show } = action.field;
      const options = action.options.map(option => ({
        text: option[show],
        value: option.id
      }));
      let resourceObj = state[action.resource];

      resourceObj = resourceObj.form.map(field => {
        if (field.name == name) field.options = options;
        return field;
      });

      return { ...state, resourceObj };
    default:
      return state;
  }
};
