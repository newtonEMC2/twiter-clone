import { USERS_SERVER_URI } from "../config";
import { get } from "../../../shared/infrastructure/http/http";
import { UserService } from "../../domain/user/user.service";

const UsersRepository = {
  getFollowingUsers: async () => {
    try {
      const response = await get({ url: `${USERS_SERVER_URI}/users` });
      const users = await response.json();
      return UserService().getUsers({
        users,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export { UsersRepository };
