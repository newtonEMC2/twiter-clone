import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { commentsReducer } from "./comments.slice";
import { usersReducer, usersMiddl } from "./users.slice";
import { authReducer, authMiddl } from "./auth.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  users: usersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(authMiddl, usersMiddl))
);
