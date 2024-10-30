import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./combined-reducers";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};
export const store = createStore(
  rootReducer,
  bindMiddleware([thunkMiddleware])
);

store.subscribe(() => {
  // console.log('store', process.env.NODE_ENV, store.getState())
});
