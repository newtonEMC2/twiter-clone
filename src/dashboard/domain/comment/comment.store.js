import {
  setCommentsAction,
  updateCommentsAction,
} from "../../infrastructure/store/comments.slice";
import {
  selectComments,
  selectCommentsFromFollowingUsers,
} from "../../infrastructure/store/selectors";

export const commentsStore = {
  initComments: ({ comments }) => {
    return setCommentsAction({ payload: comments });
  },
  updateComments: ({ comment }) => {
    return updateCommentsAction({ payload: comment });
  },
  selectComments,
  selectCommentsFromFollowingUsers,
};
