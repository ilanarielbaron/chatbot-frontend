import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loginUserSuccess(user) {
  return { type: types.LOGIN_USER_SUCCESS, user };
}

export function registerUserSuccess(user) {
  return { type: types.REGISTER_USER_SUCCESS, user };
}

//TODO: redux thunk middleware
export function login(userData) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .login(userData)
      .then((user) => {
        dispatch(loginUserSuccess(user));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//TODO: redux thunk middleware
export function register(userData) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .register(userData)
      .then((user) => {
        dispatch(registerUserSuccess(user));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
