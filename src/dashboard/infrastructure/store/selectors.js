import { defaultMemoize, createSelectorCreator } from "reselect";
import isEqual from "lodash.isequal";

const createDeepEqualUserToFollowSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

//auth

export const selectAuthenticatedUser = (state) => state.auth;

// users

const selectUsers = (state) => state.users;

export const selectFollowingUsers = createDeepEqualUserToFollowSelector(
  selectAuthenticatedUser,
  selectUsers,
  (authenticatedUser, users = []) => {
    const followingUsersIdsMap = authenticatedUser.following?.reduce(
      (acc, current) => {
        acc[current] = true;
        return acc;
      },
      {}
    );
    return users.filter((user) => followingUsersIdsMap[user.id]);
  }
);

export const selectUsersToFollow = createDeepEqualUserToFollowSelector(
  selectAuthenticatedUser,
  selectUsers,
  (authenticatedUser, users = []) => {
    const followingUsersIdsMap = authenticatedUser.following?.reduce(
      (acc, current) => {
        acc[current] = true;
        return acc;
      },
      {}
    );
    return users.filter((user) => !followingUsersIdsMap[user.id]);
  }
);

//coments

export const selectComments = (state) => state.comments.collection;
export const selectFilters = (state) => state.comments.filters;

export const selectCommentsFromFollowingUsers =
  createDeepEqualUserToFollowSelector(
    selectAuthenticatedUser,
    selectComments,
    selectFilters,
    (authenticatedUser, comments = [], filters = {}) => {
      if (Object.keys(filters).length) {
        return comments.filter((comment) => filters[comment.author.id]);
      }

      const followingUsersIdsMap =
        authenticatedUser.following?.reduce((acc, current) => {
          acc[current] = true;
          return acc;
        }, {}) || [];

      if (followingUsersIdsMap && authenticatedUser)
        followingUsersIdsMap[authenticatedUser.id] = true;

      return comments.filter(
        (comment) => followingUsersIdsMap[comment.author.id]
      );
    }
  );
