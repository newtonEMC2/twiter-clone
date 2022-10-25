import { USERS_SERVER_URI } from "../config";
import { get, put } from "../../../shared/infrastructure/http/http";
import { UserService } from "../../domain/user/user.service";

const UsersRepository = () => ({
  getUsers: async ({ authenticatedUserId }) => {
    try {
      let users = await get({
        url: `${USERS_SERVER_URI}/users?id_ne=${authenticatedUserId}`,
      });
      users = await users.json();
      return UserService().getUsers({ users });
    } catch (error) {
      console.log(error);
    }
  },

  getUserById: async ({ id }) => {
    try {
      let user = await get({ url: `${USERS_SERVER_URI}/users/${id}` });
      user = await user.json();
      return UserService().getUser({ user });
    } catch (error) {
      console.log(error);
    }
  },

  updateUser: async ({ user }) => {
    try {
      await put({
        url: `${USERS_SERVER_URI}/users/${user.id}`,
        data: JSON.stringify(user),
      });
    } catch (error) {
      console.log(error);
    }
  },
});

export { UsersRepository };
