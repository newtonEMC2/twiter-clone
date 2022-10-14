import {
  setCommentsAction,
  updateCommentsAction,
} from "../../infrastructure/store/comments.slice";

export const commentsStore = {
  initComments: ({ comments }) => {
    return setCommentsAction({ payload: comments });
  },
  updateComments: ({ comment }) => {
    return updateCommentsAction({ payload: comment });
  },
};
