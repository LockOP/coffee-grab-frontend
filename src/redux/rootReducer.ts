import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers<{ userReducer: any }>({
  userReducer: userReducer,
  // keyReducer: keyReducer,
});

export default rootReducer;
