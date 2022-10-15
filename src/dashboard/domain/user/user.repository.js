import { UsersRepository as ur } from "../../infrastructure/repositories/users.repository";

export const usersRepository = {
  getFollowingUsers: () => {
    return ur.getFollowingUsers();
  },
};
