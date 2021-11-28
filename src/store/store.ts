import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import apiReducer from "../reducers/api";

const middlewares: any = [thunk];

const appReducer = combineReducers({
  api: apiReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
