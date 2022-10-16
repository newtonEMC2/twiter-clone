import { USERS_SERVER_URI } from "../config";
import { get, put } from "../../../shared/infrastructure/http/http";
import { UserService } from "../../domain/user/user.service";

const UsersRepository = {
  getFollowingUsers: async ({ id }) => {
    try {
      let user = await get({ url: `${USERS_SERVER_URI}/users/${id}` });
      user = await user.json();
      if (!user) throw new Error("something went wrong");

      const followingUsersIds = user.following;
      if (!followingUsersIds?.length)
        return UserService().getUsers({
          users: [],
        });

      const query = followingUsersIds.map((id) => `id=${id}`).join("&");
      let followingUsers = await get({
        url: `${USERS_SERVER_URI}/users?${query}`,
      });
      followingUsers = await followingUsers.json();

      return UserService().getUsers({
        users: followingUsers,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getUsersToFollow: async ({ id }) => {
    try {
      let user = await get({ url: `${USERS_SERVER_URI}/users/${id}` });
      user = await user.json();
      if (!user) throw new Error("something went wrong");

      const followingUsersIds = user.following;
      if (!followingUsersIds?.length)
        return UserService().getUsers({
          users: [],
        });

      const query = followingUsersIds.map((id) => `id_ne=${id}`).join("&");
      let usersToFollow = await get({
        url: `${USERS_SERVER_URI}/users?${query}`,
      });
      usersToFollow = await usersToFollow.json();

      return UserService().getUsers({
        users: usersToFollow,
      });
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

  updateUser: async ({ id, user }) => {
    try {
      const updatedUser = UserService().followUser({ id, user });
      await put({
        url: `${USERS_SERVER_URI}/users/${user.id}`,
        data: JSON.stringify(updatedUser),
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export { UsersRepository };
