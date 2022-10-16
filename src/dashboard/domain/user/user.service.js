import { User } from "./user.aggregate";

const UserService = () => {
  const getUser = ({ user }) => {
    return User({ ...user });
  };

  const getUsers = ({ users }) => {
    return users.map(({ id, name, following }) => {
      return User({ id, name, following });
    });
  };

  const followUser = ({ user, id }) => {
    if (user.following.includes(id)) return user;
    return User({
      ...user,
      following: [...user.following, id],
    });
  };

  const unfollowUser = ({ user, id }) => {
    return User({
      ...user,
      following: user.following.filter((followingId) => followingId !== id),
    });
  };

  return { getUsers, getUser, followUser, unfollowUser };
};

export { UserService };
