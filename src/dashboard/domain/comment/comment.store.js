import {
  setCommentsAction,
  updateCommentsAction,
  updateFiltersAction,
  removeFiltersAction,
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
  updateFilters: ({ id }) => {
    return updateFiltersAction({ payload: id });
  },
  removeFilters: ({ id }) => {
    return removeFiltersAction({ payload: id });
  },
  selectComments,
  selectCommentsFromFollowingUsers,
};
