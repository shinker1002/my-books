import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import { History } from "history";
const reducer = (history: History<unknown>) =>
  combineReducers({
    auth,
    router: connectRouter,
  });

export default reducer;
