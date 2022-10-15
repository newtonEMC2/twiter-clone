import { setUsersAction } from "../../infrastructure/store/users.slice";

export const usersStore = {
  initUsers: ({ users }) => {
    return setUsersAction({ payload: users });
  },
};
