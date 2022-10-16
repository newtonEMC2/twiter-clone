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

  return { getUsers, getUser };
};

export { UserService };
