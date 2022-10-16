import { setUsersAction } from "../../infrastructure/store/users.slice";
import { setAuthenticatedUserAction } from "../../infrastructure/store/auth.slice";

export const usersStore = {
  initUsers: ({ users }) => {
    return setUsersAction({ payload: users });
  },
  setAuthenticatedUser: ({ user }) => {
    return setAuthenticatedUserAction({ payload: user });
  },
};
