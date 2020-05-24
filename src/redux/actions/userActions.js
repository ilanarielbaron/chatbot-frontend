import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loginUserSuccess(user) {
  return { type: types.LOGIN_USER_SUCCESS, user };
}

export function registerUserSuccess(user) {
  return { type: types.REGISTER_USER_SUCCESS, user };
}

export function updatedCurrencySuccess(user) {
  return { type: types.UPDATE_CURRENCY_SUCCESS, user };
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

export function updateCurrency(defaultCurrency, response) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .updateCurrency(defaultCurrency, response)
      .then((user) => {
        dispatch(updatedCurrencySuccess(user));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
