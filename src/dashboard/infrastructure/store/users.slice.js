import { defaultMemoize, createSelectorCreator } from "reselect";
import isEqual from "lodash.isequal";
import { UserService } from "../../domain/user/user.service";
import { selectAuthenticatedUser } from "./auth.slice";

const SET_USERS = "SET_USERS";

const selectUsers = (state) => state.users;

const createDeepEqualUserToFollowSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

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

export const setUsersAction = ({ payload }) => ({
  type: SET_USERS,
  payload: UserService().getUsers({ users: payload }),
});

export const usersMiddl = () => (next) => (action) => {
  next(action);
};

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
