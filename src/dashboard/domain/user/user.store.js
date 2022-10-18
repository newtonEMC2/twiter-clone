import { setUsersAction } from "../../infrastructure/store/users.slice";
import {
  setAuthenticatedUserAction,
  addFollowingUserAction,
  removeFollowingUserAction,
} from "../../infrastructure/store/auth.slice";
import {
  selectFollowingUsers,
  selectUsersToFollow,
} from "../../infrastructure/store/selectors";

import { selectAuthenticatedUser } from "../../infrastructure/store/selectors";

export const usersStore = {
  setUsers: ({ users }) => {
    return setUsersAction({ payload: users });
  },
  setAuthenticatedUser: ({ user }) => {
    return setAuthenticatedUserAction({ payload: user });
  },
  setFollowingUsers: ({ id }) => {
    return addFollowingUserAction({ payload: id });
  },
  removeFollowingUsers: ({ id }) => {
    return removeFollowingUserAction({ payload: id });
  },
  selectFollowingUsers,
  selectUsersToFollow,
  selectAuthenticatedUser,
};
