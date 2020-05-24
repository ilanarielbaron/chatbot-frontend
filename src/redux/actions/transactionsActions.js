import * as types from "./actionTypes";
import * as transactionsApi from "../../api/transactionsApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createTransactionSuccess(transaction) {
  return { type: types.CREATE_TRANSACTION_SUCCESS, transaction };
}

export function loadTransactionsSuccess(transactions) {
  return { type: types.LOAD_TRANSACTIONS_SUCCESS, transactions };
}

//TODO: redux thunk middleware
export function loadTransactions(response) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return transactionsApi
      .getTransactions(response)
      .then((transactions) => {
        dispatch(loadTransactionsSuccess(transactions));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveTransaction(transaction, response) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch) {
    dispatch(beginApiCall());
    return transactionsApi
      .saveTransaction(transaction, response)
      .then((savedTransaction) => {
        dispatch(createTransactionSuccess(savedTransaction));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
