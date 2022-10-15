import { UsersRepository as ur } from "../../infrastructure/repositories/users.repository";

export const usersRepository = {
  getFollowingUsers: ({ id }) => {
    return ur.getFollowingUsers({ id });
  },
  getUsersToFollow: ({ id }) => {
    return ur.getUsersToFollow({ id });
  },
};
