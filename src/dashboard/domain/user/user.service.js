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

  return { getUsers, getUser, followUser };
};

export { UserService };
