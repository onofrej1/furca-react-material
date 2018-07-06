import axios from "axios";
import { setActiveRow } from "./index.js";

export const setResourceUrl = url => {
  return {
    type: "SET_RESOURCE_URL",
    url
  };
};

export const setResource = resource => {
  return {
    type: "SET_RESOURCE",
    resource
  };
};

export const setResourceRow = (name, row) => {
  return {
    type: "SET_RESOURCE_ROW",
    name,
    row
  };
};

export const setActiveResourceName = name => {
  return (dispatch, getState) => {
    const form = getState().resourceModel[name].form;
    for (var i in form) {
      var field = form[i];
      if (field.resource) {
        dispatch(fetchOptions(name, field));
      }
    }

    dispatch({
      type: "SET_ACTIVE_RESOURCE_NAME",
      activeResourceName: name
    });
  }
};

export const fetchResourceData = (name, query = "") => {
  return (dispatch, getState) => {
    let baseUrl = getState().apiUrl;
    let url = baseUrl + "/" + name + "?"+ query;

    axios
      //.get(url, { headers: { 'x-access-token': localStorage.token } })
      .get(url)
      .then(result => {
        dispatch({
          type: "SET_RESOURCE_DATA",
          name,
          data: result.data
        });
      });
  };
};

export const fetchResourceFields = name => {
  return (dispatch, getState) => {
    let baseUrl = getState().apiUrl;
    let url = baseUrl + "/" + name + "/fields";
    axios
      .get(url, { headers: { "x-access-token": localStorage.token } })
      .then(result => {
        dispatch({
          type: "SET_RESOURCE_FIELDS",
          name,
          fields: result.data
        });
      });
  };
};

export const deleteResourceRow = row => {
  return (dispatch, getState) => {
    let baseUrl = getState().apiUrl;
    let name = getState().activeResourceName;
    let url = baseUrl + "/" + name + "/" + row.id;
    axios
      .delete(url, { headers: { "x-access-token": localStorage.token } })
      .then(result => {
        dispatch({
          type: "DELETE_RESOURCE_ROW",
          name,
          row
        });
      });
  };
};

export const saveResourceData = data => {
  return (dispatch, getState) => {
    let urlParam = data.id ? "/" + data.id : "";
    let resourceName = getState().activeResourceName;

    axios({
      method: data.id ? "put" : "post",
      url: getState().apiUrl + "/" + resourceName + urlParam,
      data
    }).then(result => {
      dispatch(setActiveRow(null));
      /*const updatedRow =
        result.data instanceof Array ? result.data[0] : result.data;*/
      //dispatch(setResourceRow(resourceName, updatedRow));
      dispatch(fetchResourceData(resourceName));
    });
  };
};

export const fetchOptions = (formResource, field) => {

  return (dispatch, getState) => {
    let baseUrl = getState().apiUrl;
    let url = baseUrl + "/" + field.resource;
    console.log('ffetch');
    axios
      //.get(url, { headers: { 'x-access-token': localStorage.token } })
      .get(url)
      .then(result => {
        dispatch({
          type: "SET_OPTIONS_DATA",
          resource: formResource,
          field,
          options: result.data
        });
      });
  };
};
