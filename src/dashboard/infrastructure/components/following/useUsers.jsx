import { useEffect, useState } from "react";

export const useUsers = ({ getFollowingUsersUseCase }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getFollowingUsersUseCase().then(setUsers);
  }, [getFollowingUsersUseCase]);

  return [users];
};
