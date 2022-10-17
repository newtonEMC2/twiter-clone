import {
  setUsersAction,
  selectFollowingUsers,
  selectUsersToFollow,
} from "../../infrastructure/store/users.slice";
import {
  setAuthenticatedUserAction,
  selectAuthenticatedUser,
  addFollowingUserAction,
  removeFollowingUserAction,
} from "../../infrastructure/store/auth.slice";

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
