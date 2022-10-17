import { UsersRepository as ur } from "../../infrastructure/repositories/users.repository";

export const usersRepository = {
  getAllUsers: ({ authenticatedUserId }) => {
    return ur.getUsers({ authenticatedUserId });
  },
  getAuthenticatedUser: ({ id }) => {
    return ur.getUserById({ id });
  },
  followUser: ({ user }) => {
    return ur.updateUser({ user });
  },
  unfollowUser: ({ user }) => {
    return ur.updateUser({ user });
  },
};
