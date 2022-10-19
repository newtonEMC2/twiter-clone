import { CommentService } from "../../domain/comment/comment.service";
import { FOLLOW_USER, UNFOLLOW_USER } from "./auth.slice";

const SET_COMMENTS = "SET_COMMENTS";
const UPDATE_COMMENTS = "UPDATE_COMMENTS";
const UPDATE_FILTERS = "UPDATE_FILTERS";
const REMOVE_FILTER = "REMOVE_FILTER";
const RESET_FILTER = "RESET_FILTER";

export const setCommentsAction = ({ payload }) => ({
  type: SET_COMMENTS,
  payload: CommentService().getComments({ comments: payload }),
});

export const updateCommentsAction = ({ payload }) => ({
  type: UPDATE_COMMENTS,
  payload: CommentService().createComment({
    content: payload.content,
    author: payload.author,
  }),
});

export const updateFiltersAction = ({ payload }) => ({
  type: UPDATE_FILTERS,
  payload,
});

export const removeFiltersAction = ({ payload }) => ({
  type: REMOVE_FILTER,
  payload,
});

const resetFIlterAction = () => ({
  type: RESET_FILTER,
});

export const commentsMiddl = () => (next) => (action) => {
  if (action.type === FOLLOW_USER) {
    next(action);
    next(resetFIlterAction());
  }
  if (action.type === UNFOLLOW_USER) {
    next(action);
    next(resetFIlterAction());
  } else next(action);
};

export const commentsReducer = (
  state = { collection: [], filters: {} },
  action
) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, collection: action.payload };
    case UPDATE_COMMENTS:
      return {
        ...state,
        collection: [...state.collection, action.payload],
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...{ [action.payload]: true } },
      };
    case REMOVE_FILTER:
      const stateCopy = JSON.parse(JSON.stringify(state));
      delete stateCopy.filters[action.payload];
      return stateCopy;
    case RESET_FILTER:
      return { ...state, filters: {} };
    default:
      return state;
  }
};
