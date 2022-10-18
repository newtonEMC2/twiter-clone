import { CommentService } from "../../domain/comment/comment.service";

const SET_COMMENTS = "SET_COMMENTS";
const UPDATE_COMMENTS = "UPDATE_COMMENTS";

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

export const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.payload;
    case UPDATE_COMMENTS:
      return [...state, action.payload];
    default:
      return state;
  }
};
