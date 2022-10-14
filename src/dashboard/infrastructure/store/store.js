import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { commentsReducer, commentsMiddl } from "./comments.slice";

const rootReducer = combineReducers({
  comments: commentsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(commentsMiddl))
);
