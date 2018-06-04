import axios from "axios";
import { createBrowserHistory } from "history";

export const login = (email, password) => {
  return (dispatch, getState) => {
    axios
      .post(getState().baseUrl + "/node/login", {
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
            console.log(result.data.user);
          }
        },
        error => console.log(error)
      );
  };
};

export const register = (name, email, password) => {
  return (dispatch, getState) => {
    axios
      .post(getState().baseUrl + "/node/register", {
        name,
        email,
        password
      })
      .then(
        result => {
          console.log(result);
          if (result.data.error) {
            alert(result.data.errorMessage);
          } else {
            console.log("registered succesfully");
            const history = createBrowserHistory();
            history.push("/login");
          }
        },
        error => console.log(error)
      );
  };
};
