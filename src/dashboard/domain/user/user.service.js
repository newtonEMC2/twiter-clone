import { uuidService } from "../../../shared/domain/uuid.repository";
import { User } from "./user.aggregate";

const UserService = () => {
  const getUsers = ({ users }) => {
    return users.map(({ id, name, following }) => {
      return User({ id, name, following });
    });
  };

  return { getUsers };
};

export { UserService };
