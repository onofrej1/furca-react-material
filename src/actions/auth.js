import axios from "axios";
//import { createBrowserHistory } from "history";
import createHistory from 'history/createBrowserHistory'

export const login = (email, password) => {
  console.log(email);
  return (dispatch, getState) => {
    axios
      .post(getState().baseUrl + "/login", {
        email,
        password
      })
      .then(
        result => {
          if (result.data.error) {
            alert(result.data.errorMessage);
          } else {
            localStorage.setItem("token", result.data.token);
            dispatch({ type: "SET_USER", user: result.data.user });
            createHistory().push('/page/2');
            console.log(result.data.user);
          }
        },
        error => console.log('server-error'+error)
      );
  };
};

export const register = (name, email, password, password_confirmation) => {
  return (dispatch, getState) => {
    axios
      .post(getState().baseUrl + "/register", {
        name,
        email,
        password,
        password_confirmation
      })
      .then(
        result => {
          console.log(result);
          if (result.data.error) {
            alert(result.data.errorMessage);
          } else {
            console.log("registered succesfully");
            createHistory().push('/login');
          }
        },
        error => console.log(error)
      );
  };
};
