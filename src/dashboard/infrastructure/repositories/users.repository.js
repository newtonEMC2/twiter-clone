import { USERS_SERVER_URI } from "../config";
import { get } from "../../../shared/infrastructure/http/http";
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
};

export { UsersRepository };
