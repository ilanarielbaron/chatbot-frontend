import * as types from "../actions/actionTypes";
import initialState from "./initialState"

export default function transactionsReducer(state = initialState.transactions, action) {
  switch (action.type) {
    case types.CREATE_TRANSACTION_SUCCESS:
      return [...state, { ...action.transaction }];
    case types.LOAD_TRANSACTIONS_SUCCESS:
      return action.transactions;
    default:
      return state;
  }
}
