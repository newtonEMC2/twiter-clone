import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUsers = ({ getFollowingUsersUseCase }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    getFollowingUsersUseCase({ dispatch });
  }, [getFollowingUsersUseCase, dispatch]);

  return [users];
};
