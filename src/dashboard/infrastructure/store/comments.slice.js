import { CommentService } from "../../domain/comment/comment.service";

const SET_COMMENTS = "SET_COMMENTS";
const UPDATE_COMMENTS = "UPDATE_COMMENTS";
const UPDATE_FILTERS = "UPDATE_FILTERS";

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

export const commentsReducer = (
  state = { collection: [], filters: {} },
  action
) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, collection: action.payload };
    case UPDATE_COMMENTS:
      return { ...state, collection: [...state.collection, action.payload] };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...{ [action.payload]: true } },
      };
    default:
      return state;
  }
};
