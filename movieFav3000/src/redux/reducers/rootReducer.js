import { combineReducers } from "redux";
import dataReducer from "./dataReducer";

// Combine all reducers, there is no need, but it is a good practice
const rootReducer = combineReducers({
  data: dataReducer
});

export default rootReducer;
