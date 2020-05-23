import { combineReducers } from "redux";
import transactions from "./TransactionsReducer";
import user from "./UserReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  transactions,
  user,
  apiCallsInProgress
});

export default rootReducer;
